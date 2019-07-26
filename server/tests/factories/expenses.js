const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const format = require('date-fns/format');
const models = require('../../models');

module.exports = factory.define('Expense', models.Expense, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    cost: () => faker.finance.amount(0, 200),
    note: () => faker.lorem.sentence(),
    date: () => format(faker.date.recent(30), 'YYYY-MM-DD'),
    categoryId: factory.assoc('Category', 'id'),
    userId: factory.assoc('User', 'id'),
  };
  return attrs;
});
