const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    NAME_CATEGORY: {
        type: String,
        required: true,
        maxlength: 100
    },
    DESCRIPTION: {
        type: String,
        maxlength: 255
    },
    CREATED_AT: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
    collection: 'category'
});

module.exports = mongoose.model('Category', categorySchema);