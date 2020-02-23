const TournamentModel = require('../models/tournament');
const { logger } = require('../../../util/logger');

class TournamentService {

    async create(tournament) {
        try {
            let model = new TournamentModel(tournament);
            return await model.save();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateOne(conditions, update, options = { multi: false }) {
        try {
            const response = await TournamentModel.updateOne(conditions, update, options);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const tournament = await TournamentModel.findOne({ '_id': id });
            return tournament;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

module.exports = new TournamentService();
