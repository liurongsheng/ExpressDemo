# ExpressDemo

- npm init 创建 package.json 文件
- 安装依赖包
  cnpm i -S express body-parser
  express：基于 node 的一个 web 框架
  body-parser: 用于 http 请求中 body 的解析
- 停止服务 ctrl+c 启动服务 node xxx.js

## 路由--请求接口井并

web 框架都有路由 mVC
express + jade -- 前端模板，用于展示数据,类似于 vue template
可以不同的请求地址 router.get
在项目中可以将接口抽离封装

## 中间件实现原理

- 可以理解为拦截器

## 模块化

```js
const express = require("./config/myExpress");
const server = express(prot);

module.exports = function (prot) {
  ...
}
```

端口不能修改，可以显示的传参
希望能够把 app.listen 暴露出去，可以通过 promise 方式

## vue 请求不变化的数据 固定列表

axios---->server
axios---->VueX---->server 通常使用 promise 方式封装

vuex:

```js
return new Promise((resolve, reject) => {
  // 请求拿到的数据先存入vuex
  resolve(data); // 返回前端
});
```

前端
直接取 vuex 数据

## 支持 es6 模块化

babel-cli 包括 babel-node
npm i -S babel-cli babel-preset-env babel-plugin-add-module-exports

测试:
npx babel-node

`(x=>x*2)(3)`

配置.babelrc

## 跨域

- cors 后端处理
- nginx 中间代理
- webpack proxy 中间代理 仅限开发使用 打包后无效
- node、nginx、webpack、cors 多种方式

## cookie(浏览器)--session(服务器)

cookie---5k
默认 id xxxxx 登录成功后 yyyyyy 小王-浏览器小张

通过会话 cookie--session 识别不同用户

登录后服务端分配的 cookie id 和 session id 是绑定关系
登录成功--生成新 sessionid--返回浏览器并设置到 cookie id

chrome >= 80 版本 http 协议下不再携带 cookie，https 下支持
chrome 也有开关 测试环境下可以关闭该功能，让带上 cookie
小程序 线上环境一定是 https 测试环境可以是 http(开关)

## 框架日志

日志非常重要，运维，调试

npm i -S winston

## 项目可配置性

搭建项目灵活多变，可配置，如改个环境变量
如数据库账号密码
对 port 进行可配置性处理

npm i -S cross-env

cross-env PORT=4000
cross-env 可以设置环境变量

通过 cross-env 在程序启动前设置环境变量 PORT

## 路由配置

- 把路由单独抽离，动态加载所有路由
- 在路由中把绑定控制器对应方法

## 控制器

- 控制器主要是分离业务逻辑

## express 和 koa 的区别

### 中间件处理方式

- Express 使用的是同步式的中间件处理机制，中间件可以使用 next() 函数来决定控制权传递给下一个中间件
- Koa 则利用了 ES6 的 async/await 特性，实现了异步控制流，使得中间件的执行更加清晰和简洁

### 错误处理

- 在 Express 中，错误处理通常需要显式地捕获和传递，通过使用 next(err) 将错误传递给下一个错误处理中间件
- 在 Koa 中，错误处理更简单，通过 async/await 的语法糖，可以更方便地处理错误，并且错误处理中间件可以捕获并处理所有错误

### 版本和社区支持

- Express 是目前最流行的 Node.js 框架之一，拥有庞大的社区支持和丰富的插件生态
- Koa 相对较新，由 Express 原班人马开发，旨在解决 Express 中的一些限制，虽然社区也在不断壮大，
  但在插件和资源上可能不如 Express 丰富

### 灵活性与轻量性

- Express 提供了许多内置功能，如路由、中间件、模板引擎集成等，适合构建大型应用
- Koa 更加轻量级，提供了基础的功能集，鼓励开发者根据需求选择合适的中间件，适合对性能要求较高或需要高度定制的应用场景

`npm i -S koa koa-router`

```js
const koa = require("koa");
const Router = require("koa-router");

const app = new koa();
const router = Router();

// 拦截器1
app.use(async (ctx, next) => {
  console.log("拦截器开始1");
  await next();
  console.log("拦截器结束1");
});

// 拦截器2
app.use(async (ctx, next) => {
  console.log("拦截器开始2");
  await next();
  console.log("拦截器结束2");
});

router.get("/api/test", (ctx, next) => {
  const json = { name: "koa" };
  console.log("我是内容");
  ctx.body = JSON.stringify(json);
});

app.use(router.routes());

app.listen(3000, () => console.log("server start"));
```

// 输出内容

```text
server start
拦截器开始1
拦截器开始2
我是内容
拦截器结束2
拦截器结束1
```

总结：

- express 异步回调多层嵌套
- koa 异步同步化，对 Promise 支持较好

“洋葱皮"：从外到里面一层一层包裹

调用的过程：从左边最外层 ---> 最里面 ---> 从右边最外层出来

## 后端服务的分层

- 路由--将请求跳转到对应的控制层
- 控制层--对参数进行检查校验，不合格直接返回错误
- 服务层--拿参数进行业务处理，查询，统计等
- ORM 数据访问层/sql--去数据库取数据
- 数据库

数据访问的方式:

- ORM--通过 js 对象的方式访问数据，不需要写sql
- sql--通过写脚本的方式查询数据

## ORM 数据访问框架-Sequelize

[sequelize](https://www.sequelize.cn/core-concepts/getting-started)

需要数据模型对象去访问数据

数据模型对象--数据库表 一一对应

## 创建模型对象

可以通过脚本的方式自动生成所有的数据模型对象

脚本里面需要配置数据库的连接，生成数据模型对象

`npm install -g sequelize sequelize-auto mysql`

使用脚本 `sequelize-modal.sh` 通过 `sequelize-auto` 把数据库表生成到 models 目录下

win: cmder/git bashshsequelize-model.sh

## 加载模型对象

在 modules 下创建 index.js 用于加载所有模型文件
其它模块需要使用模型时，只需引入 index

`npm install -S sequelize mysql mysql2`

## 实现基于 sequelize 框架的 增删改查

- 实现 service 中增删改查逻辑
- 在控制台中调用 service 中的方法

## 分页查询

前端传参数：

- 起始页码 pageNo
- 分页大小 pageSize

后端返回:

- 总条数 total
- 总页数 totalPage，9/2 = 4.5，向上取整 `Math.ceil(4.5) = 5`
- 当前页码 pageNo

## Jwt 令牌权限控制 (Json Web Token)

`npm i -S jsonwebtoken`

cookie 存储在浏览器的本地，每次请求都会携带 cookie，大小闲置在 4k，一般不会超过 4k

session 存储在服务器内存中，不是永久保存，每次请求都会携带 sessionId

```text
客户端     服务端

用户使用账号密码登录
----->
          服务端验证并生成 session 对象

服务端将 sessionId 发送给客户端
<-----

客户端在浏览器中保存 sessionId

客户端每次请求都携带 sessionId到服务器
----->

           服务端收到 sessionId 后，与之前保存的对比以确认用户身份 
```

- 这种认证方式会大量占用服务器的 session 存储
- chrome 80版本 http协议默认不带cookie

JWT 过期--刚过有效期半小时内
JWT 无效--有效期超过半小时

JWT自带过期时间（exp claim），一旦过期，令牌自动失效，生成后的有效期不能被篡改，只可以重新生成

## nodemon

在保存项目文件时，自动重启服务

`npm i -S nodemon`

## 项目部署

window

- 阿里云、腾讯云、华为云，独立服务器
- 远程桌面，直接远程到服务器上
- 把项目文件复制过去
- 安装依赖，启动服务
- 打开对应的服务端口，如4000
