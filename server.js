// 导入myexpress模块--函数，express()代表执行函数
// const express = require("./config/myExpress"); 非 es6 写法
import express from "./config/myExpress";
import config from "./config/config";
// logger
import logger from "./app/utils/logger";

const port = config.port;
const server = express(port);

server.listenAsync(port).then(()=> {
  logger.info("服务器启动成功，请访问：http://localhost:" + port)
});
