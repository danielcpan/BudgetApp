import faker from 'faker/locale/en';
import models from '../../models';

export default factory.define('Expense', models.Expense, {
  value: () => faker.finance.amount(0, 200),
  note: () => faker.lorem.sentence(),
  categoryId: factory.assoc('Category', 'id'),
  userId: factory.assoc('User', 'id'),
});
