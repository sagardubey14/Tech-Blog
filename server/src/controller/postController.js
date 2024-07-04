const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')
const User = require('../model/userSchema');
const mongoose = require('mongoose');

const addPost = async (req, res, next) => {
    const { keywords, title, description, code } = req.body;
    try {
        const newPost = await Post.create({
            usernameCreatedBy: req.username,
            title: title,
            keywords: keywords,
            description: description,
            code: code,
            likes: 0,
            comments: [],
        });
        const keys = await Keywords.findOne({})
        let words = keys.keywords
        newPost.keywords.forEach(value => {
            if (!words.includes(value)) {
                words.push(value);
            }
        });
        await keys.save();
        res.json({ message: "Success: post has been added", post: newPost })
    } catch (error) {
        res.send(error)
    }
}

const getPosts = async (req, res, next) => {

    try {
        existingUserPosts = await Post.find({ usernameCreatedBy: req.username });
        res.send(existingUserPosts);
    } catch (error) {
        res.send(error)
    }
}


const deletePosts = async (req, res, next) => {
    const { postId } = req.body
    try {
        const post = await Post.findOne({ _id: postId, usernameCreatedBy: req.username });
        if (!post) {
            return res.status(404).send({ message: "Post not found or you are not authorized to delete this post." });
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

        res.status(200).send({ message: `Post of id:${postId} Deleted Successfully` });
    } catch (error) {
        console.error(err.stack);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}

const getOthersPosts = async (req, res, next) => {
    const { username } = req.query
    try {
        existingUserPosts = await Post.find({ usernameCreatedBy: username });
        res.send(existingUserPosts);
    } catch (error) {
        res.send(error)
    }
}

const getSavedPosts = async (req, res, next) => {
    const { savedPosts } = req.query
    try {
        const foundPosts = await Post.find({ _id: { $in: savedPosts } });
        res.json({ PostsSaved: foundPosts });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTrend = async (req, res, next) => {
    try {
        const topPosts = await Post.find()
            .sort({ likes: -1 })
            .limit(6)
            .exec();
        const search = await Keywords.findOne({})
        if(topPosts.length === 0){
            res.status(404).send({ message: 'No Post not' });
        }
        else if(search === null ){
            res.send({posts:topPosts});
        }
        else
            res.send({posts:topPosts, queries:search.queries});
        
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}


const updateLikes = async (req, res, next) => {
    const { id, like } = req.body
    try {
        const filter = { _id: id };
        const update = like ? { $inc: { likes: 1 } } : { $inc: { likes: -1 } };

        const doc = await Post.findOneAndUpdate(filter, update, {
            new: true
        });

        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }
        const user = await User.findOne({ username: req.username })
        if (like) {
            user.likedPosts.push(id)
        }
        else {
            user.likedPosts = user.likedPosts.filter(userid => userid != id)
        }
        await user.save();

        res.json({ message: "Likes updated successfully", post: doc });

    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const savePost = async (req, res, next) => {
    const { postId, remove } = req.body;
    try {
        const user = await User.findOne({ username: req.username })
        if (remove) {
            user.savedPosts = user.savedPosts.filter(pId => pId != postId)
        } else {
            user.savedPosts.push(postId)
        }

        await user.save();
    } catch (error) {
        console.error("Error Saving post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateComments = async (req, res, next) => {
    const { comment, postId } = req.body
    try {
        postToUpdate = await Post.findOne({ _id: postId });
        if (postToUpdate) {
            let dateObj = new Date();

            let month = String(dateObj.getMonth() + 1)
                .padStart(2, '0');

            let day = String(dateObj.getDate())
                .padStart(2, '0');

            let year = dateObj.getFullYear();
            let output = day + '/' + month + '/' + year;
            let finalComment = {
                "id": Date.now(),
                "username": req.username,
                "comment": comment,
                "date": output,
                "reply": [],
            }
            postToUpdate.comments.push(finalComment)
            await postToUpdate.save();
            res.json({ message: "comments updated successfully", comment: finalComment });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


const addCommentReply = async (req, res, next) => {
    const { comment, postId, cmntId } = req.body
    try {
        postToUpdate = await Post.findOne({ _id: postId });
        if (postToUpdate) {
            const cmntToAddReply = postToUpdate.comments.find(cmnt => cmnt.id === cmntId)
            let dateObj = new Date();

            let month = String(dateObj.getMonth() + 1)
                .padStart(2, '0');

            let day = String(dateObj.getDate())
                .padStart(2, '0');

            let year = dateObj.getFullYear();
            let output = day + '/' + month + '/' + year;
            let finalComment = {
                "id": Date.now(),
                "username": req.username,
                "comment": comment,
                "date": output,
            }
            cmntToAddReply.reply.push(finalComment)
            const index = postToUpdate.comments.findIndex(cmnt => cmnt.id === cmntId);
            if (index !== -1) {
                postToUpdate.comments[index] = cmntToAddReply;
            }
            await postToUpdate.save();
            res.json({ message: "comments updated successfully", comment: cmntToAddReply });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = { addPost, getPosts, updateLikes, updateComments, getTrend, getOthersPosts, savePost, addCommentReply, getSavedPosts, deletePosts }