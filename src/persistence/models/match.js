const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_date: { type: Date },
  patch: { type: String },
  blue_team: { type: String },
  red_read: { type: String },
  winner: { type: String },
  blue_bans: [{ type: String }],
  red_bans: [{ type: String }],
  blue_picks: [{ type: String }],
  red_picks: [{ type: String }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const matchModel = mongoose.model('match', matchSchema);

module.exports = matchModel;
