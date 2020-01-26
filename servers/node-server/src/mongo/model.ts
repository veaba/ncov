/**
 * @desc Model
 * @time 2020年1月25日20:38:36
 * @author veaba
 * @todo 默认值
 * */
import mongoose from "mongoose"

const Schema = mongoose.Schema;

/**
 * @desc users 授权会员表
 * */
const usersSchema = new Schema({
    name: String,               // 用户姓名
    phone: String,              // 手机11位
    password: String,           // 密码
    creator: String,            // 创建者的id
    createTime: Number,         // 创建时间
    updateTime: Number,         // 更新时间
    isAdmin: Boolean,           // 是否admin
    loginCount: Number          // 登录的次数
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

/**
 * @desc broadcasts 广播表
 * */
const broadcastSchema = new Schema({
    channel: String,
    createTime: String,
    desc: String,
    newsUrl: String,
    title: String,
    new: Boolean,
    img: String
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

/**
 * @desc broadcasts 广播表
 * */
const broadcastTestSchema = new Schema({
    channel: String,
    createTime: String,
    desc: String,
    newsUrl: String,
    title: String,
    new: Boolean,
    img: String
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


/**
 * @desc helps 帮助表
 * */
const helpsSchema = new Schema({});

/**
 * @desc loves 爱心表
 * */

const lovesSchema = new Schema({});


/**
 * @desc 统计推送错误的日志记录
 * */
const logSchema = new Schema({
    sid: String,                   // socket id
    body: Object || String,        // 请求体的参数内容
    headers: Object,               // 请求头
    reportTime: Number,            // 发出报告的时间
    endTime: Number,               // 断开的时间
    channel: String,               // 频道名称
    eventName: String,             // 事件名称
    logType: {
        type: String,
        match: /^(error|success|paramsError|unbelievable|noReportTime)/, // 错误、成功、参数错误、不可信
        default() {
            return 'error'
        }
    }                   // 异常时什么类型
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


/**
 * @desc hospitals 就诊、医疗机构表
 * */
const hospitalsSchema = new Schema({});

/**
 * @desc news 新闻表
 * */
const newsSchema = new Schema({});
/**
 * @desc weibos 微博数据
 * */
const weibosSchema = new Schema({});
/**
 * @desc report 感染的案例数据，患者为单位
 * */
const reportSchema = new Schema({
    sid: String,                // socket sid，与插入库的单位形成闭环，实现数据溯源
    pass: Boolean,              // todo 专业人员，管理管理员手动审核通过才算完成
    reporter: String,           // 发起报告的人
    reporterEmail: String,      // 发起报告的人的游戏
    weiboName: String,          // 如果开发给微博用户，则需要这一项
    githubName: String,         // Github 用户ID
    name: String,               // 患者名字，可能为空
    sex: Number,                // 性别,1男 -1女 0 未知
    profession: Number,         // 职业 1：一般人、2：医生
    age: Number,                // 年龄
    country: String,            // 国家
    province: String,           // 省级市
    city: String,               // 城市
    area: String,               // 区/县等第三级单位
    // 信息来源
    newsUrl: String,            // 新闻地址
    report: String,             // 报告机构
    desc: String,               // 描述
    // 用于迁徙分析
    from: String,               // 从哪来
    to: String,                 // 到哪去

    // 感染特性
    type: {
        type: String,
        match: /^(input|be_input|other)/   // input 输入类型，一般分析为从疫区来，即来自武汉，be_input=>被输入，other其他
    },
    hospital: String,           // 就诊医院
    org: String,                // 报告的卫生机构
    hideHour: Number,           // 潜伏期，单位：小时

    // 症状
    isConfirm: String,          // 是否确认
    isDead: Boolean,            // 是否陨落
    isCure: Boolean,            // 是否治愈

    isSuspected: Boolean,       // 是否是疑似
    status: {                   // 表示危急
        type: String,
        match: /^(mid|high)/    // mid=>中危/重，high=>危重
    },
    reportDate: Number          // 报告日期，年月日，时分秒自动补0
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
/**
 * @desc timelines 时间轴
 * */
const timelinesSchema = new Schema({});

/**
 * @desc 统计socket连接的用户数据，主要为了统计同时在线用户的时间
 * */
const socketSchema = new Schema({
    sid: String,          // socket id
    beginTime: Number,   // 进入的时间
    endTime: Number,     // 断开的时间
    channel: String,      // 频道名称
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


const BroadcastSchema = mongoose.model('broadcasts', broadcastSchema);
const BroadcastTestSchema = mongoose.model('broadcasts_tests', broadcastSchema);
const HelpsSchema = mongoose.model('helps', helpsSchema);
const HospitalsSchema = mongoose.model('hospitals', hospitalsSchema);
const LogSchema = mongoose.model('logs', logSchema);
const LovesSchema = mongoose.model('loves', lovesSchema);
const ReportSchema = mongoose.model('reports', reportSchema);
const NewsSchema = mongoose.model('news', newsSchema);
const SocketSchema = mongoose.model('sockets', socketSchema);
const TimelinesSchema = mongoose.model('timelines', timelinesSchema);
const UsersSchema = mongoose.model('users', usersSchema);
const WeibosSchema = mongoose.model('weibos', weibosSchema);


export {
    BroadcastSchema,
    BroadcastTestSchema,
    HelpsSchema,
    HospitalsSchema,
    LogSchema,
    LovesSchema,
    NewsSchema,
    SocketSchema,
    TimelinesSchema,
    ReportSchema,
    UsersSchema,
    WeibosSchema
}
