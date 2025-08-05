const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    PROVINCE_ID: {
        type: Number,
        required: true
    },
    PROVINCE_NAME: {
        type: String,
        required: true
    }
}, {
    timestamps: false,
    collection: 'syst_provinces'
});

module.exports = mongoose.model('Province', provinceSchema);