/**
 * @desc curd
 * @author veaba
 * @desc 2020年1月25日22:59:08
 * */

import {
    BroadcastSchema, BroadcastTestSchema,
    HelpsSchema,
    HospitalsSchema,
    LovesSchema, NcovsSchema,
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
    // todo
    const list = await TheModel('broadcasts_tests').aggregate([
        {$match: $match},
        {$sort: {_id: -1}},
        // {$limit: 20},
    ]);
    return list || []
};


/**
 * @desc 单个更新数据
 * @param obj 查找的参数
 * @param newObj 对象，要更新的数据
 * @param type 必填
 */
const updateOne = async (obj: object, newObj: object, type: string) => {
    return await TheModel(type).updateOne(obj, newObj) || {}
};

const insertOne = async (obj: object, type: string) => {
    console.info(111111, obj);
    return await TheSchema(obj, type).save() || {}
};

/**
 * @desc 创建等model
 * */
const TheSchema = (obj: object, type: string) => {
    let models: any = {};
    switch (type) {
        case 'broadcast':
            models = new BroadcastSchema(obj);
            break;
        case 'help':
            models = new HelpsSchema(obj);
            break;
        case 'hospital':
            models = new HospitalsSchema(obj);
            break;
        case 'love':
            models = new LovesSchema(obj);
            break;
        case 'news':
            models = new NewsSchema(obj);
            break;
        case 'socket':
            models = new SocketSchema(obj);
            break;
        case 'timeline':
            models = new TimelinesSchema(obj);
            break;
        case 'ncov':
            models = new NcovsSchema(obj);
            break;
        case 'user':
            models = new UsersSchema(obj);
            break;
        case 'weibo':
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
const TheModel = (type: string) => {
    let models: any = {};
    switch (type) {
        case 'broadcast':
            models = BroadcastSchema;
            break;
        case 'broadcasts_tests':
            models = BroadcastTestSchema; // TODO 移除
            break;
        case 'help':
            models = HelpsSchema;
            break;
        case 'hospital':
            models = HospitalsSchema;
            break;
        case 'love':
            models = LovesSchema;
            break;
        case 'news':
            models = NewsSchema;
            break;
        case 'socket':
            models = SocketSchema;
            break;
        case 'timeline':
            models = TimelinesSchema;
            break;
        case 'ncov':
            models = NcovsSchema;
            break;
        case 'user':
            models = UsersSchema;
            break;
        case 'weibo':
            models = WeibosSchema;
            break;
        default:
            throw new Error('未能识别Model类型');
    }
    return models
};
export {
    TheSchema,
    getBroadcastChannelList,
    updateOne,
    insertOne
}
