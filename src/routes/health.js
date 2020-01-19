const pjson = require('../../package');

const health = {
  'alive': true,
  'name': pjson.name,
  'version': pjson.version
};

module.exports = (app) => {
  /***
   * Health Route.
   */
  app.get('/health', async (req, res) => {
    await res.status(200).send(health);
  });
};
