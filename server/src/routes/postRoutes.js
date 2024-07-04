const express = require('express');
const {addPost, getPosts, updateLikes, updateComments, getTrend, getOthersPosts, savePost, addCommentReply, getSavedPosts, deletePosts} = require('../controller/postController')
const postRoute = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config();

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

postRoute.post('/add', check, addPost);

postRoute.get('/trend', getTrend);

postRoute.get('/savedposts', getSavedPosts);

postRoute.get('/get', check, getPosts);

postRoute.get('/getother', getOthersPosts);

postRoute.post('/likes', check, updateLikes);

postRoute.post('/cmnt',check, updateComments)

postRoute.post('/delete',check, deletePosts)

postRoute.post('/cmntreply',check, addCommentReply)

postRoute.post('/save',check, savePost)

module.exports = postRoute;
