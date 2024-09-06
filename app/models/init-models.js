var DataTypes = require("sequelize").DataTypes;
var _jd_area_info = require("./jd_area_info");
var _jd_contract = require("./jd_contract");
var _jd_loan = require("./jd_loan");
var _jd_loan_approve = require("./jd_loan_approve");
var _jd_module = require("./jd_module");
var _jd_role = require("./jd_role");
var _jd_role_module = require("./jd_role_module");
var _jd_user = require("./jd_user");
var _jd_user_role = require("./jd_user_role");

function initModels(sequelize) {
  var jd_area_info = _jd_area_info(sequelize, DataTypes);
  var jd_contract = _jd_contract(sequelize, DataTypes);
  var jd_loan = _jd_loan(sequelize, DataTypes);
  var jd_loan_approve = _jd_loan_approve(sequelize, DataTypes);
  var jd_module = _jd_module(sequelize, DataTypes);
  var jd_role = _jd_role(sequelize, DataTypes);
  var jd_role_module = _jd_role_module(sequelize, DataTypes);
  var jd_user = _jd_user(sequelize, DataTypes);
  var jd_user_role = _jd_user_role(sequelize, DataTypes);

  return {
    jd_area_info,
    jd_contract,
    jd_loan,
    jd_loan_approve,
    jd_module,
    jd_role,
    jd_role_module,
    jd_user,
    jd_user_role,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
