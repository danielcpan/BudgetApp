const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Category', models.Category, (buildOptions ={}) => {
  const attrs = {
    name: () => faker.commerce.department(),
    icon: () => 'fa-icon',
    color: () => faker.internet.color(),
    userId: factory.assoc('User', 'id')
  }
  return attrs;
});
