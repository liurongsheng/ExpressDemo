// 日志工具
const { createLogger, format, transports } = require("winston");

const myFormat = format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

// 日志输出级别：info warn error
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    myFormat
  ),
  transports: [
    // 日志输出位置
    new transports.File({ filename: "./logs/applog.log" }), // 可以设置对应的 level: "error"
    new transports.Console(),
  ],
});

export default logger;
