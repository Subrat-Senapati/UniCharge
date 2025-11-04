const User = require("../models/UserSchema");

/* Add a new payment method */
async function addPaymentMethod(userId, methodData) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // If user sets a default method, remove old default
  if (methodData.isDefault) {
    user.paymentMethods.forEach((m) => (m.isDefault = false));
    user.wallet.defaultPaymentMethod = null;
  }

  const newMethod = {
    ...methodData,
    _id: undefined, // let mongoose generate one
  };

  user.paymentMethods.push(newMethod);

  // If it's default, store its ID in wallet.defaultPaymentMethod
  const addedMethod = user.paymentMethods[user.paymentMethods.length - 1];
  if (methodData.isDefault) {
    user.wallet.defaultPaymentMethod = addedMethod._id.toString();
  }

  await user.save();
  return addedMethod;
}

/* Update existing payment method */
async function updatePaymentMethod(userId, methodId, updatedData) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const method = user.paymentMethods.id(methodId);
  if (!method) throw new Error("Payment method not found");

  // If updating default flag, reset all others
  if (updatedData.isDefault) {
    user.paymentMethods.forEach((m) => (m.isDefault = false));
    user.wallet.defaultPaymentMethod = methodId;
  }

  // Merge updated fields
  Object.assign(method, updatedData);

  await user.save();
  return { message: "Payment method updated successfully", paymentMethod: method };
}

/* Get all payment methods */
async function getPaymentMethods(userId) {
  const user = await User.findById(userId, "paymentMethods wallet.defaultPaymentMethod");
  if (!user) throw new Error("User not found");
  return {
    paymentMethods: user.paymentMethods,
    defaultPaymentMethod: user.wallet.defaultPaymentMethod,
  };
}

/* Delete a payment method */
async function deletePaymentMethod(userId, methodId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const method = user.paymentMethods.id(methodId);
  if (!method) throw new Error("Payment method not found");

  // Remove method
  method.deleteOne();

  // If it was default, clear wallet.defaultPaymentMethod
  if (user.wallet.defaultPaymentMethod === methodId) {
    user.wallet.defaultPaymentMethod = null;
  }

  await user.save();
  return { message: "Payment method deleted successfully" };
}

/* Set a payment method as default */
async function setDefaultPaymentMethod(userId, methodId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const method = user.paymentMethods.id(methodId);
  if (!method) throw new Error("Payment method not found");

  user.paymentMethods.forEach((m) => (m.isDefault = false));
  method.isDefault = true;
  user.wallet.defaultPaymentMethod = methodId;

  await user.save();
  return { message: "Default payment method updated successfully", method };
}

module.exports = {
  addPaymentMethod,
  updatePaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  setDefaultPaymentMethod,
};