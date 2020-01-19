const TeamModel = require('../models/team');

class TeamService {

  async create(team) {
    try {
      let model = new TeamModel(team);
      return await model.save();
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async updateOne(conditions, update, options = { multi: false }) {
    try {
      const response = await TeamModel.updateOne(conditions, update, options);
      return response;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const team = await TeamModel.findOne({ '_id': id });
      return team;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }
}

module.exports = new TeamService();
