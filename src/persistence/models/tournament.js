const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { type: String },
  organizer: { type: String },
  format: { type: String },
  region: { type: String },
  event_type: { type: String },
  country: { type: String },
  start_date: { type: Date },
  end_date: { type: Date }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const tournamentModel = mongoose.model('tournament', tournamentSchema);

module.exports = tournamentModel;
