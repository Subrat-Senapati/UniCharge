const express = require("express");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const User = require("../models/UserSchema");

const router = express.Router();

// Create Razorpay Order (Add Money)
router.post("/add", async (req, res) => {
  const { amount, userId } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      payment_capture: 1,
      notes: { userId },
    });

    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify Payment & Update Wallet
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    await User.updateOne(
      { _id: userId },
      { $inc: { walletBalance: amount } }
    );
    res.json({ success: true, message: "Wallet credited successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

// Spend from Wallet
router.post("/spend", async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);
  if (!user || user.walletBalance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  user.walletBalance -= amount;
  await user.save();

  res.json({ success: true, newBalance: user.walletBalance });
});

// Get Wallet Balance
router.get("/balance/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ balance: user.walletBalance });
});

module.exports = router;