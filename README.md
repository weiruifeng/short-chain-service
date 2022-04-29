# inkjet-server

## 简介

inkjet-server 是喷绘相关的服务端

项目采用的是 **egg + typescript + mysql + sequelize** 开发方式。

## Deployment 部署

### development 开发模式

```sh
# initialize 初始化
yarn

# 项目启动
yarn run dev

```

开发模式访问 **127.0.0.1:8080**。

### production

```sh
# 项目编译
yarn run build

# 项目启动
yarn run start

# 项目停止
yarn run stop
```



## 其他

### 项目地址

http://dev.sankuai.com/code/repo-detail/MYFE/inkjet-server/file/list

### 发布地址


### thrift idl文件 生成ts代码
可参考：https://github.com/creditkarma/thrift-typescript

### request-node 使用文档

可参考：http://npm.sankuai.com/package/@myfe/request-node
