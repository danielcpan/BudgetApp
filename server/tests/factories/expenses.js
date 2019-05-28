import Factory from 'factory-girl'
import models from '../../models'
import faker from 'faker/locale/en'

export default Factory.define('Expense', models.Expense, {
  value: faker.finance.amount(0, 200),
  note: faker.lorem.sentence(),
  categoryId: Factory.assoc('Category', 'id'),
  userId: Factory.assoc('User', 'id')
  // categoryId: Factory.assocAttrs('Category', 'id'),
  // userId: Factory.assocAttrs('User', 'id')
})
