const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const User = require("../models/UserSchema");

class WalletService {
  // 🔹 Step 1: Create Razorpay Order
  async createOrder(amount, userId) {
    return await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      payment_capture: 1,
      notes: { userId },
    });
  }

  // 🔹 Step 2: Verify Razorpay Payment and Credit Wallet
  async verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount }) {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      throw new Error("Payment verification failed");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Update wallet balance
    user.wallet.balance += amount;

    // Push to payment history
    user.paymentHistory.push({
      type: "credit",
      amount,
      method: "Razorpay",
      description: "Wallet Recharge",
      referenceId: razorpay_payment_id,
      status: "completed",
    });

    await user.save();

    return { success: true, message: "Wallet credited successfully", newBalance: user.wallet.balance };
  }

  // 🔹 Step 3: Spend/Debit Wallet
  async spendFromWallet(userId, amount, description = "Wallet Payment") {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.wallet.balance < amount) throw new Error("Insufficient balance");

    user.wallet.balance -= amount;

    user.paymentHistory.push({
      type: "debit",
      amount,
      method: "Wallet",
      description,
      referenceId: `DEBIT-${Date.now()}`,
      status: "completed",
    });

    await user.save();

    return { success: true, newBalance: user.wallet.balance };
  }

  // 🔹 Step 4: Get Wallet Balance
  async getBalance(userId) {
    const user = await User.findById(userId).select("wallet.balance");
    if (!user) throw new Error("User not found");
    return { balance: user.wallet.balance };
  }

  // 🔹 Step 5: Get Wallet Transaction History
  async getPaymentHistory(userId) {
    const user = await User.findById(userId).select("paymentHistory");
    if (!user) throw new Error("User not found");
    return user.paymentHistory.sort((a, b) => b.createdAt - a.createdAt);
  }
}

module.exports = new WalletService();