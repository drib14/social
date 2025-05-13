const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

router.post("/register", authCtrl.register);
router.post("/verify", authCtrl.verifyCodes);
router.post("/login", authCtrl.login);
router.post("/forgot", authCtrl.forgotPassword);
router.post("/reset", authCtrl.resetPassword);

module.exports = router;
