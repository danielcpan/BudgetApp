import { isValid, syncTestDatabase, truncateTables } from './testHelpers'
import chai, { expect } from 'chai'
import { factory } from 'factory-girl'

// Set Up Global Varaibles
global.isValid = isValid
global.expect = expect
global.factory = factory
global.truncateTables = truncateTables
require('./factories')

// Sync the database models
before(async () => {  
  await syncTestDatabase()
})