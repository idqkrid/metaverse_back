const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      // MySQL에는 users로 테이블 생성
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  user.associate = (db) => {
    db.user.hasMany(db.post); // 사람이 포스트를 여러개 가질수 있다.
    db.user.hasMany(db.comment); // 작성자는 댓글을 여러개 쓸수 있다
    db.user.belongsToMany(db.post, { through: "Like", as: "Liked" }); // 좋아요

    db.user.belongsToMany(db.user, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    });
    db.user.belongsToMany(db.user, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    });
  };

  return user;
}