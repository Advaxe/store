const mongoose = require('mongoose');

const pillSchema = new mongoose.Schema({
    NAME_PILL: {
        type: String,
        required: true,
        maxlength: 100
    },
    DESCRIPTION: {
        type: String,
        maxlength: 255
    },
    PRICE: {
        type: Number,
        required: true
    },
    CREATED_AT: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
    collection: 'pill'
});

module.exports = mongoose.model('Pill', pillSchema);