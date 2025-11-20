require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./database/db");
const passport = require("./config/passport");
const session = require("express-session");

const userRoutes = require("./routes/users.routes");
const walletRoutes = require("./routes/wallet.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const notificationRoutes = require("./routes/notification.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const paymentMethodRoutes = require("./routes/paymentMethod.routes");
const stationRoutes = require("./routes/stations.routes");
const bookingRoutes = require('./routes/booking.routes');

const app = express();
const PORT = process.env.PORT || 3000;
connectToDb();

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("🚀 Backend server is running!");
});

// Add session middleware (needed for passport)
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", vehicleRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api", stationRoutes);
app.use('/api/bookings', bookingRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});