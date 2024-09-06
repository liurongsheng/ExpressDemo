#!/bin/bash
HOST="127.0.0.1"
DB="jindu_loan"
USER="root"
PASS="root@admin"
PORT="3306"
DIR="./models"
#JSON_DEFINED="."
EXEC="sequelize-auto -o ${DIR} -d ${DB} -h ${HOST} -u ${USER} -p ${PORT} -x ${PASS} -e mysql"
#EXEC="sequelize-auto -o ${DIR} -d ${DB} -h ${HOST} -u ${USER} -p ${PORT} -x ${PASS} -e mysql -a ${JSON_DEFINED}"

#sequelize是node最受欢迎的orm库，普遍使用 Promise. 意味着所有异步调用可以使用 ES2017 async/await 语法.
#sequelize-auto是可以生成sequelize模型的一个工具
#npm install -g sequelize-auto mysql2
#-h 数据库的IP地址 
#-d 数据库名 
#-u 用户名 
#-x 密码 
#-p 端口 
#-t 表名
#-e 数据库类型
#-a  json定义文件路径，可以追加一些自定义配置，如{"timestamps": false}
#sequelize-auto -o . -h localhost -d jindu_loan -u root -x root -p 3306
#run
$EXEC
