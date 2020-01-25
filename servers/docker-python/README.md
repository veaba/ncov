# todo 后端Python,python的socket有点难搞！

没处理好整个流程，现在仅spider_app可以正常走

## todo 后续准备迁移到go land上面去

- 不太了解python 的协程

## 服务

- websocket
- 爬虫

## 错误
docker-compose 暂无法运行python


## 公布下最近的功能迭代
todo 
- 使用爬虫爬取微博的数据
- 爬取权威官网的数据

- 产生的数据，交叉对比数据库，输出到News
- 在控制台中，手动应用到数据库，这一部需要做权限控制（先上Github，有条件再上微博登录）

- 实时推送消息到前端展示

- 增加多种类型的分析表格

以上，在做中，手病犯了，歇一会。

## kafka

docs ：https://kafka-python.readthedocs.io/en/master/apidoc/KafkaAdminClient.html 


## Mongodb

规划数据库结构表

### 字段约定
const 确诊的数目
### 表
- users,授权会员列表
- helps ，能够帮助的表
- hospitals 救助机构，定点医院
```json
{ 
  "title": "医院名称",
  "country":"中国",
  "province":"湖北", 
  "city":"武汉",     
  "area":"汉口区",    
  "address":""
}
```
- news 所有新闻写入，去重，title+desc前几个字
- weobos todo 权威微博发布的消息
- broadcasts 广播，滚动播报，去重
- cases 病例数据，经过研判进来的数据，后期
- patient 患者数据，经过研判进来的数据，后期
```js
const obj={
  type: 1,             // 1输入类型（武汉过来）、2(被武汉过来感染的)、3(被2感染的)、-1(未知),
  name: "xx",          // 姓名
  country:"中国",       // 汉字中文
  province:"湖北",      // 州市省级市
  city:"武汉",          // 城市
  area:"汉口区",        // 区
  age:12,              // 年龄
  desc:"描述语",        // 描述语
  news_url:"新闻来源",   // 新闻来源，必填项,url地址
  isConfirm:true,      //是否确诊
  isDead:true,         //死亡
  isSuspected:true     // 疑似
}
```
- dead 


## API

### 集团式生成多条病例数据
根据,dead(死亡),count(确诊),suspected(疑似)生成多条数据插入到库里面
```json
{
  "type": 1,
  "count": 33,
  "dead":2,
  "channel": "消息来源",
  "news_url": "新闻地址",
  "isConfirm":true,     
  "isDead":true,        
  "isSuspected":true 
}
```
