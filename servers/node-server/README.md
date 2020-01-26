## todo 

### todo python 那个kafka 写到数据库，应该按照次序来

## 权限检查

## 性能/todo 
- 限制频率太高

## api

###  感染数据ncov

```js
const ReportSchema ={
    name: String,             // 名字，可能为空
    sex:Number,               // 性别,1男 -1女
    age:Number,               // 年龄
    country: String,          // 国家
    province: String,         // 省级市
    city: String,             // 城市
    
    // 信息来源
    news_url:String,          // 新闻地址
    report:String,            // 报告机构
    desc:String,              // 描述

    // 用于迁徙分析
    from:String,              // 从哪来
    to:String,                // 到哪去

    // 感染特性
    type:{
        type:String,
        match:/^(input|be_input|other)/   // input 输入类型，一般分析为从疫区来，即来自武汉，be_input=>被输入，other其他
    },
    hospital:String,          // 就诊医院
    org:String,               // 报告的卫生机构
    hide_data:Number,         // 潜伏期，单位：小时

    // 症状
    is_confirm: String,       // 是否确认
    is_dead: Boolean,         // 是否陨落
    is_cure: Boolean,         // 是否治愈

    is_suspected: Boolean,    // 是否是疑似
    status:{                  // 表示危急
        type:String,
        match: /^(mid|high)/  // mid=>中危/重，high=>危重
    },
    confirm_date: Number      // 确认日期，年月日，时分秒自动补0
}
```

## todo 后台机制
