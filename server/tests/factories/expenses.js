const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Expense', models.Expense, (buildOptions = {}) => {
  const attrs = {
    id: factory.sequence('Expense.id'),
    cost: () => faker.finance.amount(0, 200),
    note: () => faker.lorem.sentence(),
    date: () => faker.date.recent(30),
    categoryId: factory.assoc('Category', 'id'),
    userId: factory.assoc('User', 'id'),
  };
  return attrs;
});
