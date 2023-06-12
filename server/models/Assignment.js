const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Assignment extends Model {}

Assignment.init(
  {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

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