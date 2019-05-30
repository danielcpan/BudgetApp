import models from '../models'

// Set Up Global Varaibles
global.isValid = require('./testHelpers').isValid
global.expect = require('chai').expect
global.factory = require('factory-girl').factory
require('./factories')

// Sync the database models
before(async () => {  
  await syncTestDatabase()
})

// Truncate database before tests
beforeEach(async () => {
  await truncateTables()
})

const truncateTables = (async () => {
  return Promise.all(
    Object.keys(models).map((modelName) => {
      if (['sequelize', 'Sequelize'].includes(modelName)) return null;
      return models[modelName].destroy({ truncate: { cascade: true }})
    })
  );  
})

const syncTestDatabase = (async () => {
  await models.sequelize.sync({
    force: true
  })
})