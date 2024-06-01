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

const updateLikes = async (req, res, next)=>{
    const{id, like} = req.body
    try {
        const filter = { _id: id };
        const update = like?{ $inc: { likes: 1 } }:{$inc: { likes: -1 } };

        const doc = await Post.findOneAndUpdate(filter, update, {
        new: true
        });

        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Likes updated successfully", post: doc });

    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateComments = async (req, res, next)=>{
    const {id, comment} = req.body
    const username = String(req.username)
    try {
        const comments= [{username, comment}]
        const filter = { _id: id };
        const update = {$push: {comments:comments} ,$set: { updatedAt: Date.now }}

        const doc = await Post.findOneAndUpdate(filter, update, {
        new: true
        });

        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "comments updated successfully", post: doc });

    } catch (error) {
        console.error("Error updating comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {addPost, getPosts, updateLikes, updateComments}