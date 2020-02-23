const { logger } = require('../../util/logger');
const matchService = require('../persistence/services/match-service');

module.exports = (app) => {
    app.post('/match-history/urls', async (req, res) => {
        logger.info('match-history/urls');
        res.status(200).send({});
    });

    app.get('/match-history/:id', async(req, res) => {
        // TODO: Sanitize ID
        const id = req.params.id;
        res.status(200).send(await matchService.findById(id));
    });
};
