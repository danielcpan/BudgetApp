'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
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
        len: [2,23]
      }
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'last_name',
      validate: {
        len: [2,23]
      }      
    },  
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    userRole: {
      type: DataTypes.STRING(255),
      defaultValue: "GUEST"
    }
  }, { underscored: true });
  
  return User;
};
