//required modules
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

//class to extend
class Post extends Model {}

//table fields to create
Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
