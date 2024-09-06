// 系统常用的配置项
const config = {
  // vuecli --- 多环境 process.env.development
  // 先从环境变量中查找PORT, 若没有则使用默认端口3000
  port: process.env.PORT || 3000,
  db: {
    database: "jindu_loan",
    username: "root",
    password: "root@admin",
    host: "127.0.0.1",
    port: 3306,
    timezone: "+08:00",
    dialect: "mysql", // 设置数据库方言为 MySQL。在实际代码中，这一配置通常用于指定数据库连接的类型或驱动
    define: {
      timestamps: false,
    },
  },
};

export default config;
