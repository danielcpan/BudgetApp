const userFactory = require('./users');
const expenseFactory = require('./expenses');
const categoryFactory = require('./categories');

const factories = {
  user: userFactory,
  expense: expenseFactory,
  category: categoryFactory,
};

export default factories;
