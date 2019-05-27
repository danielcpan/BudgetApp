'use strict'

import Sequelize from 'sequelize'
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

import User from './user'

const models = {
  User: User.init(sequelize, Sequelize),
}

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

export default db