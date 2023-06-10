const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class TeacherClass extends Model {}

TeacherClass.init(
  {
    teacherEmail: {
        type: DataTypes.STRING,
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
    modelName: "teacher_class",

  }
);

module.exports = TeacherClass;