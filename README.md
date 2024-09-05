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
