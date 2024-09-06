const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "jd_user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "用户Id",
      },
      account: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "账号",
        unique: "account",
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "密码",
      },
      real_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "真实姓名",
      },
      reg_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "注册时间",
      },
      remark: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: "备注",
      },
      creator: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: "创建人",
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "创建时间",
      },
      modified: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "修改时间",
      },
    },
    {
      sequelize,
      tableName: "jd_user",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "account",
          unique: true,
          using: "BTREE",
          fields: [{ name: "account" }],
        },
      ],
    }
  );
};
