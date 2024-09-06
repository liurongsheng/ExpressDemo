const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "jd_loan_approve",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "id",
      },
      loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "贷款id",
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "审批人",
      },
      result: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: "通过(pass)/拒绝(refuse)",
      },
      step: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: "审批步骤(first/final)",
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
      tableName: "jd_loan_approve",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
