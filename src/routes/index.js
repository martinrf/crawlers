const health = require('./health');
const matchHistory = require('./match-history');

module.exports = (app) => {
    health(app);
    matchHistory(app);
};
