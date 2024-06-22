const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')
const User = require('../model/userSchema');

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

const getOthersPosts= async(req, res, next)=>{
    const {username} = req.query
    try {
        existingUserPosts = await Post.find({usernameCreatedBy: username});
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
        const user = await User.findOne({username:req.username})
        if(like){
            user.likedPosts.push(id)
        }
        else{
            user.likedPosts = user.likedPosts.filter(userid=>userid!=id)
        }
        await user.save();

        res.json({ message: "Likes updated successfully", post: doc });

    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const savePost = async (req, res, next)=>{
    const {postId, remove} = req.body;
    try {
        const user = await User.findOne({username:req.username})
        if(remove){
            user.savedPosts = user.savedPosts.filter(pId=>pId!=postId)
        }else{
            user.savedPosts.push(postId)
        }
        
        await user.save();
        console.log(user);
    } catch (error) {
        console.error("Error Saving post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateComments = async (req, res, next)=>{
    const {comment, postId} = req.body
    try {
        postToUpdate = await Post.findOne({_id:postId});
        console.log(postToUpdate);
        if (postToUpdate) {
            let dateObj = new Date();
    
            let month = String(dateObj.getMonth() + 1)
                .padStart(2, '0');
                
            let day = String(dateObj.getDate())
                .padStart(2, '0');
    
            let year = dateObj.getFullYear();
            let output = day + '/' + month + '/' + year;
            let finalComment = {
                "id":Date.now(),
                "username":req.username,
                "comment":comment,
                "date": output,
                "reply":[],
            }
            postToUpdate.comments.push(finalComment)
            await postToUpdate.save();
            res.json({ message: "comments updated successfully", comment:finalComment });
        }
    } catch (error) {
        console.log(error);
    }
}


const addCommentReply = async (req, res, next)=>{
    const {comment, postId, cmntId} = req.body
    try {
        postToUpdate = await Post.findOne({_id:postId});
        if (postToUpdate) {
            const cmntToAddReply = postToUpdate.comments.find(cmnt=>cmnt.id===cmntId)
            console.log(cmntToAddReply);
            let dateObj = new Date();
    
            let month = String(dateObj.getMonth() + 1)
                .padStart(2, '0');
                
            let day = String(dateObj.getDate())
                .padStart(2, '0');
    
            let year = dateObj.getFullYear();
            let output = day + '/' + month + '/' + year;
            let finalComment = {
                "id":Date.now(),
                "username":req.username,
                "comment":comment,
                "date": output,
            }
            cmntToAddReply.reply.push(finalComment)
            postToUpdate.comments = postToUpdate.comments.filter(cmnt=>cmnt.id !== cmntId)
            postToUpdate.comments.push(cmntToAddReply)
            await postToUpdate.save();
            console.log(postToUpdate);
            res.json({ message: "comments updated successfully", comment:finalComment });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addPost, getPosts, updateLikes, updateComments, getTrend, getOthersPosts, savePost, addCommentReply}