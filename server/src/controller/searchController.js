const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')
const user = require('../model/userSchema')

const searchPosts = async (req, res, next)=>{
    const {keys,query} = req.query
    console.log(keys, query);
    try {
        const search = await Keywords.findOne({})
        const words = search.keywords
        const presentWords = keys.filter(element => words.some(word => word.toLowerCase().includes(element.toLowerCase())));
        const posts = await Post.find({ keywords: { 
            $in: presentWords.map(keyword => new RegExp(keyword, 'i')) 
         } });
        if(posts.length < 2){
            search.queries.push({query:query, keywords:keys})
            search.save()
        }
        if(posts.length === 0){
            res.status(404).json("Posts not found regarding this keywords")
        }
        else{
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}



const searchUser = async (req, res, next)=>{
    const {username} = req.query;
    try{
        const existingUser = await user.findOne({username: username});
        if(!existingUser){
            res.status(404).json({
             Error:"Username not found"
            })
        }else{
            const userdata = {
                username:existingUser.username,
                followers:existingUser.followers,
                following:existingUser.following,
            }
            res.send(userdata);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}


module.exports = {searchPosts, searchUser}