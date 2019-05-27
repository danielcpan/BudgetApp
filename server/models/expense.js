'use strict'
import Sequelize from 'sequelize'

export default class Expense extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      note: {
        type: DataTypes.STRING(255),
      }
    }, { 
      tableName: "expenses",
      underscored: true,
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: {
       name: 'categoryId', 
       field: 'category_id'
      },
      onDelete: 'cascade'
    })
  }
}