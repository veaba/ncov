import {_authUser} from "../utils/utils";
import {ReportInterface} from "../interface/interface";
import {isObject, isString} from "../utils/check";
import {getHash} from "../redis/redis";
import {_pushError, _pushSuccess} from "../app";
import {logSocket} from "./socket";
import {getTime} from 'date-fns'
import {insertOne, updateOne} from "../mongo/curd";

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
    if (!isObject(reqData)) {
        logType = 'paramsError';
    } else {
        // 先确认必填项,校验时间类型
        if (reqData.country && reqData.province && reqData.reportDate && isString(reqData.reportDate) && reqData.newsUrl && (reqData.count || reqData.cure || reqData.dead || reqData.suspected)) {
            logType = 'success';
            let redisObj: any = await getHash(sid);
            const passObj: any = {};
            if (!redisObj) {
                return
            } else {
                // 补充信息
                reqData.githubName = redisObj.name;
                // 普通用户
                if (redisObj.isAdmin === false) {
                    console.info('==>普通用户');
                    passObj.pass = false;
                }
                if (redisObj.isAdmin === true) {
                    //管理员，默认是通过审核的
                    passObj.pass = true;
                    console.info('===>管理员');
                }

                // 尝试转换时间格式
                if (isString(reqData.reportDate)) {
                    reqData.reportDate = getTime(new Date(reqData.reportDate))
                }
                // 拆开count、dead、cure 治愈，循环插入，并未用户增加贡献值
                await insertForReport(reqData.count, {
                    ...reqData,
                    sid,
                    isConfirm: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.dead, {
                    ...reqData,
                    sid,
                    isDead: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.cure, {
                    ...reqData,
                    sid,
                    isCure: true, ...passObj
                }, sid, 'reports', redisObj.name);
                await insertForReport(reqData.suspected, {
                    ...reqData,
                    sid,
                    isSuspected: true, ...passObj
                }, sid, 'reports', redisObj.name);
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

    const ids: any[] = [];
    for (let i = 0; i <= num; i++) {
        await updateOne({name: username}, {$inc: {reportTimes: 1}}, 'users');//贡献值+1
        const {_id} = await insertOne({...data, sid}, collection_name);
        ids.push(_id)
    }
    // 将这份报告连同拆开的子ids 存储到另外一份表中，一边捆绑起来推送
    let auditData = [];
    if (data.isConfirm) {
        auditData = await insertOne({...data, sid, ids, count: num}, 'audits');
    }
    if (data.isCure) {
        auditData = await insertOne({...data, sid, ids, cure: num}, 'audits');
    }
    if (data.isDead) {
        auditData = await insertOne({...data, sid, ids, dead: num}, 'audits');
    }
    if (data.isSuspected) {
        auditData = await insertOne({...data, sid, ids, suspected: num}, 'audits');
    }
    // 这里的问题是潜在的问题，多管理员的时候会同时推送过去，手慢无
    await _pushSuccess('broadcast', 'console', auditData, '推送审核'); // 推送到前端console
};
