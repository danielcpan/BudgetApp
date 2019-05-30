import Sequelize from 'sequelize'
import models from '../models'

export const isValid = async (object) => {
  let modelInstance = await object
  let errorsList = []

  await modelInstance.validate().catch(Sequelize.ValidationError, (status) => {
    errorsList = status.errors
  })
  
  return !errorsList.length
}

export const truncateTables = async () => {
  return Promise.all(
    Object.keys(models).map((modelName) => {
      if (['sequelize', 'Sequelize'].includes(modelName)) return null;
      return models[modelName].destroy({ truncate: { cascade: true }})
    })
  );
}

export const syncTestDatabase = async () => {
  await models.sequelize.sync({
    force: true
  })
}
