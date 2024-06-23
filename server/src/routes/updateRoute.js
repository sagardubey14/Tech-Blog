const express = require('express');
const { updateFollowers } = require('../controller/editController');
const jwt = require('jsonwebtoken')
const secretKey = "SECRETKEY"

const updateRoute = express.Router();


const check =(req, res, next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

updateRoute.post('/follower', check, updateFollowers);


module.exports = updateRoute;
