const user = require('../model/userSchema');
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next)=>{
    const {username, email, password, role} = req.body;

    try{
        
        let hash = bcrypt.hashSync(password, salt);
        const newUser = await user.create({
            username:username,
            email: email,
            password: hash,
            role: role,
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
            res.status(200).json({
                username:username,
                password:password
            })
        }
    }
    catch(err){
        console.log(err);
    }

}


module.exports = {signup, signin};