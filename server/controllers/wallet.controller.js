const walletService = require("../services/wallet.service");

exports.createOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;
    const order = await walletService.createOrder(amount, userId);
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const result = await walletService.verifyPayment(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.spend = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const result = await walletService.spendFromWallet(userId, amount);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const result = await walletService.getBalance(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};