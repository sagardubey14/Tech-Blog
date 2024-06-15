const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')

const addPost= async(req, res, next)=>{
    const {keywords, title,description, code} = req.body;
    try {
        const newPost = await Post.create({
            usernameCreatedBy: req.username,
            title:title,
            keywords: keywords,
            description: description,
            code: code,
            likes: 0,
            comments: [],
        });
        const keys = await Keywords.findById('665ae7089ccff1a8b14f9e40')
        let words = keys.keywords
        console.log(words);
        newPost.keywords.forEach(value => {
            if (!words.includes(value)) {
                console.log(value);
              words.push(value);
            }
        });
        await keys.save();
        
        res.status(200).json("Success: post has been added")
    } catch (error) {
        res.send(error)
    }
}

const getPosts= async(req, res, next)=>{

    try {
        existingUserPosts = await Post.find({usernameCreatedBy: req.username});
        res.send(existingUserPosts);
    } catch (error) {
        res.send(error)
    }
}


const getTrend= async(req, res, next)=>{
    console.log("call to trend");
    try {
        const topPosts = await Post.find()
                .sort({ likes: -1 })
                .limit(4)
                .exec();

        res.send(topPosts);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
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

module.exports = {addPost, getPosts, updateLikes, updateComments, getTrend}