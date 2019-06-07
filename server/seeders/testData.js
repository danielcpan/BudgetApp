const { factory } = require('factory-girl');
require('../tests/factories');

const createTestData = async () => {
  let user = await factory.create('User');

  let eatingOutCategory = await factory.create('Category', { name: 'Eating Out', icon: 'fa-utensils', color: "#5ad09a" })
  let rentCategory = await factory.create('Category', { name: 'Rent', icon: 'fa-home', color: "#ff0000" })
  let gasCategory = await factory.create('Category', { name: 'Gas', icon: 'fa-gas-pump', color: "#4684FF" })
  
  let eatingOutExpenses = await factory.createMany('Expense', 6, {userId: user.id, categoryId: eatingOutCategory.id})
  let rentExpenses = await factory.createMany('Expense', 1, {userId: user.id, categoryId: rentCategory.id})
  let gasExpenses = await factory.createMany('Expense', 4, {userId: user.id, categoryId: gasCategory.id})
}

createTestData();