/**
 * @desc Socker
 * @time 2020年1月26日01:47:41
 * @author veaba
 * */

import {insertOne, updateOne} from "../mongo/curd";
import {_sid_obj} from "../utils/utils";
import {getTime} from 'date-fns'
import {isObject} from "../utils/check";
import {delKey} from "../redis/redis";
import {getTotal, getWorldMap} from "./worldMap";
import {getChinaRank, getChinaDay, getWorldRank} from "./rank";
import {talkIn} from "./talk";

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
    const {nsp, id} = socket;
    const {name} = nsp || {};   // 频道
    const {sid} = _sid_obj(id);
    const channel = (name || '').replace('/', '', '');
    socket.on(eventName, async (data: any) => {
        switch (eventName) {
            // channel->report，发起报告审核,管理直接通过
            // case 'report':
            //     await report(socket, sid, data, channel, eventName);
            //     break;
            // // client apply，在前端控制台里面应用/审核通过生效的正式案例
            // case 'apply':
            //     await applyAudit(socket, sid, data, channel, eventName);
            //     break;
            // case 'auditDelete':
            //     await deleteAudit(socket, sid, data, channel, eventName);
            //     break;
            // case 'getAudit':
            //     await getAudit(socket, sid, data, channel, eventName);
            //     break;
            // case 'getTimeline':
            //     await getTimeline(socket, sid, data, channel, eventName);
            //     break;
            // case 'getNews':
            //     await getNews(socket, sid, data, channel, eventName);
            //     break;
            case 'talk':
                await talkIn(socket, sid, data, channel, eventName);
                break;
            case 'getTotal':
                await getTotal(socket, data, channel, eventName);
                break;
            case 'getChinaDay':
                await getChinaDay(socket, data, channel, eventName);
                break;
            case 'getChinaRank':
                await getChinaRank(socket, data, channel, eventName);
                break;
            case 'getWorldRank':
                await getWorldRank(socket, data, channel, eventName);
                break;
            case 'getWorldMap':
                console.info('接受到getWorldMap消息', new Date().getTime());
                return await getWorldMap(socket, data, channel, eventName);
            default:
                throw new Error('未能识别Channel类型');
        }
    })
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
