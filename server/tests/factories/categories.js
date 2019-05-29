import models from '../../models'
import faker from 'faker/locale/en'

export default factory.define('Category', models.Category, {
  name: () => faker.commerce.department(),
  icon: () => "fa-icon",
  color: () => faker.internet.color()
})
