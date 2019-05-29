import Sequelize from 'sequelize'

export const isValid = async (object) => {
  let modelInstance = await object
  let errorsList = []

  await modelInstance.validate().catch(Sequelize.ValidationError, (status) => {
    errorsList = status.errors
  })
  
  return !errorsList.length
}
