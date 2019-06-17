const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('User', models.User, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    email: () => faker.internet.email(),
    userRole: () => faker.name.jobType(),
  };
  return attrs;
});
