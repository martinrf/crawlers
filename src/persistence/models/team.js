const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String },
    region: { type: String },
    head_coach: { type: String },
    roster: [{ type: String }],
    event_type: { type: String },
    country: { type: String },
    created: { type: Date },
    terminated: { type: Date },
    image_url: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

const teamModel = mongoose.model('team', teamSchema);

module.exports = teamModel;
