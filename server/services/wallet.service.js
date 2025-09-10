const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const User = require("../models/UserSchema");

class WalletService {
  async createOrder(amount, userId) {
    return await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      payment_capture: 1,
      notes: { userId },
    });
  }

  async verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount }) {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      throw new Error("Payment verification failed");
    }

    // Update wallet balance
    await User.updateOne({ _id: userId }, { $inc: { walletBalance: amount } });
    return { success: true, message: "Wallet credited successfully" };
  }

  async spendFromWallet(userId, amount) {
    const user = await User.findById(userId);
    if (!user || user.walletBalance < amount) {
      throw new Error("Insufficient balance");
    }

    user.walletBalance -= amount;
    await user.save();
    return { success: true, newBalance: user.walletBalance };
  }

  async getBalance(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return { balance: user.walletBalance };
  }
}

module.exports = new WalletService();