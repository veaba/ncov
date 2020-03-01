/**
 * @desc App
 * @time 2020年1月25日20:38:36
 * @author veaba
 * */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
// 请求体解析
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
import {tencent} from "./utils/task";
import {connectMongo} from './mongo/mongo'
import {connectSocket, onSocket} from "./sockets/socket";
import {router} from './routers/router'
import {getBarrageList} from "./sockets/talk";
import {delKey} from "./redis/redis";

app.use(router);
app.get('/', (req: any, res: any) => {
    res.send('干嘛？')
});
// 广播
const broadcastChannel: any = io.of('/broadcast')
    .on('connection', async (socket: any) => {
        connectSocket(socket).then();
        // await onSocket(socket, 'report');       // report 检查权限+检查消息+记录日志，成功或者失败
        // await onSocket(socket, 'apply');        // 审核通过 report
        // await onSocket(socket, 'getAudit');     // 审核通过 report
        // await onSocket(socket, 'auditDelete');  // 删除audit+report
        // await onSocket(socket, 'getTimeline');  // 获取时间轴
        onSocket(socket, 'talk').then();         // 弹幕聊天
        onSocket(socket, 'getTotal').then();     // 获取世界地图统计数据
        onSocket(socket, 'getChinaDay').then();  // 获取中国折线图
        onSocket(socket, 'getChinaRank').then(); // 获取中国Rank排行数据
        onSocket(socket, 'getWorldRank').then(); // 获取世界Rank排行数据
        onSocket(socket, 'getWorldMap').then();  // 获取世界地图数据
        // 给指定人发送消息
        getBarrageList(io, socket, 'getTalk').then();

    });


// 推送感染数据
setInterval(async () => {
    await tencent()
}, 60 * 1000);

/**
 * @desc 向订阅的频道推送消息，成功的提示
 * */
const _pushSuccess = async (channel: string, eventName: string, data: any, msg?: string | number, code?: number,) => {
    if (!channel.includes('/')) {
        channel = '/' + channel
    }
    return await io.of(channel).emit(eventName, {code: code, data, msg: msg || 'success'})
};
/**
 * @desc 向订阅的频道报告错误的消息
 * */
const _pushError = async (channel: string, eventName: string, data: any, msg?: string | number, code?: number) => {
    //todo记录错误日志
    return io.of(channel).emit(eventName, {code: 1, data, msg: msg || 'error'})
};

/**
 * @desc 发送给私人
 * */
const _pushPrivate = async (channel: string, eventName: string, id: any, data: any, msg?: any, code?: number,) => {
    if (!channel.includes('/')) {
        channel = '/' + channel
    }
    return await io.of(channel).to(id).emit(eventName, {data, msg: msg || "success", code: code})
};
http.listen(9999, async () => {
    await connectMongo();
    await delKey("onlineSocket");
    console.info(' >     Biubiu 走您~ 9999 √');
});

export {
    broadcastChannel,
    _pushError,
    _pushSuccess,
    _pushPrivate
}
