const mongoose = require('mongoose');

const collineSchema = new mongoose.Schema({
    COLLINE_ID: {
        type: Number,
        required: true
    },
    COLLINE_NAME: {
        type: String,
        required: true
    },
    ZONE_ID: {
        type: Number,
        required: true
    }
}, {
    timestamps: false,
    collection: 'syst_collines'
});

module.exports = mongoose.model('Colline', collineSchema);