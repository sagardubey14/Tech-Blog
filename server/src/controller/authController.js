const user = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = "SECRETKEY"
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next)=>{
    const {username, email, password, securityQuestion, securityAnswer} = req.body;

    try{
        
        let hash = bcrypt.hashSync(password, salt);
        const newUser = await user.create({
            username:username,
            email: email,
            password: hash,
            securityQuestion: securityQuestion,
            securityAnswer: securityAnswer,
        });
        res.status(200).json({
            username:username,
            password:hash
        })
    }
    catch(err){
        console.log(err);
    }

}


const signin = async (req, res, next)=>{
    const {username, email, password} = req.body;

    try{
        let existingUser;
        if(email){
            existingUser = await user.findOne({email: email});
        }else{
            existingUser = await user.findOne({username: username});
        }
        if(!existingUser){
            res.status(404).json({
             Error:"Username not found"
            })
        }else{
            bcrypt.compareSync(password, existingUser.password);
            const user = {
                username: existingUser.username
            };
        
            const token = jwt.sign(user, secretKey);

            const userdata = {
                username:existingUser.username,
                email:existingUser.email,
                question:existingUser.securityQuestion,
                saved:existingUser.savedPosts,
                followers:existingUser.followers,
                following:existingUser.following,
                likedPosts:existingUser.likedPosts,
                savedPosts:existingUser.savedPosts,
            }
            try {
                res.cookie('token', token, { httpOnly: true });
            } catch (error) {
                console.log(error);
            }
            res.send(userdata);
        }
    }
    catch(err){
        console.log(err);
    }

}


module.exports = {signup, signin};
