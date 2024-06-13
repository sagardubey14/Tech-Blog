const Post = require('../model/postSchema');
const Keywords = require('../model/keywordsSchema')

const searchPosts = async (req, res, next)=>{
    const queri = req.query
    try {
        const keys = await Keywords.findById('665ae7089ccff1a8b14f9e40')
        
        res.status(200).json("Success: post has been added")
    } catch (error) {
        res.send(error)
    }
}

module.exports = {searchPosts}