// 用户路由
import express from "express";
import jwt from "jsonwebtoken";
import userCtrl from "../controllers/user.ctrl";
import Constant from "../utils/constant";

const router = express.Router();

export default function (app) {
  router.route("/user/login").post(userCtrl.login); // http://localhost:4000/api/user/login

  router.route("/user/add").post(userCtrl.create);
  router.route("/user/query").get(userCtrl.query);
  router.route("/user/query/page").get(userCtrl.queryPage);
  router.route("/user/update").post(userCtrl.update);
  router.route("/user/delete").post(userCtrl.delete);

  // jwt拦截器
  let checkLogin = (req, resp, next) => {
    console.log("checkLogin:", req.originalUrl);
    // 跨域试探  预请求
    if (req.method === "OPTIONS") {
      resp.send({});
    } else if (req.originalUrl === "/user/login") {
      next();
    } else if (req.headers.hasOwnProperty("token")) {
      jwt.verify(req.headers.token, Constant.secret, function (err, decode) {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            resp.send("token无效！请重新登录！");
          }
          if (err.name === "TokenExpiredError") {
            // resp.send("token过期了！请重新登录！")
            // 若token刚过期且还在使用 需要重新生成新token
            // 过期时间(分钟)=现在时间-过期时间
            let expiredTime = (
              (new Date().getTime() - err.expiredAt.getTime()) /
              (1000 * 60)
            ).toFixed(2);
            console.log(expiredTime);
            // 半小时过期 再操作时自动生成新token
            if (expiredTime <= 30) {
              // 前端code==20002表示要更新token
              // 后续代码 类似 generateJwtToken(data)
              // let jwt = userCtrl.generateJwtToken(result);
              // resp.json({ code: 200, data: data, token: jwt });
              resp.send("生成新token，请客户端更新token");
            } else {
              resp.send("token过期了！请重新登录！");
            }
          }
        } else {
          // token有效
          next();
        }
      });
    } else {
      // 无token
      resp.send("token不存在，拒绝访问。");
    }
  };
  app.use(checkLogin);

  // 使用上面的路由
  // http://localhost:8080/api/user/query
  // 给所有路由添加前缀
  // app.use('/api', router);
  app.use("/", router);
}
