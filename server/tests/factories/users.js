import Factory from 'factory-girl'
import models from '../../models'
import faker from 'faker/locale/en'

export default Factory.define('User', models.User, {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  userRole: faker.name.jobType()
})
