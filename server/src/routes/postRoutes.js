const express = require('express');
const {addPost, getPosts} = require('../controller/postController')
const postRoute = express.Router();
const jwt = require('jsonwebtoken')
const secretKey = "SECRETKEY"

const check =(req, res, next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

postRoute.post('/add', check, addPost);

postRoute.get('/get', check, getPosts);


module.exports = postRoute;
