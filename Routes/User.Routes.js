const express = require('express');
const router = express.Router();
const {RegisterUser , ResendOTP , VerifyEmail} = require('../Controllers/User/Register.controller.js');
const { LoginController } = require('../Controllers/User/Login.controller.js');

// console.log("hell0")
router.post('/register', RegisterUser);
router.post('/resendotp',ResendOTP);
router.post('/verify',VerifyEmail);
router.post('/login',LoginController);

module.exports = router;