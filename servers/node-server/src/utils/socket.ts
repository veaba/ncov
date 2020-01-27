/**
 * @desc Socker
 * @time 2020年1月26日01:47:41
 * @author veaba
 * */

import {getKeysDB, insertOne, isHasOne, updateOne} from "../mongo/curd";
import {_authUser, _sid_obj} from "./utils";
import {getTime} from 'date-fns'
import {ReportInterface} from "../interface/interface";
import {isNumber, isObject} from "./check";
import {_pushSuccess, _pushError} from "../app";
import {delKey, getHash} from "../redis/redis";

/**
 * @desc 记录socket连接数，新连接插入，断开更新
 * @param socket {Object}
 * */
export const connectSocket = async (socket: any) => {
    const {id, handshake} = socket;
    const {issued} = handshake;
    await insertOne({..._sid_obj(id), noAuthCount: 1, beginTime: issued}, 'sockets');
    socket.on('disconnect', async () => {
        const {id} = socket;
        const {sid} = _sid_obj(id);
        await updateOne({sid}, {..._sid_obj(id), endTime: getTime(new Date())}, 'sockets');
        await delKey(sid)
    })
};

/**
 * @desc 收到消息,
 * @report 需要检查权限
 * @feat 非授权访问下，有计数超过3次的socket，将主动断开链接
 * @check  检查权限，redis 不存在sid、admin
 * */
export const onSocket = async (socket: any, eventName: string) => {
    const {id, nsp} = socket;
    const {name} = nsp || {};   // 频道
    const {sid} = _sid_obj(id);
    const channel = (name || '').replace('/', '', '');
    let logType = '';
    socket.on(eventName, async (data: any) => {
        switch (eventName) {
            // channel->report，发起报告审核,管理直接通过
            case 'report':
                // 非登录用户直接打断
                await _authUser(socket, sid, data, name, eventName, 'noAuth'); // 非登录用户
                const reqData: ReportInterface.insert = data;

                if (!isObject(reqData)) {
                    logType = 'paramsError';
                } else {
                    // 先确认必填项,校验时间类型
                    if (reqData.country && reqData.province && reqData.reportDate && isNumber(reqData.reportDate) && reqData.newsUrl && (reqData.count || reqData.cure || reqData.dead || reqData.suspected)) {
                        logType = 'success';
                        const redisObj: any = await getHash(sid);
                        const passObj: any = {};

                        // 补充信息
                        reqData.githubName = redisObj.name;

                        // 普通用户
                        if (!redisObj.isAdmin) {
                            console.info('普通用户');
                            passObj.pass = false;
                        } else {
                            //管理员，默认是通过审核的
                            passObj.pass = true;
                            console.info('管理员');
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
                        await _pushSuccess(channel, eventName, [], '已收录，谢谢你的贡献，管理员审核通过后将采用', 0,)
                    }
                    return await _pushError(channel, eventName, reqData, '无效数据');
                }
                await logSocket(socket, data, name, eventName, logType);
                break;
            // client apply，在前端控制台里面应用/审核通过生效的正式案例
            case 'apply':
                await _authUser(socket, sid, data, name, eventName, 'noAuth'); // 非登录用户
                const applyReq: ReportInterface.apply = data;
                if (!isObject(applyReq)) {
                    const hasReport = await isHasOne({_id: applyReq._id}, 'reports');
                    const redisObj: any = await getHash(sid);
                    if (redisObj.isAdmin) {
                        if (hasReport) {
                            await updateOne({_id: applyReq._id}, {pass: true}, 'users');
                            await updateOne({_id: redisObj._id}, {$inc: {auditCount: 1}}, 'users');
                            const {githubName} = await getKeysDB({id: applyReq._id}, ['githubName'], 'reports');
                            await updateOne({name: githubName}, {$inc: {passCount: 1}}, 'users')
                            // todo 地图获取相应的模块更新数据
                        }
                    } else await _pushError(channel, eventName, applyReq, '权限不够');
                }
                await logSocket(socket, data, name, eventName, logType);
                break;
            default:
                throw new Error('未能识别Channel类型');
        }
    })
};


/**
 * @desc ageChart,疫情感染年龄分布 饼图 {}，各阶段的年龄
 * */
const ageChart = async () => {

};


/**
 * @desc sexChart,疫情感染性别分布，饼图
 * */
const sexChart = async () => {

};


/**
 * @desc statisticsChart,疫情生命特征统计分布 柱状图 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪}
 * */
const statisticsChart = async () => {

};


/**
 * @desc worldMap, 中间那个大地图所需的数据
 * */
const worldMap = async () => {

};


/**
 * @desc chinaTotalChart,中国境内统计的横向 柱状带小柱图，有新数据会动，会排序 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪,province}省份
 * */
const chinaTotalChart = async () => {

};


/**
 * @desc loveChart,爱心地图，迁徙线，红点小红心，表示从x国，x地到中国境内的资助，在大地图上展示
 * */
const loveChart = async () => {

};


/**
 * @desc chartPieChart,省份占比
 * */
const chartPieChart = async () => {

};


/**
 * @desc 循环插入
 * */
const insertForReport = async (num: number = 0, data: any, sid: string, collection_name: string, username: string) => {
    if (!num) {
        return
    }
    for (let i = 0; i <= num; i++) {
        await insertOne({...data, sid}, collection_name);
        await updateOne({name: username}, {$inc: {reportTimes: 1}}, 'users');//贡献值+1
        await _pushSuccess('broadcast', 'console', data, '推送审核') // 推送到前端console
    }
};
/**
 * @desc 记录logs，error Log、success Log
 * @param socket
 * @param body
 * @param channel
 * @param eventName
 * @param logType
 * */
export const logSocket = async (socket: any, body: any, channel: string, eventName: string, logType: string) => {
    let insertBody = {};
    if (Array.isArray(body) || isObject(body)) {
        insertBody = body
    } else {
        insertBody = {data: body}
    }
    const {id, handshake} = socket;
    const {sid} = _sid_obj(id);
    const {headers, issued} = handshake; // 请求头
    await insertOne({
        sid,
        channel,
        body: {...insertBody},
        headers,
        eventName,
        reportTime: issued,
        logType
    }, 'logs');
};


/**
 * @desc 主动断开前端的连接，当发生恶意emit 的时候，主动断开前端的请求
 * @todo
 * */
export const disconnectSocket = async (socket: any) => {

};


/**
 * @desc 感觉type来传递成功或者失败
 * @todo
 * */
export const dealSocket = async (socket: any) => {


};

/**
 * @desc 收到消息并成功处理后，返回给前端的socket
 * @todo
 * */
export const successSocket = async (socket: any) => {

};


/**
 * @desc 收到消息并错误处理后，返回给前端的socket
 * @todo
 * */
export const errorSocket = async (socket: any) => {

};


/**
 * @desc socket auth
 * @todo
 * @return {boolean}
 * */

export const authSocket = async (socket: any) => {

};
