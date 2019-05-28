import Sequelize from 'sequelize'

export const isValid = async (object) => {
  let errorsList = []
  await object.validate().catch(Sequelize.ValidationError, (status) => {
    errorsList = status.errors
  })
  
  return !errorsList.length
}
