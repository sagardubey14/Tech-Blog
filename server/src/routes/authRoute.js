const express = require('express');
const {signup, signin}  = require('../controller/authController')

const authRoute = express.Router();

function check(req, res, next) {
    console.log("signup");
    res.send("signup");
    // No need to call next() after res.send() as it ends the response cycle
}

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);

module.exports = authRoute;
