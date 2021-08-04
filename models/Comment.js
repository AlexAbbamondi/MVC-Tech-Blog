//required modules
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

//class to extend
class Comment extends Model {}

//table fields to create
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
