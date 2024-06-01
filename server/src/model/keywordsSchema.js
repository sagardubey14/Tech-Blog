const mongoose = require('mongoose');

const keywordsSchema = new mongoose.Schema({
    keywords: {
        type: [String],
    },
});

const keywords = mongoose.model('Keywords', keywordsSchema);

module.exports = keywords;