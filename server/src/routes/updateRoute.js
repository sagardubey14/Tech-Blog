const express = require('express');
const { updateFollowers, updateEmail, checkAnswer, updatePassword, setNewPassword, editPosts } = require('../controller/editController');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const updateRoute = express.Router();


const check =(req, res, next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

updateRoute.post('/follower', check, updateFollowers);
updateRoute.post('/email', check, updateEmail);
updateRoute.post('/ans', check, checkAnswer);
updateRoute.post('/pass', check, updatePassword);
updateRoute.post('/newpass', check, setNewPassword);
updateRoute.post('/post', check, editPosts);

module.exports = updateRoute;
