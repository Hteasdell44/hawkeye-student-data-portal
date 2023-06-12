const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class StudentClassAssignment extends Model {}

StudentClassAssignment.init(
  {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    assignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "student_class_assignment",

  }
);

module.exports = StudentClassAssignment;