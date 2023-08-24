const { Sequelize } = require('sequelize');
const tedious = require('tedious');
const { database } = require('../config');
const logger = require('./logger');
const { name: dbName, dialect, config: dbConfig } = database;
const { userName, password } = dbConfig.authentication.options;
const sequelize = new Sequelize(dbName, userName, password, { host: dbConfig.server, dialect });

async function ensureDbExists(dbName) {
  return new Promise((resolve, reject) => {
    const connection = new tedious.Connection(dbConfig);
    connection.connect((err) => {
      if (err) {
        logger.error(err);
        reject(`Connection Failed: ${err.message}`);
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases 
        WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
      const request = new tedious.Request(createDbQuery, (err) => {
        if (err) {
          logger.error(err);
          reject(`Create DB Query Failed: ${err.message}`);
        }

        // query executed successfully
        resolve(connection.close());
      });

      connection.execSql(request);
    });
  });
}

module.exports = { sequelize, ensureDbExists };
