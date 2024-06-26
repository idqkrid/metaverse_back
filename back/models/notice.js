const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const notice = sequelize.define(
    "notice",
    {
      // MySQL에는 users로 테이블 생성
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  notice.associate = (db) => {
    db.notice.belongsTo(db.user); // 어떤 게시글을 어떤 작성자에게 속해있다.
  };

  return notice;
}