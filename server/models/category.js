
const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          len: [2, 23],
        },
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
    }, {
      tableName: 'categories',
      underscored: true,
      sequelize,
    });
  }
}
