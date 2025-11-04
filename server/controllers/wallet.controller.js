const {
  getWallet,
  createRazorpayOrder,
  verifyAndAddBalance,
} = require("../services/wallet.service");

async function handleGetWallet(req, res) {
  try {
    const wallet = await getWallet(req.user.id);
    res.json({ wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Step 1: Create order
async function handleCreateRazorpayOrder(req, res) {
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
async function handleVerifyRazorpayPayment(req, res) {
  try {
    const wallet = await verifyAndAddBalance(req.user.id, req.body);
    res.json({ message: "Payment verified and wallet updated", wallet });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  handleGetWallet,
  handleCreateRazorpayOrder,
  handleVerifyRazorpayPayment,
};