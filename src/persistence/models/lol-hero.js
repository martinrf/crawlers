const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    release_date: { type: Date },
    patch: { type: String },
    name: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

const heroModel = mongoose.model('hero', heroSchema);

module.exports = heroModel;
