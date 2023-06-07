import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { compareSync, hash } from "bcrypt";

class Teacher extends Model {

  checkPassword(loginPw) {
    return compareSync(loginPw, this.password);
  }
  
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },

  {
    hooks: {

      beforeCreate: async (newUserData) => {
        newUserData.password = await hash(newUserData.password, 10);
        return newUserData;
      },

    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "teacher",

  }
);

export default Teacher;