const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const secretKey = "SECRETKEY"
const salt = bcrypt.genSaltSync(10);

const updateEmail = async (req, res, next) => {
    const { newEmail } = req.body
    try {
        const filter = { username: req.username };
        const update = { email: newEmail }

        const user = await User.findOneAndUpdate(filter, update, {
            new: true
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Email updated successfully", email: newEmail });

    } catch (error) {
        console.error("Error updating Email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updatePassword = async (req, res, next) => {
    const { oldPass, newPass } = req.body
    try {
        const user = await User.findOne({ username: req.username })
        if (bcrypt.compareSync(oldPass, user.password)) {
            let hash = bcrypt.hashSync(newPass, salt);
            user.password = hash;
            await user.save();
            return res.status(200).json({ message: "Password updated successfully" });
        }
        else {
            return res.status(200).json({ message: "Password was Incorrect" });
        }
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const setNewPassword = async (req, res, next) => {
    const { newPass } = req.body
    try {
        const user = await User.findOne({ username: req.username })
        let hash = bcrypt.hashSync(newPass, salt);
        user.password = hash;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const checkAnswer = async (req, res, next) => {
    const { answer } = req.body
    try {
        const user = await User.findOne({ username: req.username })
        if (answer === user.securityAnswer) {
            return res.status(200).json({ message: "Right" });
        } else {
            return res.status(200).json({ message: "Wrong" });
        }
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editPosts = async (req, res, next) => {
    const { id, title, keywords, description, code } = req.body
    try {
        const filter = { _id: id };
        const update = { title:title, keywords: keywords, description: description, code: code }
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
        if (!words === keys.keywords) {
            keys.keywords = words
            await keys.save();
        }

        res.json({ message: "Post updated successfully", post: doc });
    } catch (error) {
        console.error("Error updating Post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateFollowers = async (req, res, next) => {
    const { otheruser, addFollowers } = req.body
    try {
        const user = await User.findOne({ username: req.username })
        const otherUser = await User.findOne({ username: otheruser })
        if (addFollowers) {
            otherUser.followers.push(req.username)
            user.following.push(otheruser)
        }
        else {
            otherUser.followers = otherUser.followers.filter(userName => userName !== req.username)
            user.following = user.following.filter(userName => userName !== otheruser)
        }
        await otherUser.save();
        await user.save();
        res.send("Succes in updating followers")

    } catch (error) {
        console.error("Error updating follower:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { editPosts, updateEmail, updatePassword, updateFollowers, checkAnswer, setNewPassword };