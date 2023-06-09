const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class ParentStudent extends Model {}

ParentStudent.init(
  {
    parentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "parent_student",

  }
);

module.exports = ParentStudent;