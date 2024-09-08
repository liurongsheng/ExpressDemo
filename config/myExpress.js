import logger from "../app/utils/logger";
import fs from "fs"; // node提供的
import express from "express";
import bodyParser from "body-parser";
import util from "util";
import path from "path";

// require 是 node 的写法，可以修改为 es6 的写法
// const express = require("express");
// const bodyParser = require("body-parser");
// const util = require("util");

// module.exports = function (prot) { // 下面的 export default 是 es6 的导出方式
export default function (prot) {
  const app = express();
  const router = express.Router();

  // 暴露 app.listen 把监听方法延迟执行
  app.listenAsync = util.promisify(app.listen);

  // 跨域 node nginx webpack cors，这里是后端常用的 cors 配置，本质就是中间件(拦截器)
  app.use(function (req, res, next) {
    // http请求的来源
    res.setHeader("Access-Control-Allow-0rgin", "*");
    // http请求的方法 get put post delete
    res.setHeader("Access-Control-Allow-Methods", "*");
    // http请求的头
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  // 日志中间件
  app.use(async (req, res, next) => {
    if (req.originalUrl.includes("/getList")) {
      console.log("请求开始...");
      await next();
      console.log("响应结束...");
    } else {
      next();
    }
  });

  // 配置 body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // // JSON 响应
  // app.get("/json", function (req, res) {
  //   const obj = { name: "sai", age: 21 };
  //   res.json(obj);
  // });

  // // API 路由
  // router.get("/api/getList", function (req, res) {
  //   console.log("获取列表");
  //   res.status(200).send("list data");
  // });

  // // 添加路由
  // app.use("/", router);
  // 抽取路由的方式，这里使用的是绝对路径，process.cwd() 当前项目根目录
  require(process.cwd() + "/app/routers/user.route.js")(app);

  // 动态加载路由，要找到routers目录下面所有的文件 动态加载
  const currentDir = process.cwd();
  const routerDir = currentDir + "/app/routers";
  logger.info("routerDir", routerDir);
  // 同步读取目录下的文件
  fs.readdirSync(routerDir).forEach((file) => {
    // 拼接文件路径
    const filePath = path.join(routerDir, file);
    console.log(filePath);
    require(filePath)(app);
  });

  // 全局异常处理
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // 启动服务器
  // app.listen(prot, function () {
  //   console.log("server started，端口："+ prot);
  // });
  return app;
}
