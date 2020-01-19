const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: { type: Date },
  patch: { type: String },
  blue: { type: String },
  red: { type: String },
  winner: { type: String },
  blue_bans: [{ type: String }],
  red_bans: [{ type: String }],
  blue_picks: [{ type: String }],
  red_picks: [{ type: String }],
  blue_roster : [{ type: String }],
  red_roster : [{ type: String }],
  match_history : { type: String },
  vod : { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const matchModel = mongoose.model('match', matchSchema);

module.exports = matchModel;
