const MatchModel = require('../models/match');
const { logger } = require('../../../logger');

class MatchService {

    async create(team) {
        try {
            let model = new MatchModel(team);
            return await model.save();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateOne(conditions, update, options = { multi: false }) {
        try {
            return await MatchModel.updateOne(conditions, update, options);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await MatchModel.findOne({ '_id': id });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

module.exports = new MatchService();
