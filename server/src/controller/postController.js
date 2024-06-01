const Post = require('../model/postSchema')

const addPost= async(req, res, next)=>{
    const {keywords, description, code} = req.body;
    try {
        const newPost = await Post.create({
            usernameCreatedBy: req.username,
            keywords: keywords,
            description: description,
            code: code,
            likes: 0,
            comments: [],
        });
        res.status(200).json("Success: post has been added")
    } catch (error) {
        res.send(error)
    }
}

const getPosts= async(req, res, next)=>{

    try {
        existingUser = await Post.findOne({usernameCreatedBy: req.username});
        res.send(existingUser);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {addPost, getPosts}