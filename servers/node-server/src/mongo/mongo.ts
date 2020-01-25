/**
 * @desc Mongo
 * @time 2020年1月25日20:38:36
 * @author veaba
 * */
import mongoose from 'mongoose'
import {config, adminData, configOption} from "../config";
import {UsersSchema} from "./model"
import {_encryptedPWD, _md5} from "../utils/utils"
import {isEmptyArray} from '../utils/check'
import {TheSchema} from './curd'

const logger = require('tracer').console(); // console追踪库

/**
 * @desc 向外暴露的MongoDB 数据库链接函数
 */
const connectMongo = async () => {
    console.log('\x1B[32m%s\x1B[49m', ' >     Mongodb服务已启动 √     ');
    mongoose.connect(config.base + ':' + config.port + '/' + config.database, configOption, (err: any) => {
        if (err) {
            logger.warn('mongodb 数据库链接失败，请检查');
            logger.warn(err.message)
        } else console.log('\x1B[32m%s\x1B[49m', ' >     Mongodb连接成功~~ √     ')
    });
    await mongoose.connection;
    await checkInit()
};


/**
 * @desc 创建数据
 * @param obj {object} 入参的原始参数数据
 * @param type {string} type，判断是哪个type 的model
 */
const createDB = async (obj: object, type: string) => {
    let model: any = TheSchema(obj, type);
    return new Promise((resolve, reject) => {
        model.save()
            .then((res: any) => {
                return resolve(res)
            })
            .catch((err: any) => {
                return reject(err)
            })
    })
};


/**
 * @desc 检查并初始化原始账号密码
 */
const checkInit = async () => {
    UsersSchema.find({phone: adminData.phone})
        .then(async (res: any) => {
            if (isEmptyArray(res)) return await createDB({
                ...adminData,
                password: _encryptedPWD(_md5(adminData.password))
            }, 'user')
        })
        .catch((err: any) => {
            console.log(err)
        })
};

export {connectMongo}
