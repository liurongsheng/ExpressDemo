// 系统常用的配置项
const config = {
  // vuecli --- 多环境 process.env.development
  // 先从环境变量中查找PORT, 若没有则使用默认端口3000
  port: process.env.PORT || 3000,
};

export default config;
