import jwt from "jsonwebtoken";
import Constant from "../utils/constant";
import logger from "../utils/logger";
import * as userService from "../services/user.service";

// 用户接口 控制器 业务逻辑
const userCtrl = {
  // 生成jwt token
  generateJwtToken(data) {
    return jwt.sign(data, Constant.secret, {
      expiresIn: "60000", // 单位 毫秒  1d-1天
    });
  },
  // request  response
  login: function (req, resp) {
    logger.info("===登录开始");
    // resp.send("hello")
    let { account, pwd } = req.body;
    // 判断account pwd为空
    if (account && pwd) {
      userService.findUserByAccountPassword(account, pwd).then((data) => {
        // console.log(data)
        if (data) {
          // 生成jwt
          let result = {
            id: data.id,
            account: data.account,
          };

          let jwt = userCtrl.generateJwtToken(result);
          resp.json({ code: 200, data: data, token: jwt });
        } else {
          resp.json({ code: 200, msg: "无此用户" });
        }
      });
    } else {
      resp.json({ code: 200, msg: "参数无效!" });
    }
  },

  // 新增
  create: function (req, resp) {
    // 接口文档中规定 传user的json对象必须要body中
    const user = req.body;
    logger.info("user:" + JSON.stringify(user));
    return userService
      .createUser(user)
      .then((data) => {
        var result = {
          data: data,
        };
        resp.status(200).json(result);
      })
      .catch((err) => {
        logger.error(err);
        resp.status(500).send(err);
      });
  },
  // {
  //   "account": "aaaa",
  //   "password": "123456",
  //   "realName": "xxx",
  //   "reg_time": "2024-09-07",
  // }

  // 查询
  query: function (req, resp) {
    const userId = req.query.userId;
    return userService
      .findUser(userId)
      .then((data) => {
        var result = {
          data: data,
        };
        resp.status(200).json(result);
      })
      .catch((err) => {
        logger.error(err);
        resp.status(500).send(err);
      });
  },

  // 分页查询
  queryPage: function (req, resp) {
    // const pageNo = req.query.pageNo;
    // const pageSize = req.query.pageSize;
    let { pageNo, pageSize, name } = req.query;
    return userService
      .findPage(pageNo, pageSize, name)
      .then((data) => {
        var result = {
          data: data,
        };
        resp.status(200).json(result);
      })
      .catch((err) => {
        logger.error(err);
        resp.status(500).send(err);
      });
  },

  // 更新
  update: function (req, resp) {
    const user = req.body;
    return userService
      .updateUser(user)
      .then((data) => {
        var result = {
          data: data,
        };
        resp.status(200).json(result);
      })
      .catch((err) => {
        logger.error(err);
        resp.status(500).send(err);
      });
  },

  // 删除
  delete: function (req, resp) {
    const id = req.body.id;
    return userService
      .deleteUser(id)
      .then((data) => {
        var result = {
          data: data,
        };
        resp.status(200).json(result);
      })
      .catch((err) => {
        logger.error(err);
        resp.status(500).send(err);
      });
  },
};

export default userCtrl;
