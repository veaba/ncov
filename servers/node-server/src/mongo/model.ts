/**
 * @desc Model
 * @time 2020年1月25日20:38:36
 * @author veaba
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
    creator: String,             // 创建者的id
    createTime: Number,         // 创建时间
    updateTime: Number,         // 更新时间
    isAdmin: Boolean,           // 是否admin
    workCount: Number,          // 新增档案的次数
    loginCount: Number           // 登录的次数
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

/**
 * @desc broadcasts 广播表
 * */
const broadcastSchema = new Schema({
    channel: String,
    create_time: String,
    desc: String,
    news_url: String,
    title: String,
    is_new: Boolean,
    img: String
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

/**
 * @desc broadcasts 广播表
 * */
const broadcastTestSchema = new Schema({
    channel: String,
    create_time: String,
    desc: String,
    news_url: String,
    title: String,
    is_new: Boolean,
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
 * @desc ncovs 感染的案例数据，患者为单位
 * */
const ncovsSchema = new Schema({});
/**
 * @desc timelines 时间轴
 * */
const timelinesSchema = new Schema({});

/**
 * @desc 统计socket连接的用户数据，主要为了统计同时在线用户的时间
 * */
const socketSchema = new Schema({
    sid: String,         // socket id
    begin_time: Number,  // 进入的时间
    end_time: Number,    // 断开的时间
    channel: String,      // 频道名称
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
const BroadcastSchema = mongoose.model('broadcasts', broadcastSchema);
const BroadcastTestSchema = mongoose.model('broadcasts_tests', broadcastSchema);
const HelpsSchema = mongoose.model('helps', helpsSchema);
const HospitalsSchema = mongoose.model('hospitals', hospitalsSchema);
const LovesSchema = mongoose.model('loves', lovesSchema);
const NcovsSchema = mongoose.model('ncovs', ncovsSchema);
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
    LovesSchema,
    NewsSchema,
    SocketSchema,
    TimelinesSchema,
    NcovsSchema,
    UsersSchema,
    WeibosSchema
}
