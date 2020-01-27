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
    UsersSchema, WeibosSchema
} from "./model";
import {_dbSuccess} from "../utils/exception";

/**
 * @desc 拉取广播数据
 * */
const getBroadcastChannelList = async () => {
    const $match: any = {};//匹配的查询字段
    const list = await TheModel('broadcasts').aggregate([
        {$match: $match},
        {$sort: {_id: -1}},
        {$limit: 20},
    ]);
    return list || []
};


/**
 * @desc 单个更新数据
 * @param obj 查找的参数
 * @param newObj 对象，要更新的数据
 * @param collection_name
 */
const updateOne = async (obj: object, newObj: object, collection_name: string) => {
    return await TheModel(collection_name).updateOne(obj, newObj) || {}
};

/**
 * @desc 插入单挑数据
 * @param obj
 * @param collection_name 表名称
 * */
const insertOne = async (obj: object, collection_name: string) => {
    return await TheSchema(obj, collection_name).save() || {}
};

/**
 * @desc 创建等model
 * */
const TheSchema = (obj: object, collection_name: string) => {
    console.info(collection_name);
    let models: any = {};
    switch (collection_name) {
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
const TheModel = (collection_name: string) => {
    console.info(collection_name);
    let models: any = {};
    switch (collection_name) {
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
const isHasOne = async (obj: object, collection_name: string) => {
    return !!(await TheModel(collection_name).where(obj).countDocuments())
};

/**
 * @desc 根据入参对象，获取多个key值的返回结果
 * @param obj
 * @param keys
 * @param collection_name
 * @return {key,..} => {_id:2333}
 * */
const getKeysDB = async (obj: object, keys: string[], collection_name: string) => {
    return JSON.parse(JSON.stringify(await TheModel(collection_name).findOne(obj, [...keys]) || {}))
};
export {
    TheSchema,
    getBroadcastChannelList,
    updateOne,
    insertOne,
    isHasOne,
    getKeysDB
}
