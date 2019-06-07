const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Category', models.Category, (buildOptions ={}) => {
  const attrs = {
    name: () => faker.commerce.department(),
    icon: () => 'fa-icon',
    color: () => faker.internet.color(),
  }
  return attrs;
});
