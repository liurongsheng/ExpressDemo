import logger from "../utils/logger";

// 用户接口 控制器
const userCtrl = {
  // request  response
  login: function (req, res) {
    logger.info("登录成功...");
    // res.send("login");
    res.json({ msg: "登录成功", code: 200 });
  },
};

export default userCtrl;
