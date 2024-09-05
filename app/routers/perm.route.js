// 权限路由
import express from "express";
import User from "../controllers/user.ctrl";
const router = express.Router();

export default function (app) {
  router.route("/perm/query").get(User.login); // http://localhost:4000/api/user/login
  // router.route('./user/query').get();
  app.use("/api", router);
}
