require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./database/db");

const userRoutes = require("./routes/users.routes");

const app = express();
const PORT = process.env.PORT || 3000;
connectToDb();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("🚀 Backend server is running!");
});


app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});