const TeamModel = require('../models/team');
const { logger } = require('../../../logger');

class TeamService {

    async create(team) {
        try {
            let model = new TeamModel(team);
            return await model.save();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateOne(conditions, update, options = { multi: false }) {
        try {
            const response = await TeamModel.updateOne(conditions, update, options);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const team = await TeamModel.findOne({ '_id': id });
            return team;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

module.exports = new TeamService();
