const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class StudentClass extends Model {}

StudentClass.init(
  {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "student_class",

  }
);

module.exports = StudentClass;