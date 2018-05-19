# react-boilerplate-baseon-webpack4

### 一、概述

    基于webpack4的react样板，可在此基础上完成react的开发。

### 二、如何使用

    1、git clone  https://github.com/wang-qingqing/react-boilerplate-baseon-webpack4.git
    
    2、yarn install
        
    3、运行
    （1）开发环境：
      执行 yarn run start，该项目将在 http://localhost:8080/ 中运行。
      
    （2）生产环境：
      yarn run build
      

### 三、目录结构

    .
    +-- mock    模拟接口数据
    |   +-- mockdata.js
    
    +-- node_modules   依赖包
    +-- dist      生产环境打包后输出的文件
    +-- src       源文件
    |   +-- components   组件
        |   +-- pages     公用组件
            |   +-- notFound.js   404组件

        |   +-- todoList  待办事项
            |   +-- todoItems.js
            |   +-- todoView.js

        |   +-- main.js   

    |   +-- helper    工具或者辅助函数
        |   +-- system.js   包含日期时间、校验等方法

    |   +-- images    图片
        |   +-- peppa.jpg

    |   +-- routes    路由
        |   +-- extendRoute.js   子组件路由
        |   +-- mainRoute.js     主路由

    |   +-- store    状态管理
        |   +-- store.js    所有的状态入口
        |   +-- todoStore.js   子状态（待办事项）

    |   +-- style   样式
        |   +-- index.scss

    |   +-- index.html   主页面
    |   +-- index.js     入口

    +-- package.json         项目配置
    +-- webpack.config.js    webpack的配置文件
    +-- yarn.lock
    +-- README.md            项目说明
