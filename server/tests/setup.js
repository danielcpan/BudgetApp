import models from '../models'

// Set Up Global Varaibles
global.isValid = require('./testHelpers').isValid
global.expect = require('chai').expect
global.Factory = require('factory-girl').factory

// Reset and sync the database models
before(async () => {  
  await resetTestDatabase()
})

const resetTestDatabase = (async () => {
  await models.sequelize.sync({
    force: true
  })
})