
const Sequelize = require('sequelize');

module.exports = class Expense extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      tableName: 'expenses',
      underscored: true,
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        // allowNull: false,
      },
      onDelete: 'cascade',
    });
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  }
};
