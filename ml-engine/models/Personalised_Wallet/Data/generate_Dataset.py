import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# --- Configuration ---
NUM_USERS = 50
NUM_SESSIONS = 1000
PROVIDERS = {
    "provider_A": 20.0, # Price per kWh
    "provider_B": 18.5,
    "provider_C": 22.0
}
VEHICLES = {
    "Tata Nexon EV": {"capacity_kwh": 30.2, "efficiency_km_per_kwh": 8.5},
    "MG ZS EV": {"capacity_kwh": 50.3, "efficiency_km_per_kwh": 7.8},
    "Ather 450X": {"capacity_kwh": 3.7, "efficiency_km_per_kwh": 25.0}, # Scooter
    "Simple One": {"capacity_kwh": 5.0, "efficiency_km_per_kwh": 22.0} # Scooter
}

# Generate User base
user_data = []
for i in range(NUM_USERS):
    user_id = f"user_{1001 + i}"
    vehicle_model = random.choice(list(VEHICLES.keys()))
    user_data.append({
        "user_id": user_id,
        "vehicle_model": vehicle_model,
        "battery_capacity_kwh": VEHICLES[vehicle_model]["capacity_kwh"]
    })

users_df = pd.DataFrame(user_data)

# --- Generate Charging Sessions ---
sessions_data = []
start_date = datetime.now() - timedelta(days=90) # 3 months of data

for _ in range(NUM_SESSIONS):
    # Pick a random user
    user = users_df.sample(1).iloc[0]
    
    # Simulate charging session
    kwh_consumed = round(random.uniform(2.0, user["battery_capacity_kwh"] * 0.8), 2)
    provider_name = random.choice(list(PROVIDERS.keys()))
    cost_per_kwh = PROVIDERS[provider_name]
    final_cost = round(kwh_consumed * cost_per_kwh, 2)
    
    # Generate random timestamp
    session_time = start_date + timedelta(
        days=random.randint(0, 89),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59)
    )
    
    sessions_data.append({
        "session_id": f"sess_{random.randint(10000, 99999)}",
        "user_id": user["user_id"],
        "provider_id": provider_name,
        "timestamp_start": session_time,
        "kwh_consumed": kwh_consumed,
        "final_cost": final_cost,
        "station_id": f"{provider_name}_station_{random.randint(1, 5)}"
    })

sessions_df = pd.DataFrame(sessions_data)

# Save to CSV in the same directory
import os
try:
    sessions_df.to_csv(r"UniCharge\ml-engine\models\Personalised_Wallet\artifacts\charging_sessions.csv", index=False)
    users_df.to_csv(r"UniCharge\ml-engine\models\Personalised_Wallet\artifacts\user_vehicles.csv", index=False)
    print(f"Successfully generated 'charging_sessions.csv' with {len(sessions_df)} records.")
    print(f"Successfully generated 'user_vehicles.csv' with {len(users_df)} records.")
except Exception as e:
    print(f"Error saving CSV files: {e}")
