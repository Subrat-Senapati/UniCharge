import logging
import os
import pickle
from pathlib import Path

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Paths (must stay in sync with 03_Model_Training.ipynb)
BASE_DIR = Path(__file__).resolve().parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"
MODEL_PATH = ARTIFACTS_DIR / "RandomForest_wallet_model.pkl"
SCALER_PATH = ARTIFACTS_DIR / "scaler.pkl"
ENCODERS_PATH = ARTIFACTS_DIR / "label_encoders.pkl"
FEATURE_COLUMNS_PATH = ARTIFACTS_DIR / "feature_columns.pkl"
NUMERIC_COLS_PATH = ARTIFACTS_DIR / "numeric_cols.pkl"

logger = logging.getLogger("personalised_wallet_api")


def load_pickle(path: Path):
    if not path.exists():
        raise FileNotFoundError(f"Missing required artifact: {path}")
    with open(path, "rb") as f:
        return pickle.load(f)


def parse_allowed_origins() -> list[str]:
    raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    return origins or ["*"]


try:
    model = load_pickle(MODEL_PATH)
    scaler = load_pickle(SCALER_PATH)
    le_dict = load_pickle(ENCODERS_PATH)
    feature_columns = load_pickle(FEATURE_COLUMNS_PATH)
    numeric_cols = load_pickle(NUMERIC_COLS_PATH)
except Exception as exc:
    logger.exception("Failed to initialize model artifacts")
    raise RuntimeError("Model initialization failed") from exc


def encode_or_raise_unknown(column: str, values: pd.Series):
    encoder = le_dict[column]
    allowed_values = set(encoder.classes_)
    incoming_values = set(values.astype(str))
    unknown_values = sorted(incoming_values - allowed_values)
    if unknown_values:
        preview = ", ".join(unknown_values[:3])
        raise ValueError(f"Unsupported value(s) for {column}: {preview}")
    return encoder.transform(values.astype(str))


class InputData(BaseModel):
    month: int = Field(..., ge=1, le=12)
    year: int = Field(..., ge=2000, le=2100)
    avg_wallet_balance: float = Field(..., ge=0)
    avg_session_duration: float = Field(default=60.0, ge=0)
    peak_hour_ratio: float = Field(default=0.0, ge=0, le=1)

    avg_cost: float = Field(..., ge=0)
    avg_cost_efficiency: float = Field(..., ge=0)

    city: str
    vehicle_type: str
    subscription_type: str
    payment_mode: str
    charger_type: str

    sessions_per_user_month: float = Field(..., ge=0)

    model_config = {"extra": "forbid"}


class WalletSuggestionRequest(InputData):
    previous_month_spend: float | None = None
    smoothing_factor: float = Field(default=0.5, ge=0, le=1)


def preprocess_input(data: InputData) -> np.ndarray:
    """Reproduce notebook preprocessing for a single request record."""
    cost_per_kwh_est = data.avg_cost_efficiency * data.peak_hour_ratio
    wallet_to_cost_ratio = data.avg_wallet_balance / (data.avg_cost + 1e-6)

    raw = {
        "Month": data.month,
        "Year": data.year,
        "avg_wallet_balance": data.avg_wallet_balance,
        "avg_session_duration": data.avg_session_duration,
        "peak_hour_ratio": data.peak_hour_ratio,
        "City": data.city,
        "Vehicle_Type": data.vehicle_type,
        "Subscription_Type": data.subscription_type,
        "Payment_Mode": data.payment_mode,
        "Charger_Type": data.charger_type,
        "sessions_per_user_month": data.sessions_per_user_month,
        "cost_per_kwh_est": cost_per_kwh_est,
        "wallet_to_cost_ratio": wallet_to_cost_ratio,
        "vehicle_encoded": data.vehicle_type,
        "subscription_encoded": data.subscription_type,
    }

    X = pd.DataFrame([raw])

    for col in le_dict.keys():
        if col in X.columns:
            X[col] = encode_or_raise_unknown(col, X[col])

    X_numeric = X[numeric_cols]
    X[numeric_cols] = scaler.transform(X_numeric)

    X = X.reindex(columns=feature_columns, fill_value=0)
    return X.values


allowed_origins = parse_allowed_origins()
allow_credentials = allowed_origins != ["*"]

app = FastAPI(title="Personalised Wallet API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Personalised Wallet Prediction API is running"}


@app.get("/health")
def health():
    return {"status": "ok", "artifacts_loaded": True}


@app.post("/predict")
def predict(data: InputData):
    try:
        features = preprocess_input(data)
        prediction = model.predict(features)
        return {"prediction": float(prediction[0])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail="Prediction failed") from exc


@app.post("/suggest_wallet")
def suggest_wallet(data: WalletSuggestionRequest):
    """Return raw prediction and a smoothed suggested monthly wallet amount."""
    try:
        features = preprocess_input(data)
        prediction = float(model.predict(features)[0])

        if data.previous_month_spend is not None:
            alpha = data.smoothing_factor
            suggested = alpha * prediction + (1 - alpha) * data.previous_month_spend
        else:
            suggested = prediction

        return {
            "prediction": prediction,
            "suggested_monthly_wallet": suggested,
            "previous_month_spend": data.previous_month_spend,
            "smoothing_factor": data.smoothing_factor,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Wallet suggestion failed")
        raise HTTPException(status_code=500, detail="Wallet suggestion failed") from exc


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
