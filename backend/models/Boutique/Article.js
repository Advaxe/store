const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    ID_CATEGORY: {
        type: Number,
        required: true
    },
    NAME_ARTICLE: {
        type: String,
        required: true,
        maxlength: 100
    },
    PRICE_ARTICLE: {
        type: Number,
        required: true
    },
    IMAGE: {
        type: String,
        default: null
    },
    CREATED_AT: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
    collection: 'article'
});

module.exports = mongoose.model('Article', articleSchema);