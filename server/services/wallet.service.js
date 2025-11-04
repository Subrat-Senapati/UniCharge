const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/UserSchema");

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function getWallet(userId) {
  const user = await User.findById(userId).select("wallet");
  if (!user) throw new Error("User not found");
  return user.wallet;
}

// ✅ 1️⃣ Create a Razorpay order
async function createRazorpayOrder(userId, amount) {
  const options = {
    amount: amount * 100, // Razorpay works in paise
    currency: "INR",
    receipt: `wallet_rcpt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  if (!order) throw new Error("Failed to create Razorpay order");

  return order;
}

// ✅ 2️⃣ Verify payment and add balance
async function verifyAndAddBalance(userId, { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount }) {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  // ✅ Add wallet balance after verification
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.wallet.balance += amount;
  user.wallet.loyaltyPoints += Math.floor(amount / 10);

  user.paymentHistory.push({
    type: "credit",
    amount,
    method: "Razorpay",
    description: "Wallet Recharge via Razorpay",
    referenceId: razorpay_payment_id,
    status: "completed",
  });

  await user.save();
  return user.wallet;
}

module.exports = {
  getWallet,
  createRazorpayOrder,
  verifyAndAddBalance,
};