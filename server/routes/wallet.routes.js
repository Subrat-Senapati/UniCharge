const express = require("express");
const walletController = require("../controllers/wallet.controller");
const validateRequest = require("../middleware/validateRequest");
const { addMoneyValidation, spendValidation, balanceValidation } = require("../validators/wallet.validator");

const router = express.Router();

router.post("/add", addMoneyValidation, validateRequest, walletController.createOrder);
router.post("/verify", walletController.verifyPayment);
router.post("/spend", spendValidation, validateRequest, walletController.spend);
router.get("/balance/:userId", balanceValidation, validateRequest, walletController.getBalance);

module.exports = router;