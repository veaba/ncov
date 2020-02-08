# ncov
Focus on Wuhan 2019-nCoV, data visualization, to help analyze the epidemic situation.  May the world be well. 关注新型肺炎，数据可视化，以提供帮助分析疫情。 愿世界安好。


> 声明：本库旨在分析有关nCvo官方提供的地点、人数、等医学数据进行分析可视化数据。同时个人也希望能够相关工作提供一丢丢儿分析帮助，如果觉得该仓库帮倒忙，请联系作者删除仓库。并为未来可能引发不好的事件致歉。by @veaba 2020年1月20日10:42:30


<p align="center">
 <a href="http://2020-ncov.datav.ai">2020-nCov感染可视化(科学上网)</a> |   
 <strong>
  <a href="http://2019-ncov.datav.ai">2019-nCov新版可视化(全实时通信)</a>
 </strong>
<p>

![](client/public/new-screen.png)




## 关于本仓库软件架构

- master 目前新大屏是beta 版本，稳定后，逐渐将feat-auth 分支切到master上，还有很多todo
- 资源较大，仅支持大屏
- 每次断开都需要重新授权

前端: 
- vue3
- echarts
- 百度地图
- mapv
- nginx
- webpack 
- socket.io

后端：
- python 爬虫（todo 大数据分析）
- mongodb 存储
- redis 
- kafka
- node 主要给页面提供转接内容和socket通信


内容：
- 所有内容一律容器化（docker、docker-compose）
- 通信全走实时通信socket.io 
- 全世界RANK
- 中国省份RANK
- 疫情饼图
- 统计数据由更新会自动滚动
- 地图数据全部是实时
- 内容更新1-3分钟不等

数据：
本页面内容API 走的腾讯新闻的接口



## todo模块/Modules
- doing 感染地图，热点分布图
- todo 死亡热点图
- todo 迁徙图
- todo 根据时间线变换感染地图
- todo 查看传播层级
- todo 地区占比
- todo 性别占比
- todo 年龄占比
- todo 增加爬虫爬取关于`2019-nCoV`权威新闻
    - 微博
    - 央视新闻
    - 新华网
    - 其他省市地级医疗卫生官网


## toto预测/Forecast

> 基于AI模型分析

## todo 对比2003SaRS

|比较项目|SARS(非典/严重急性呼吸系统综合征)|2019-nCoV(2019新型冠状病毒)|
|-------|-----------------------------|-------------------------|
|发病时间|2003年11月16日|2019年12月|
|最初爆发地|广东顺德|湖北省武汉市|
|传染性|高|专家目前说是比SARS低|


## todo引用/Reference

- [百度百科](https://baike.baidu.com/item/2019%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92/24267858?fr=aladdin)
- [维基百科](https://zh.wikipedia.org/wiki/2019%E2%80%932020%E5%B9%B4%E6%AD%A6%E6%BC%A2%E8%82%BA%E7%82%8E%E4%BA%8B%E4%BB%B6)
- [钱江晚报](https://baijiahao.baidu.com/s?id=1656226002264134700&wfr=spider&for=pc)
- [央视新闻微博：#新型冠状病毒传染性比SARS弱#](https://weibo.com/2656274875/Iqph9cxWa?ref=home&rid=3_262144_8_4726514314144536405_0_0_0)
- [武汉市卫生健康委员会](http://wjw.wuhan.gov.cn/)
- [珠海确诊3例新型冠状病毒感染的肺炎病例](http://wsjkj.zhuhai.gov.cn/zwgk/tzgg/content/post_2461447.html)

### todo 国内权威机构/Organizitions
|地点/账号|机构名称/专家/渠道|网址/新闻|
|---|---|---|
|健康中国|国家卫生健康委员会官方微博|[微博@健康中国](https://weibo.com/n/%E5%81%A5%E5%BA%B7%E4%B8%AD%E5%9B%BD?from=feed&loc=at)
|世界卫生组织|世界卫生组织官方微博|[微博@世界卫生组织](https://weibo.com/n/%E6%AD%A6%E6%B1%89%E5%8F%91%E5%B8%83?from=feed&loc=at)|
|健康武汉官微|健康武汉官微，是武汉市卫健委对外发布健康科普资讯的平台。|[微博@健康武汉官微](https://weibo.com/n/%E5%81%A5%E5%BA%B7%E6%AD%A6%E6%B1%89%E5%AE%98%E5%BE%AE?from=feed&loc=at)|
|上海发布|上海市政府新闻办公室官方微博|[微博@上海发布](https://weibo.com/n/%E4%B8%8A%E6%B5%B7%E5%8F%91%E5%B8%83?from=feed&loc=at)|
|健康上海12320|上海市卫生健康委员会官方微博|[微博@健康上海12320](https://weibo.com/n/%E5%81%A5%E5%BA%B7%E4%B8%8A%E6%B5%B712320?from=feed&loc=at)|
|广东发布|广东省人民政府新闻办公室官方微博|[微博@广东发布](https://weibo.com/n/%E5%B9%BF%E4%B8%9C%E5%8F%91%E5%B8%83?from=feed&loc=at)|
|深圳卫健委|深圳市卫生健康委员会官方微博|[微博@深圳卫健委](https://weibo.com/szhpfpc?from=feed&loc=at&nick=%E6%B7%B1%E5%9C%B3%E5%8D%AB%E5%81%A5%E5%A7%94&is_hot=1)|
|浙江发布|浙江省人民政府新闻办公室官方微博|[微博@浙江发布](https://weibo.com/n/%E6%B5%99%E6%B1%9F%E5%8F%91%E5%B8%83?from=feed&loc=at)|
|健康浙江|浙江省卫生和计划生育委员会官方微博|[微博@健康浙江]()|
|北京发布|浙江省人民政府新闻办公室官方微博|[微博@北京发布](https://weibo.com/n/%E5%8C%97%E4%BA%AC%E5%8F%91%E5%B8%83?from=feed&loc=at)|
|首都健康|北京市卫生健康委员会官方微博|[微博@首都健康](https://weibo.com/n/%E9%A6%96%E9%83%BD%E5%81%A5%E5%BA%B7?from=feed&loc=at)|
|健康大兴|北京市大兴区卫生健康委员会官方微博|[微博@健康大兴](https://weibo.com/n/%E5%81%A5%E5%BA%B7%E5%A4%A7%E5%85%B4?from=feed&loc=at)|
|疫苗与科学|医疗专家|[微博@疫苗与科学](https://weibo.com/n/%E7%96%AB%E8%8B%97%E4%B8%8E%E7%A7%91%E5%AD%A6?from=feed&loc=at)|
|妇产科的陈大夫|医疗专家|[微博@妇产科的陈大夫](https://weibo.com/n/%E5%A6%87%E4%BA%A7%E7%A7%91%E7%9A%84%E9%99%88%E5%A4%A7%E5%A4%AB?from=feed&loc=at)|
|学妇产科的董小姐|医疗专家|[微博@学妇产科的董小姐](https://weibo.com/n/%E5%AD%A6%E5%A6%87%E4%BA%A7%E7%A7%91%E7%9A%84%E8%91%A3%E5%B0%8F%E5%A7%90?from=feed&loc=at)|
|泌尿外科杨大夫|医疗专家|[微博@泌尿外科杨大夫](https://weibo.com/n/%E6%B3%8C%E5%B0%BF%E5%A4%96%E7%A7%91%E6%9D%A8%E5%A4%A7%E5%A4%AB?from=feed&loc=at)|
|白衣奶爸|医疗专家|[微博@白衣奶爸](https://weibo.com/n/%E7%99%BD%E8%A1%A3%E5%A5%B6%E7%88%B8?from=feed&loc=at)| 
|肝胆外科罗大夫|医疗专家|[微博@肝胆外科罗大夫](https://weibo.com/n/%E8%82%9D%E8%83%86%E5%A4%96%E7%A7%91%E7%BD%97%E5%A4%A7%E5%A4%AB?from=feed&loc=at)| 
|妇科小医生|医疗专家|[微博@妇科小医生](https://weibo.com/n/%E5%A6%87%E7%A7%91%E5%B0%8F%E5%8C%BB%E7%94%9F?from=feed&loc=at)| 
|泌尿外科柒大夫|医疗专家|[微博@泌尿外科柒大夫](https://weibo.com/n/%E6%B3%8C%E5%B0%BF%E5%A4%96%E7%A7%91%E6%9F%92%E5%A4%A7%E5%A4%AB?from=feed&loc=at)|
|央视新闻|中央电视台新闻中心官方微博|[微博@央视新闻](https://weibo.com/n/%E5%A4%AE%E8%A7%86%E6%96%B0%E9%97%BB?from=feed&loc=at)|
|人民日报|《人民日报》法人微博|[微博@人民日报](https://weibo.com/n/%E4%BA%BA%E6%B0%91%E6%97%A5%E6%8A%A5?from=feed&loc=at)|

### todo 新闻/News

- [2020-01-20：微博#4名医护人员感染新型冠状病毒肺炎#](https://weibo.com/2803301701/IqpJvqseJ?ref=home&rid=1_0_8_4726802386191007145_0_1_0)

## todo 贡献/Contribute

这是一个辅助性可视化大屏，需要保证数据可信性，不要乱搞事。

嗯，说给自己听

## 关于

### 为什么会有本站？
- 提供可视化分析，一次个人技术栈练习
- 基于Vue+Mapv 实现，具体见 [开发文档](dev.md)
- 同时本仓库暂不提供API，但可以直接对接socket.io 进行通信，目前并未设置权限

## 更新日志/Update Log
|日期|操作|依据|
|---|----|---|
|2020年1月21日13:50:51|更新武汉数据|[武汉市卫生健康委员会关于新型冠状病毒感染的肺炎情况通报](http://wjw.wuhan.gov.cn/front/web/showDetail/2020012109083)|
|2020年1月21日14:02:51|更新上海数据|[上海新型冠状病毒感染肺炎病例2例 其余4例疑似病例正在排查](http://news.cctv.com/2020/01/21/ARTI2qpAoi0bfpWjzQ1PlYo1200121.shtml?spm=C94212.P4YnMod9m2uD.ENPMkWvfnaiV.216)|
|2020年1月21日14:04:12|更新山东数据|[山东省青岛市发现1例疑似新型冠状病毒感染的肺炎病例](http://news.cctv.com/2020/01/21/ARTImETQUF1CS8PlDqZ39gKm200121.shtml?spm=C94212.P4YnMod9m2uD.ENPMkWvfnaiV.552)|
|2020年1月21日14:06:58|更新珠海20日数据|[珠海确诊3例新型冠状病毒感染的肺炎病例](http://wsjkj.zhuhai.gov.cn/zwgk/tzgg/content/post_2461447.html)|
|2020年1月21日15:52:37|更新大连数据||
|2020年1月21日15:56:11|更新贵阳数据||
|2020年1月22日13:36:35|更新数据，确诊440例|https://news.sina.cn/zt_d/yiqing0121?from=timeline&isappinstalled=0|
|2020年1月22日20:14:52|更新数据，截止19时30分,确诊440例|[@央视新闻 微博](https://weibo.com/2656274875/IqHbC1YnS?ref=home&rid=0_0_8_3069760263467797195_0_0_0)|
|2020年1月23日09:54:33|更新数据，截止1月22日24:00|[@央视新闻 微博](https://weibo.com/2656274875/IqM0vr2gv?ref=home&rid=3_0_8_4726774365866631473_8_1_0)|
|2020年1月23日10:03:44|更新澳门数据|[@央视新闻 微博](https://weibo.com/2656274875/IqMFijroT?ref=home&rid=0_67108864_8_3383001934968834430_0_0_0)|
|2020年1月23日21:29:22|更新数据，截止2020/01/23 18点:00|[来自网易新闻](http://news.163.com/special/epidemic/?_nw_=1&_anw_=1)|
|2020年1月24日09:31:44|更新数据，截止2020/01/24 9点|[来自 新浪新闻](https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao)|
|2020年1月25日18:01:51|更新数据，截止2020/01/25 16点|[来自 腾讯新闻](https://news.qq.com/zt2020/page/feiyan.htm#news)|
|2020年1月26日10:47:55|更新数据，截止2020/01/26 10点|[来自 腾讯新闻](https://news.qq.com/zt2020/page/feiyan.htm#news)|
|2020年1月27日11:44:43|更新数据，截止2020/01/27 11点|[来自 腾讯新闻](https://news.qq.com/zt2020/page/feiyan.htm#news)|
|2020年1月28日11:32:43|更新数据，截止2020/01/28 11点|[来自 腾讯新闻](https://news.qq.com/zt2020/page/feiyan.htm#news)|
|2020年2月3日00:06:34|新版大屏，不再日志|接口对接腾讯新闻|
