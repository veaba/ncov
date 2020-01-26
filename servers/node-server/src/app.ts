/**
 * @desc App
 * @time 2020年1月25日20:38:36
 * @author veaba
 * */
import {broadcastTask} from "./utils/task";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import {connectMongo} from './mongo/mongo'
import {connectSocket, logSocket, onSocket, successSocket} from "./utils/socket";

app.get('/', (req: any, res: any) => {
    res.send('干嘛？')
});


io.on('connection', (socket: any) => {
    console.info('is Connected');
});

// 广播
const broadcastChannel: any = io.of('/broadcast')
    .on('connection', async (socket: any) => {
        await connectSocket(socket)
    });


// 新发现,探索
const exploreChannel: any = io.of('/explore')
    .on('connection', async (socket: any) => {
        console.info('探索频道用户上线');
        socket.emit('explore', '也许是个好消息');
        await connectSocket(socket)
    });

// 新闻
const newsChannel: any = io.of('/news')
    .on('connection', async (socket: any) => {
        console.info('新闻频道用户上线');
        socket.emit('news', 'news message');
        await connectSocket(socket)
    });

// 紧急
const criticalChannel: any = io.of('/critical')
    .on('connection', async (socket: any) => {
        console.info('紧急频道用户上线');
        socket.emit('critical', 'critical  紧急消息频道');
        await connectSocket(socket)
    });

// 陨落，太阳陨落，送别花船，希望不会有这个出现
const fallChannel: any = io.of('/fall')
    .on('connection', async (socket: any) => {
        console.info('陨落频道用户上线');
        socket.emit('fall', '巨星陨落 频道');
        await connectSocket(socket)
    });

// 治愈、绽放、Blooming，一朵鲜花重新绽放
const cureChannel: any = io.of('/cure')
    .on('connection', async (socket: any) => {
        console.info('治愈频道用户上线');
        await connectSocket(socket)
        // todo
    });

// 报告频道，确保数据可信,会写入到数据库
const reportChannel: any = io.of('/report')
    .on('connection', async (socket: any) => {
        console.info('nCoV报告频道，乐观讲，不一定是坏消息');
        await connectSocket(socket); // 记录连接
        // todo 检查权限
        // todo 检查消息
        await onSocket(socket, 'report');

        // 记录日志，成功或者失败
        // await logSocket(socket);


        // todo 数据入库
        // todo 返回前端
        await successSocket(socket)
    });

setInterval(async () => {
    await _bo('/broadcast', 'sendData', 'test')
    // todo 2*60*1000
}, 5 * 1000);

setInterval(async () => {
    await _bo('/broadcast', 'sendData', await broadcastTask());
    // todo 2*60*1000
}, 30 * 1000);

// async function _io(name: string, data: any) {
//     return io.sockets.emit(name, data)
// }

/**
 * @desc 向订阅的频道推送消息
 * */
const _bo = async (channel: string, eventName: string, data: any) => {
    return io.of(channel).emit(eventName, {errorCode: 0, data, msg: "success"})
};
/**
 * @desc 向订阅的频道报告错误的消息
 * */
const _error = async (channel: string, eventName: string, data: any, msg?: string) => {
    //todo记录错误日志
    return io.of(channel).emit(eventName, {errorCode: 1, data, msg: msg || 'error'})
};
http.listen(9999, async () => {
    await connectMongo();
    console.info('biubiu，走您~~', 8080);
});

export {
    broadcastChannel,
    _error
    // _io
}
