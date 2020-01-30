import {_authUser} from "../utils/utils";
import {ReportInterface} from "../interface/interface";
import {isObject, isString} from "../utils/check";
import {getHash} from "../redis/redis";
import {_pushError, _pushSuccess} from "../app";
import {logSocket} from "./socket";
import {getTime} from 'date-fns'
import {insertMany, insertOne, updateOne} from "../mongo/curd";

/**
 * @desc report socket
 * @author veaba
 * @date 2020年1月29日03:12:09
 * @param socket
 * @param sid
 * @param data
 * @param channel
 * @param eventName
 * */
export const report = async (socket: any, sid: string, data: any, channel: string, eventName: string) => {
    // 非登录用户直接打断
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非登录用户
    const reqData: ReportInterface.insert = data;
    let logType = '';
    if (isObject(reqData)) {
        // 先确认必填项,校验时间类型
        if (reqData.country && reqData.province && reqData.reportDate && isString(reqData.reportDate) && reqData.newsUrl && (reqData.count || reqData.cure || reqData.dead || reqData.suspected)) {
            logType = 'success';
            let redisObj: any = await getHash(sid);
            const passObj: any = {};
            redisObj = {};
            if (!redisObj) {
                return
            } else {
                // 补充信息
                reqData.githubName = redisObj.name;

                // 尝试转换时间格式
                if (isString(reqData.reportDate)) {
                    reqData.reportDate = getTime(new Date(reqData.reportDate))
                }

                // 插入audits 数据库
                let auditData: any = await insertOne({
                    ...data,
                    sid,
                    count: reqData.count || 0,
                    cure: reqData.dead || 0,
                    suspected: reqData.cure || 0,
                    dead: reqData.suspected || 0
                }, 'audits');


                // 拆开count、dead、cure 治愈
                await insertForReport(reqData.count, {
                    ...reqData,
                    sid,
                    auditId: auditData._id,
                    isConfirm: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.dead, {
                    ...reqData,
                    sid,
                    auditId: auditData._id,
                    isDead: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.cure, {
                    ...reqData,
                    sid,
                    auditId: auditData._id,
                    isCure: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.suspected, {
                    ...reqData,
                    sid,
                    auditId: auditData._id,
                    isSuspected: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await _pushSuccess('broadcast', 'console', data, '下发审核数据'); // 推送到前端console
                await logSocket(socket, data, channel, eventName, logType);
                return await _pushSuccess(channel, eventName, [], '已收录，谢谢你的贡献，管理员审核通过后将采用', 0,)
            }
        }
        await logSocket(socket, data, channel, eventName, logType);
        return await _pushError(channel, eventName, reqData, '无效数据');
    }
};


/**
 * @desc 循环插入
 * @how 如果重复出现过了呢？？通过驳回按钮删除
 * */
const insertForReport = async (num: number = 0, data: any, sid: string, collection_name: string, username: string) => {
    if (!num) {
        return
    }
    // 将这份报告连同拆开的子ids 存储到另外一份表中，一边捆绑起来推送
    let insertArray = [];
    for (let i = 0; i <= num; i++) {
        insertArray.push({
            ...data,
            sid,
        })
    }
    await insertMany(insertArray, 'reports');

};
