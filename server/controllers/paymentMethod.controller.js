const paymentMethodService = require("../services/paymentMethod.service");

exports.addPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, upiId, card, isDefault } = req.body;

    if (!type) return res.status(400).json({ success: false, message: "Payment type is required" });

    const method = await paymentMethodService.addPaymentMethod(userId, {
      type,
      upiId,
      card,
      isDefault,
    });

    res.status(201).json({ success: true, paymentMethod: method });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { methodId } = req.params;
    const updatedData = req.body;

    const result = await paymentMethodService.updatePaymentMethod(userId, methodId, updatedData);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await paymentMethodService.getPaymentMethods(userId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { methodId } = req.params;

    const result = await paymentMethodService.deletePaymentMethod(userId, methodId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.setDefaultPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { methodId } = req.params;

    const result = await paymentMethodService.setDefaultPaymentMethod(userId, methodId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};