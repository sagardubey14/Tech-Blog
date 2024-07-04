const mongoose = require('mongoose');

const keywordsSchema = new mongoose.Schema({
    keywords: {
        type: [String],
    },
    queries: {
        type: [],
    },
});

const keywords = mongoose.model('Keywords', keywordsSchema);

module.exports = keywords;