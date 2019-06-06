import faker from 'faker/locale/en';
import models from '../../models';

export default factory.define('User', models.User, (buildOptions = {}) => {
  const attrs = {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    email: () => faker.internet.email(),
    userRole: () => faker.name.jobType(),    
  }
  return attrs;
});
