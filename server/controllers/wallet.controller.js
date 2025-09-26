const walletService = require("../services/wallet.service");

// 🔹 Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await walletService.createOrder(amount, req.user.id);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 Verify Razorpay Payment & Credit Wallet
exports.verifyPayment = async (req, res) => {
  try {
    const result = await walletService.verifyPayment({
      ...req.body,
      userId: req.user.id,
    });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 🔹 Spend from Wallet
exports.spend = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const result = await walletService.spendFromWallet(req.user.id, amount, description);

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 🔹 Get Wallet Balance
exports.getBalance = async (req, res) => {
  try {
    const result = await walletService.getBalance(req.user.id);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

// 🔹 Get Wallet Transaction History
exports.getHistory = async (req, res) => {
  try {
    const history = await walletService.getPaymentHistory(req.user.id);
    res.json({ success: true, history });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};