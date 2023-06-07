const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { compareSync, hash } = require("bcrypt");

class Parent extends Model {

  checkPassword(loginPw) {
    return compareSync(loginPw, this.password);
  }
  
}

Parent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
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
    modelName: "parent",

  }
);

module.exports = Parent;