require('dotenv').config();
const express = require("express");
const connectToDb = require("./database/db");

const userRoutes = require("./routes/users.routes");

const app = express();
const PORT = process.env.PORT || 3000;
connectToDb();


app.use(express.json());

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Backend server is running!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});