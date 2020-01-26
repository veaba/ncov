/**
 * @desc Socker
 * @time 2020年1月26日01:47:41
 * @author veaba
 * */

import {insertOne, updateOne} from "../mongo/curd";
import {_sid_obj} from "./utils";
import {getTime} from 'date-fns'
import {ReportInterface} from "../interface/interface";
import {isNumber, isObject} from "./check";
import {_error} from "../app";

/**
 * @desc 记录socket连接数
 * @param socket {Object}
 * */
export const connectSocket = async (socket: any) => {
    const {id, handshake} = socket;
    const {issued} = handshake;
    await insertOne({..._sid_obj(id), beginTime: issued}, 'sockets');
    socket.on('disconnect', async () => {
        const {id} = socket;
        const {sid} = _sid_obj(id);
        await updateOne({sid}, {..._sid_obj(id), endTime: getTime(new Date())}, 'sockets');
    })
};

/**
 * @desc 收到消息
 *
 * @todo
 * */
export const onSocket = async (socket: any, eventName: string, isCheck?: Boolean) => {
    const {id, nsp} = socket;
    const {name} = nsp || {};   // 频道
    const {sid} = _sid_obj(id);
    socket.on(eventName, async (data: any) => {
        switch (eventName) {
            // channel->report
            case 'report':
                const reqData: ReportInterface.insert = data;
                let logType = '';
                if (!isObject(reqData)) {
                    logType = 'paramsError';
                } else {
                    // 先确认必填项,校验时间类型
                    if (reqData.country && reqData.province && reqData.reportDate && isNumber(reqData.reportDate) && reqData.newsUrl && (reqData.count || reqData.cure || reqData.dead || reqData.suspected)) {
                        logType = 'success';
                        // 拆开count、dead、cure 治愈，循环插入
                        console.info('成功==========');
                        await insertForReport(reqData.count, {...reqData, isConfirm: true}, sid, 'reports');
                        await insertForReport(reqData.dead, {...reqData, isDead: true}, sid, 'reports');
                        await insertForReport(reqData.cure, {...reqData, isCure: true}, sid, 'reports');
                        await insertForReport(reqData.suspected, {...reqData, isSuspected: true}, sid, 'reports')
                    } else {
                        console.info('失败=========');
                        console.info('==x=> ', reqData.country && reqData.province && reqData.reportDate && isNumber(reqData.reportDate));
                        console.info('==o=> ', reqData.newsUrl && (reqData.count || reqData.cure || reqData.dead || reqData.suspected));
                        // 告诉前端，这里不错其他细分错误了
                        const channel = (name || '').replace('/', '', '');
                        await _error(channel, eventName, reqData, 'paramsError')
                    }
                }
                await logSocket(socket, data, name, eventName, logType);
                break;
            case 'xx'://todo
                break;
            default:
                throw new Error('未能识别Channel类型');
        }
    })
};

/**
 * @desc 循环插入
 * */
const insertForReport = async (num: number = 0, data: any, sid: string, collection_name: string) => {
    console.info('循环插入', num);
    if (!num) {
        return
    }
    for (let i = 0; i <= num; i++) {
        await insertOne({...data, sid}, collection_name)
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
