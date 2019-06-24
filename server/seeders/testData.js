/* eslint-disable no-unused-vars */

const { factory } = require('factory-girl');
require('../tests/factories');

module.exports.createTestData = async (user) => {
  // const user = await factory.create('User', { id: 1 });

  const eatingOutCategory = await factory.create('Category', {
    name: 'Eating Out', icon: 'fa-utensils', color: '#5ad09a', userId: user.id,
  });
  const rentCategory = await factory.create('Category', {
    name: 'Rent', icon: 'fa-home', color: '#ff0000', userId: user.id,
  });
  const gasCategory = await factory.create('Category', {
    name: 'Gas', icon: 'fa-gas-pump', color: '#4684FF', userId: user.id,
  });

  const eatingOutExpenses = await factory.createMany('Expense', 1, { note: 'Example Eating Out Expense', userId: user.id, categoryId: eatingOutCategory.id });
  const rentExpenses = await factory.createMany('Expense', 1, { note: 'Example Rent Expense', userId: user.id, categoryId: rentCategory.id });
  const gasExpenses = await factory.createMany('Expense', 1, { note: 'Example Gas Expense', userId: user.id, categoryId: gasCategory.id });
};

// createTestData(); 

