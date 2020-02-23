const pjson = require('../../package');
const HealthTestModel = require('../persistence/models/healthTest');
const { logger } = require('../../logger');
const health = {
    'alive': true,
    'name': pjson.name,
    'version': pjson.version
};

module.exports = (app) => {
    app.get('/health', async (req, res) => {
        await res.status(200).send(health);
    });

    app.post('/health', async (req, res) => {
        await res.status(200).send(health);
    });

    app.get('/db/health', async (req, res) => {
        let healthTest = new HealthTestModel({});
        try{
            const result = await healthTest.save();
            await res.status(200).send({health, result});
        }catch (error) {
            logger.error(error);
        }
    });
};
