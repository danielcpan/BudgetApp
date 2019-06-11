const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('User', models.User, (buildOptions = {}) => {
  const attrs = {
    id: factory.sequence('User.id'),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    email: () => faker.internet.email(),
    userRole: () => faker.name.jobType(),
  };
  return attrs;
});
