const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: true,
        trim: true
    },
    securityAnswer: {
        type: String,
        required: true,
        trim: true
    },
    savedPosts:{
        type:[String],
        default:[]
    },
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    likedPosts:{
        type:[String],
        default:[]
    },
    savedPosts:{
        type:[String],
        default:[]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model('User', userSchema);

module.exports = user;