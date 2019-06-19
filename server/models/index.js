
const Sequelize = require('sequelize');

// Models
const User = require('./user.model');
const Expense = require('./expense.model');
const Category = require('./category.model');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env]; // eslint-disable-line import/no-dynamic-require
// const sequelize = new Sequelize(config.database, config.username, config.password, config);
let sequelize = null;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
  User: User.init(sequelize, Sequelize),
  Expense: Expense.init(sequelize, Sequelize),
  Category: Category.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
