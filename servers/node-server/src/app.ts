/**
 * @desc App
 * @time 2020年1月25日20:38:36
 * @author veaba
 * */
import {isObject} from "./utils/check";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
// 请求体解析
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
import {broadcastTask} from "./utils/task";
import {connectMongo} from './mongo/mongo'
import {connectSocket, logSocket, onSocket, successSocket} from "./utils/socket";
import {router} from './routers/router'
import {getKeysDB} from "./mongo/curd";

app.use(router);
app.get('/', (req: any, res: any) => {
    res.send('干嘛？')
});


io.on('connection', (socket: any) => {
    console.info('is Connected');

});


// 广播
const broadcastChannel: any = io.of('/broadcast')
    .on('connection', async (socket: any) => {
        await connectSocket(socket);
        // await _success('/broadcast', 'auth', '未授权访问', 2403)
        await onSocket(socket, 'report'); // report 检查权限+检查消息+记录日志，成功或者失败
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

// 报告频道，确保数据可信,会写入到数据库，
// todo 一有报告就实时推送到前端
const reportChannel: any = io.of('/report')
    .on('connection', async (socket: any) => {
        console.info('nCoV报告频道，乐观讲，不一定是坏消息');
        await connectSocket(socket); // 记录连接
        await onSocket(socket, 'report'); // report 检查权限+检查消息+记录日志，成功或者失败
    });


/**
 *  eventName={
        ageChart =>,疫情感染年龄分布 饼图 {}，各阶段的年龄
        sexChart =>，疫情感染性别分布，饼图
        statisticsChart => 疫情生命特征统计分布 柱状图 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪}
        worldMap => 中间那个大地图所需的数据
        chinaTotalChart => 中国境内统计的横向 柱状带小柱图，有新数据会动，会排序 {count确诊,dead陨落,cure治愈,suspected疑似,track追踪,province}省份
        loveChart => 爱心地图，迁徙线，红点小红心，表示从x国，x地到中国境内的资助，在大地图上展示
        chartPieChart   => 省份占比,

    }
 * @desc 异步地图涂推送图标数据

 }*/
const asyncChannel = io.of('/chart')
    .on('connection', async (socket: any) => {

    });

setInterval(async () => {
    // await _success('/broadcast', 'sendData', 'test');
    // await _success('/asyncChannel', 'worldMap', '世界地图数据');
}, 10 * 1000);

setInterval(async () => {
    await _success('/broadcast', 'sendData', await broadcastTask());
    // todo 2*60*1000
}, 10 * 1000);

// async function _io(name: string, data: any) {
//     return io.sockets.emit(name, data)
// }

/**
 * @desc 向订阅的频道推送消息，成功的提示
 * */
const _success = async (channel: string, eventName: string, data: any, code?: number, msg?: string) => {
    return io.of(channel).emit(eventName, {code: code, data, msg: msg || 'success'})
};
/**
 * @desc 向订阅的频道报告错误的消息
 * */
const _error = async (channel: string, eventName: string, data: any, code?: number, msg?: string) => {
    //todo记录错误日志
    return io.of(channel).emit(eventName, {code: 1, data, msg: msg || 'error'})
};
http.listen(9999, async () => {
    await connectMongo();
    console.info('biubiu，走您~~', 9999);
});

export {
    broadcastChannel,
    _error,
    _success
    // _io
}
