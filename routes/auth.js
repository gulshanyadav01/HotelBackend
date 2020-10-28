const express = require("express");

const router = express.Router();

const authController = require("../controller/auth");

const auth = require('../middleware/auth')

// router.get("/signup",authController.getSignup);

router.post("/signup",authController.postSignup);

router.post('/login',authController.postLogin);

router.get('/userDetails' , auth ,  authController.getUserInfo)

module.exports = router;