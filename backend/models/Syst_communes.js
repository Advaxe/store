const mongoose = require('mongoose');

const communeSchema = new mongoose.Schema({
    COMMUNE_ID: {
        type: Number,
        required: true
    },
    COMMUNE_NAME: {
        type: String,
        required: true
    },
    PROVINCE_ID: {
        type: Number,
        required: true
    }
}, {
    timestamps: false,
    collection: 'syst_communes'
});

module.exports = mongoose.model('Commune', communeSchema);