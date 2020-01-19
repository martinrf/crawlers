const TournamentModel = require('../models/tournament');

class TournamentService {

  async create(tournament) {
    try {
      let model = new TournamentModel(tournament);
      return await model.save();
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async updateOne(conditions, update, options = { multi: false }) {
    try {
      const response = await TournamentModel.updateOne(conditions, update, options);
      return response;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const tournament = await TournamentModel.findOne({ '_id': id });
      return tournament;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }
}

module.exports = new TournamentService();
