const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define(
    "image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  image.associate = (db) => {
    db.image.belongsTo(db.post); // 이미지는 어떤 게시글에 속해있다.
  };

  return image;
}