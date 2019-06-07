
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
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
    }, {
      tableName: 'categories',
      underscored: true,
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
    this.hasMany(models.Expense, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id',
      },
      onDelete: 'cascade',
    });
  }
};
