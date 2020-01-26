# 前端项目

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
- todo 增加爬虫爬取关于`2019-nCoV`权威新闻
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
