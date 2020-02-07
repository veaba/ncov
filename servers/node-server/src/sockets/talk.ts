/**
 * @desc 弹幕聊天
 * @logic 逻辑设计
 * 登录授权用户->发起emit到socket->写入kafka->读出kafka->emit推送到客户端
 * 存入kafka，然后弹幕的时候从时间点取出来
 *
 * */
import {proKafka} from "../kafka/kafka";
import {getTime} from 'date-fns'
import {_authUser} from "../utils/utils";
import {ReportInterface} from "../interface/interface";
import {getHash} from "../redis/redis";
import {flipPage, getCount, insertOne} from "../mongo/curd";

/**
 * @desc 写入同时存储到数据库
 * */
export const talkIn = async (socket: any, sid: string, data: string, channel: string, eventName: string) => {
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非登录用户
    const redisObj: any = await getHash(sid) || {};
    const talkInObj = {
        sid,
        name: redisObj ? redisObj.name : "",
        avatarUrl: redisObj ? redisObj.avatar_url : "",
        isAdmin: redisObj ? redisObj.isAdmin : false,
        message: data,
        channel: channel,
        eventName,
        createTimestamp: getTime(new Date())
    };
    await insertOne(talkInObj, 'barrages');
    await proKafka('talk', JSON.stringify(talkInObj));
};


/**
 * @desc 定向推送，用户首次登录，拉取弹幕信息，每1s/条
 * @sid 指定用户推送
 * */

export const getBarrageList = async (io: any, sid: string, socket: any) => {
    const theCount: number = await getCount({}, 'barrages');
    const countDivideTen = Math.ceil(theCount / 10) || 1;
    let timer: any = 0;
    for (let i = 1; i <= countDivideTen; i++) {
        timer = setTimeout(async () => {
            console.info('我在执行首次推送任务==>', sid,);
            const pushData = await flipPage('barrages', i * 10 - 10, 10);
            await socket.to(sid).emit('talk', pushData);
        }, i * 2000);
        // 如果发现socket 断开。则break
        if (JSON.stringify(socket.rooms) === '{}') {
            clearTimeout(timer);
            break
        }
    }
    clearTimeout(timer)
};
