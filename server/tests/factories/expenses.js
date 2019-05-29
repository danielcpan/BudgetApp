import models from '../../models'
import faker from 'faker/locale/en'

export default factory.define('Expense', models.Expense, {
  id: factory.seq('id'),
  value: faker.finance.amount(0, 200),
  note: faker.lorem.sentence(),
  categoryId: factory.assoc('Category', 'id'),
  userId: factory.assoc('User', 'id')
})