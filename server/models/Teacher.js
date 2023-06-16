const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Teacher extends Model {}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefix: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    oneTimePassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    }
  },

  {
   
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "teacher",

  }
);

module.exports = Teacher;