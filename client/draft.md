# 前端规划草稿

## 灵感、一些idea、启发
- 2020年4月8日。武汉解除主城的封锁，可以出个特别专题来纪念
- 2020年4月8日  收集医生的愿望
- 2020年4月8日 多国语言对医生的感谢
- http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml 中国卫健委通报使用大数据分析 todo
    - python 爬虫爬取信息，然后录入，再打标签
    - 80个Python练手项目列表 https://www.shiyanlou.com/questions/102676/
    - word2vec 语料库, 训练模型
        - word2vec google demo https://github.com/tensorflow/tensorflow/blob/r0.12/tensorflow/examples/tutorials/word2vec/word2vec_basic.py
    - python-gensim
    - Jieba 中文分词工具 https://github.com/fxsjy/jieba
    - 百度飞浆官方模型库 https://github.com/PaddlePaddle/models
    - 使用大数据来定位数值
    - 截至4月7日24时新型冠状病毒肺炎疫情最新情况
    - 截至4月6日24时新型冠状病毒肺炎疫情最新情况
- 中国发布新冠肺炎疫情信息、推进疫情防控国际合作纪事
    - http://www.nhc.gov.cn/xcs/fkdt/202004/ef0708c0e01f452492dbf6c418ef41a0.shtml
- 新冠肺炎疫情防控海外华人华侨互联网咨询平台链接 https://covid19consulting.alliancebrh.com/
- WHO专题： https://who.sprinklr.com/ 疫情地图
    - https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports 数据统计
- 中国疫情：
- Johns Hopkins University (JHU) 约翰斯·霍普金斯大学 现在最权威的： https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
- 特警摩托车载着医生的动画
- 航空界最高礼遇
- 2020年4月8日 重症八仙 http://www.nhc.gov.cn/xcs/yhfc/202004/525ce7df270847b2a0105b3fb84dbb62.shtml
- 2020年4月8日 患者同乘 http://bmfw.www.gov.cn/ggjtmqjczcx/index.html
- 中国疾病预防控制中心 http://2019ncov.chinacdc.cn/2019-nCoV/
    - 获取从20200110 开始的中国数据 http://49.4.25.117/JKZX/yq_20200110.json
    - 获取从20200119 开始的全世界数据 http://49.4.25.117/JKZX/gb_yq_20200413.json
    - [中国CDC](http://www.chinacdc.cn/)
- 清华大学等机构的开放数据源（COVID-19） https://www.aminer.cn/data-covid19/
## 全局特性
- i18n 
- 因疫情影响，全球失业人数统计，均分到各国
- 因疫情影响，去年或往年同时期正常死亡人数曲线
- 因疫情影响，公司倒闭、破产数量
- 全世界的确诊人数叠加曲线，大致可以看得出全局型的折线图
- 全世界确诊人数叠加曲线

### 难点和人力
- 谁来录入这些数据？怎么录入比较轻松
- 各国的官方机构报出来的人数如何统计？或者说各国的权威卫生网站
## 工作计划
- ui 设计
- 数据来源
- 页面展示
- life 模块 先完成

### 周期
全部功能需要3-6个月以上
 
## 路由规划（成品不一定全部实现）

### Country/area 200+个地区（由于路由，此处不再大写开头）

- china                 中国
    - 确诊人数
        - 重症人数
    - 治愈人数
    - 死亡人数
    - 风险评估等级
    - 卫生响应等级：各省份
    - 从 x日~ x 日
        - 确认人数曲线
        - 死亡人数曲线
    - 
- america               美国
- korea                 韩国
- uk                    英国
- serbia                塞尔维亚
- japan                 日本
- singapore             新加坡
- india                 印度
- italy                 意大利
- russia                俄罗斯
- france                法国
- spain                 西班牙
- germany               德国
- pakistan              巴基斯坦
- iraq                  伊拉克
- iran                  伊朗
- laos                  老挝
- cambodia              柬埔寨
- philippines           菲律宾

### Hot City 热门的城市、大型都市

- wuhan                 武汉
- newYork               纽约
- tokyo                 东京
- hongkong              香港
- macao                 澳门
- taiwan                台湾

### loss                 损失

- index                 概览
- industry-assessment   行业评估。比如软件业可能影响较小的评估，可远程
- economy               经济损失
- car                   汽车行业损失
- real-estate           房地产行业损失
- company               企业损失
- aquaculture           养殖业
- airline               航空
- boat                  船舶

### ecology              生态
- index                 概览
- sea                   海洋生态
- land                  陆地生态
- antarctic             南极
- arctic                北极
- rivers                河流

### Life                 声明、汇总一些名人科学家去世
- scientist             科学家
- star                  明星
- politicians           政要
- medical               医疗人员、医生
- police                警察
- businessmen           企业家

### job                  就业：出现失业、就业难


### game                 游戏行业

### entertainment        娱乐行业

### research             研究
- vaccine               疫苗
- origin                COVID-19 where origin
- paper                 论文，研究者发布的论文

### rescue               医疗救援行动
- to-italy              援助意大利
- to-serbia             援助塞尔维亚

### love                 捐助、捐款行动
- index                 捐助概览
- alibaba               阿里巴巴公益基金捐助
...

### global               全球
- index                 全球概览
  - total               感染确诊数目统计
  - dead                死亡数目统计
  - confirm             确诊数目增长和数目
  - 统计多少个国家被感染
  - 统计每个国家确诊数目的比例
  - 统计每个国家的死亡数目
  - 统计每个国家死亡率
  - 统计每个国家治愈数目
  - 统计每个国家现有治愈数目
  - 统计每个国家的第一例从何时开始，做一些统计图
  - 旅游高风险感染区
  
### who 世界卫生组织
### solution
- index                 解决方案概览
  - [covid-19-china-solution](https://github.com/veaba/covid-19-china-solution) 发布中国解决方案的文档
  
### hero                 抗疫表现的备受鼓舞和信任的个人或团体
- zhongnanshang         钟南山
- lilanjuan             李兰娟
- liwenliang            李文亮
- zhangwenhong          张文宏
- zhangboli             张伯礼


### argue                争议

### evaluate             评价

### about                关于


## 数据分享的方式
- 直播
- 社交模式
- 可视化每日定时生成报表数据推送到各大社交网络
- github OAuth
- facebook OAuth
- weChat OAuth
- QQ OAuth
- google OAuth
- weibo OAuth
- microsoft OAuth


## i18n 国际化

## 开发

### 数据源
