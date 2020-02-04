const database = require('./database');
const initModels = require('./models');
const CronJob = require('cron').CronJob;
const RabbitMQ = require('./classes/rabbit');
const logConfig = require('./config/logs-config');

const UserCollector = require('./classes/user-collector');
const userCollector = new UserCollector();

RabbitMQ.run()
  .then(async () => {
    try {
      await database.connectToDB();
      initModels();

      const job = new CronJob('00 21 12 * * 0-6', userCollector.deleteUser);

      job.start();
    } catch (err) {
      RabbitMQ.sendToLogger({
        logType: logConfig.logTypes.error,
        message: err,
      });
    }
  })
  .catch(err => {
    console.log(err);
  });