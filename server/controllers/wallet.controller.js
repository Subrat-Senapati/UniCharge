const {
  getWallet,
  createRazorpayOrder,
  verifyAndAddBalance,
  getPaymentHistory,
} = require("../services/wallet.service");

exports.handleGetWallet = async (req, res) => {
  try {
    const wallet = await getWallet(req.user.id);
    res.json({ wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Step 1: Create order
exports.handleCreateRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createRazorpayOrder(req.user.id, amount);
    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ✅ Step 2: Verify payment and add balance
exports.handleVerifyRazorpayPayment = async (req, res) => {
  try {
    const wallet = await verifyAndAddBalance(req.user.id, req.body);
    res.json({ message: "Payment verified and wallet updated", wallet });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Spend from wallet
exports.spend = async (req, res) => {
  try {
    const { amount, description, vehicleName, stationName } = req.body;
    const result = await walletService.spendFromWallet(req.user.id, amount, description, {
      vehicleName,
      stationName,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id; // added by auth middleware
    const paymentHistory = await getPaymentHistory(userId);
    res.status(200).json({ paymentHistory });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ message: error.message });
  }
};