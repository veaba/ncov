/**
 * @desc curd
 * @author veaba
 * @desc 2020年1月25日22:59:08
 * */

import {
    BroadcastSchema, BroadcastTestSchema,
    HelpsSchema,
    HospitalsSchema, LogSchema,
    LovesSchema, ReportSchema,
    NewsSchema, SocketSchema,
    TimelinesSchema,
    UsersSchema, WeibosSchema, AuditSchema
} from "./model";
import {_dbSuccess} from "../utils/exception";

/**
 * @desc 拉取广播数据
 * */
export const taskChannelList = async (collection: string, limit?: number) => {
    const $match: any = {};//匹配的查询字段
    const list = await TheModel(collection).aggregate([
        {$match: $match},
        {$sort: {_id: -1}},
        {$limit: limit || 20},
    ]);
    return list || []
};


/**
 * @desc 更新单个数据
 * @param obj 查找的参数
 * @param newObj 对象，要更新的数据
 * @param collection_name
 */
export const updateOne = async (obj: object, newObj: object, collection_name: string) => {
    return await TheModel(collection_name).updateOne(obj, newObj) || {}
};

/**
 * @desc 插入单个数据
 * @param obj
 * @param collection_name 表名称
 * */
export const insertOne = async (obj: object, collection_name: string) => {
    return await TheSchema(obj, collection_name).save() || {}
};

/**
 * @desc 判断是否是mongoDB的id格式
 * @param _id
 * */
const isIdDB = (_id: string) => {
    return !!(_id && _id.length === 24);
};

/**
 * @desc 通过_id删除数据
 * */
export const deleteOneById = async (_id: string, collection_name: string) => {
    if (isIdDB(_id)) {
        return await TheModel(collection_name).findOneAndRemove({_id})
    }
    throw new Error('非法_id==>:' + _id)
};

/**
 * @desc 创建等model
 * */
export const TheSchema = (obj: object, collection_name: string) => {
    console.info("TheSchema-collection_name", collection_name);
    let models: any = {};
    switch (collection_name) {
        case 'audits':
            models = new AuditSchema(obj);
            break;
        case 'broadcasts':
            models = new BroadcastSchema(obj);
            break;
        case 'helps':
            models = new HelpsSchema(obj);
            break;
        case 'hospitals':
            models = new HospitalsSchema(obj);
            break;
        case 'logs':
            models = new LogSchema(obj);
            break;
        case 'loves':
            models = new LovesSchema(obj);
            break;
        case 'newss':
            models = new NewsSchema(obj);
            break;
        case 'sockets':
            models = new SocketSchema(obj);
            break;
        case 'timelines':
            models = new TimelinesSchema(obj);
            break;
        case 'reports':
            models = new ReportSchema(obj);
            break;
        case 'users':
            models = new UsersSchema(obj);
            break;
        case 'weibos':
            models = new WeibosSchema(obj);
            break;
        default:
            throw new Error('未能识别Schema类型');
    }
    return models
};

/**
 * @desc 查询当前在线用户人数
 * @todo 只需要查询end_Time不存在，或者created==updated即可
 * */


/**
 * @desc model
 * */
export const TheModel = (collection_name: string) => {
    console.info("Model-collection_name", collection_name);
    let models: any = {};
    switch (collection_name) {
        case 'audits':
            models = AuditSchema;
            break;
        case 'broadcasts':
            models = BroadcastSchema;
            break;
        case 'broadcasts_tests':
            models = BroadcastTestSchema; // TODO 移除
            break;
        case 'helps':
            models = HelpsSchema;
            break;
        case 'hospitals':
            models = HospitalsSchema;
            break;
        case 'logs':
            models = LogSchema;
            break;
        case 'loves':
            models = LovesSchema;
            break;
        case 'newss':
            models = NewsSchema;
            break;
        case 'sockets':
            models = SocketSchema;
            break;
        case 'timelines':
            models = TimelinesSchema;
            break;
        case 'reports':
            models = ReportSchema;
            break;
        case 'users':
            models = UsersSchema;
            break;
        case 'weibos':
            models = WeibosSchema;
            break;
        default:
            throw new Error('未能识别Model类型');
    }
    return models
};

/**
 * @desc 查询是不是存在
 * @param obj
 * @param collection_name
 * @return 返回一个boolean，存在返回true，不存在false
 */
export const isHasOne = async (obj: object, collection_name: string) => {
    return !!(await TheModel(collection_name).where(obj).countDocuments())
};

/**
 * @desc 拉取全部
 * */
export const getAllList = async (obj: object, collection_name: string) => {
    return (await TheModel(collection_name).find(obj))
};

/**
 * @desc 根据入参对象，获取多个key值的返回结果，默认keys为空也全部，有keys 一定会有_id
 * @param obj
 * @param keys ['a','b']
 * @param collection_name
 * @return {key,..} => {_id:2333}
 * */
export const getKeysDB = async (obj: object, keys: string[], collection_name: string) => {
    let selectedObj: any = {};
    keys.map(item => selectedObj[item] = 1);
    return JSON.parse(JSON.stringify(await TheModel(collection_name).findOne(obj, selectedObj) || {}))
};
