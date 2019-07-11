const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Category', models.Category, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    name: () => faker.commerce.department(),
    icon: () => 'fa-icon',
    color: () => faker.internet.color(),
    isDefault: false,
    userId: factory.assoc('User', 'id'),
  };
  return attrs;
});
