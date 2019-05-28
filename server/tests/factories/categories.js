import Factory from 'factory-girl'
import models from '../../models'
import faker from 'faker/locale/en'

export default Factory.define('Category', models.Category, {
  name: faker.commerce.department(),
  icon: "fa-icon",
  color: faker.internet.color()
})
