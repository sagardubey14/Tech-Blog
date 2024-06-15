const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    usernameCreatedBy: {
        type: String,
        required: true,
        trim: true
    },
    keywords: {
        type: [String],
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        username: {
            type: String,
            required: true,
            trim: true
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
