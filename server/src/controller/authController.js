const user = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next) => {
    const { username, email, password, securityQuestion, securityAnswer } = req.body;

    try {

        let hash = bcrypt.hashSync(password, salt);
        const newUser = await user.create({
            username: username,
            email: email,
            password: hash,
            securityQuestion: securityQuestion,
            securityAnswer: securityAnswer,
        });
        res.status(200).json({
            username: username,
            password: hash
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }

}


const signin = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        let existingUser;
        if (email) {
            existingUser = await user.findOne({ email: email });
        } else {
            existingUser = await user.findOne({ username: username });
        }
        if (!existingUser) {
            if(email){
                res.status(404).json({
                    message: "Email is not Register"
                })
            }else{
                res.status(404).json({
                    message: "Username not found"
                })
            }
        } else {
            if (bcrypt.compareSync(password, existingUser.password)) {
                const user = {
                    username: existingUser.username
                };

                const token = jwt.sign(user, process.env.SECRET_KEY);

                const userdata = {
                    username: existingUser.username,
                    email: existingUser.email,
                    question: existingUser.securityQuestion,
                    saved: existingUser.savedPosts,
                    followers: existingUser.followers,
                    following: existingUser.following,
                    likedPosts: existingUser.likedPosts,
                    savedPosts: existingUser.savedPosts,
                }
                res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
                res.send(userdata);
            }
            else {
                return res.status(500).json({ message: "Password is Incorrect" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }

}


module.exports = { signup, signin };
