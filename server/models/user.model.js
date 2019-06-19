
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'first_name',
        validate: {
          len: [2, 23],
        },
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'last_name',
        validate: {
          len: [2, 23],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userRole: {
        type: DataTypes.STRING(255),
        defaultValue: 'GUEST',
        field: 'user_role',
      },
    }, {
      tableName: 'users',
      underscored: true,
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Expense, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  }

  async getTotalExpenses() {
    let totalExpense = 0;
    const expenses = await this.getExpenses();

    expenses.forEach((expense) => {
      totalExpense += parseFloat(expense.cost);
    });

    return totalExpense.toFixed(2);
  }
};