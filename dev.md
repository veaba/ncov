# todo开发

基于Vue 3 + 百度地图+Mapv搭建的可视化大屏。

目前vue 3生态未成熟，无法使用高阶技能，因为配置webpack 搞了一天。


## 技术栈/Technical framework

### 前端: 
- vue3
- echarts
- 百度地图
- mapv
- nginx
- webpack 
- socket.io

### 后端：
- python 爬虫（todo 大数据分析）
- mongodb 存储
- redis 
- kafka
- node 主要给页面提供转接内容和socket通信

## API

为外部提供2019-nCoV 数据


- 直接对接2019-ncov.datav.ai 的socket.io 并提供几个emit事件

### emit

每1-2分钟推送一次

- getTotal
- getWorldMap
- getChinaRank
- getWorldRank
- getChinaDay

### on
每1-2分钟推送一次

- getTotal
- getWorldMap
- getChinaRank
- getWorldRank
- getChinaDay
