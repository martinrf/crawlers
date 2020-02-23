require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('./util/logger');

const mongoose = require("mongoose");
const mongoOptions = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
};
const ATLAS_URI = process.env.ATLAS_URI;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== "test"){
  (function connect () {
    mongoose.connect(ATLAS_URI, mongoOptions).then(
      () => logger.info(`Success connection to database.`)
    ).catch(err => {
      logger.error(err);
      setTimeout(connect, 35000);
    });
  })();
}

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/swagger.yaml", express.static("./swagger.yaml"));

require('./src/routes')(app);

app.listen(port, () => logger.info('Crawlers Services Running in port ' + port));

module.exports = app;
