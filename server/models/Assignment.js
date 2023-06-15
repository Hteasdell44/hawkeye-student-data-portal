const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Assignment extends Model {}

Assignment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "assignment",

  }
);

module.exports = Assignment;