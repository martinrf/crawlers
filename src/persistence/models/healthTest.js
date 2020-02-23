const mongoose = require('mongoose');

const healthTest = new mongoose.Schema({
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

const healthTestModel = mongoose.model('test', healthTest);

module.exports = healthTestModel;
