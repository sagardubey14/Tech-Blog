const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')
const user = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const secretKey = "SECRETKEY"
const salt = bcrypt.genSaltSync(10);

const updateEmail = async (req, res, next)=>{
    const {newEmail} = req.body
    try {
        const filter = { _id: id };
        const update = {email:newEmail}

        const doc = await user.findOneAndUpdate(filter, update, {
        new: true
        });

        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Email updated successfully", post: doc });

    } catch (error) {
        console.error("Error updating Email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updatePassword = async(req, res, next)=>{
    const {answer, updatedPass} = req.body
    try {
        const user = await user.findOne({username:req.username})
        if (answer === user.securityAnswer) {
            let hash = bcrypt.hashSync(updatedPass, salt);
            user.password = hash;
            await user.save(); 

            return res.status(200).json({ message: "Password updated successfully" });
        } else {
            return res.status(400).json({ message: "Security answer is incorrect" });
        }
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editPosts = async (req, res, next) =>{
    const {id, keywords, description, code} = req.nody
    try {
        const filter = { _id: id };
        const update = {keywords:keywords, description:description, code:code}
        const keys = await Keywords.findById('665ae7089ccff1a8b14f9e40')
        const doc = await Post.findOneAndUpdate(filter, update, {
        new: true
        });
        
        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }

        let words = keys.keywords
        doc.keywords.forEach(value => {
            if (!words.includes(value)) {
              words.push(value);
            }
        });
        if(!words === keys.keywords){
            keys.keywords = words
            await keys.save();   
        }

        res.json({ message: "Post updated successfully", post: doc });
    } catch (error) {
        console.error("Error updating Post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {editPosts, updateEmail, updatePassword};