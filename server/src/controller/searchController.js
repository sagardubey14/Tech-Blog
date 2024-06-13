const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')

const searchPosts = async (req, res, next)=>{
    const queri = req.query
    try {
        const keys = await Keywords.findById('665ae7089ccff1a8b14f9e40')
        const words = keys.keywords

        const presentWords = queri.filter(element => words.some(word => word.toLowerCase() === element.toLowerCase()));
        const posts = await Post.find({ keywords: { 
            $in: presentWords.map(keyword => new RegExp(keyword, 'i')) 
         } });
        if(posts.length === 0){
            res.status(404).json("Posts not found regarding this keywords")
        }
        else{
        res.status(200).json(posts)
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {searchPosts}