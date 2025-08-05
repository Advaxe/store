const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    ZONE_ID: {
        type: Number,
        required: true
    },
    ZONE_NAME: {
        type: String,
        required: true
    },
    COMMUNE_ID: {
        type: Number,
        required: true
    }
}, {
    timestamps: false,
    collection: 'syst_zones'
});

module.exports = mongoose.model('Zone', zoneSchema);