import { syncTestDatabase } from './testHelpers'

// Set Up Global Varaibles
global.isValid = require('./testHelpers').isValid
global.expect = require('chai').expect
global.factory = require('factory-girl').factory
global.truncateTables = require('./testHelpers').truncateTables
require('./factories')

// Sync the database models
before(async () => {  
  await syncTestDatabase()
})