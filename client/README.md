# 前端项目

- 后端：使用Go开发
    - iris 框架 :https://iris-go.com/start/
    - iris 中文 https://studyiris.com/example/mvc/overview.html
    - beego 框架 https://beego.me/
   
- 后端：备选 rust
    - hyper https://docs.rs/hyper/0.10.15/hyper/
        - hyper起步 https://hyper.rs/guides/
       
        
- 前端：Vue 3
    - typescript开发
## 2.x 版本: 多国数据感知
- 引入vue-router

## todo 多路由

|名称|区域、行业、专题|
|---|---|
|/china|中国|
|/global|全球|
|/america|美国|
|/italy|意大利|
|/spain|西班牙|
|/korea|韩国|
|/japan|日本|
|/germany|德国|
|/serbia|塞尔维亚|
|/wuhan|武汉|
|/newyork|纽约|
|/tokyo|东京|
|/star|明星名人|
|/loss|损失|
|/sos|紧急呼叫~，援助的意思|
## china power 来自中国的援助

## 流程: 

消取都是

### 授权流程
**提醒：** 不要刷新页面，本页面与后端交互是通过socket.io，刷新页面即认为重新登录，需要重新走授权流程

1. 右上角仪表盘-点击Github小图标OAuth给本项目使用（仅注册使用，相关内容见 [OAuth](https://developer.github.com/v3/oauth/)，你也可以[取消授权](https://github.com/settings/installations)）

### 报告录入
1. 授权通过后，出现若干个按钮，点击录入，录入信息

### 审核流程
1. 管理员现为[@veaba](https://github.com/veaba) 人工审核，审核通过，即收录在时间轴里面，同时数据值也会被地图使用
2. 账号目前仅开放给Github用户，需要管理员权限的，可以联系[@veaba](https://github.com/veaba)


## 草稿
### 消息推送
todo 此处需要调整策略
上述情况下，两分钟一次后端推送权威媒体的新闻，推送给新闻流

### todo 爱心流程，如果信息录入流程
1. 也需要管理员审核，也会出现在timeline，地图上出现爱心的打点迁徙

### todo 紧急消息
1. 地图中间，出现modal，涉及到紧急消息的发放，
2. 1分钟后自动关闭modal
3. 帮助流也会走紧急消息弹窗

### todo新闻流又python爬虫+kafka完成，在考虑要不要接入报告流


## 技术栈

- Vue 3 
- 百度地图
- mapv
- socket.io
- webpack 4


## todo模块/Modules
- doing 感染地图，热点分布图
- todo 死亡热点图
- todo 迁徙图
- todo 根据时间线变换感染地图
- todo 查看传播层级，暂无
- todo 地区占比
- todo 性别占比
- todo 年龄占比
- todo 增加爬虫爬取`2019-nCoV`权威新闻
    - 微博
    - 央视新闻
    - 新华网
    - 其他省市地级医疗卫生官网
- todo help 需要帮助的信息流，在顶部滑动
- todo how，科普篇。我们应该怎么做？
- todo 紧急广播消息，走critical 频道

- todo 治愈消息- modal 弹窗
- todo 死亡消息- modal 小弹窗，花船形状，如果是医生，特殊标注

- todo Solution，解决方案  https://weibo.com/2803301701/IqYxcEt2D
## 实时渲染地图-> asyncChannel
```text
 eventName={
        ageChart =>,疫情感染年龄分布 饼图 {}，各阶段的年龄
        sexChart =>，疫情感染性别分布，饼图
        statisticsChart => 疫情生命特征统计分布 柱状图 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪}
        worldMap => 中间那个大地图所需的数据
        chinaTotalChart => 中国境内统计的横向 柱状带小柱图，有新数据会动，会排序 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪,province}省份
        loveChart => 爱心地图，迁徙线，红点小红心，表示从x国，x地到中国境内的资助，在大地图上展示
        chartPieChart   => 省份占比,
    }
```


## Report 参数

- count、suspected、dead、cure 必填其一
- country、province 必填
- newsUrl 必填
- desc 必填
- reportDate 必填

```text
 count: 5,
 suspected: 0,
 dead: 0,
 cure: 0,
 name: "",
 age: 0,
 sex: '1',
 profession: '1',
 country: "中国",
 province: "",
 city: "",
 area: "",
 newsUrl: "",
 desc: "",
 reportDate: "2020-01-28"
```

### 调整，数据录入转为对接腾讯新闻的接口


- timeline 
>  https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_time_line&callback=jQuery341023861980778706648_1580489435728&_=1580489435729
>
-  区域数据
> https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=jQuery34105682990664578291_1580489603511&_=1580489603512
