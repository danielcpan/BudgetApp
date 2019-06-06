import faker from 'faker/locale/en';
import models from '../../models';

export default factory.define('Category', models.Category, (buildOptions ={}) => {
  const attrs = {
    name: () => faker.commerce.department(),
    icon: () => 'fa-icon',
    color: () => faker.internet.color(),
  }
  return attrs;
});
