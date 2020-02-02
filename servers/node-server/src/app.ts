/**
 * @desc App
 * @time 2020年1月25日20:38:36
 * @author veaba
 * */
import {isHasOne} from "./mongo/curd";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
// 请求体解析
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
import {auditTask, broadcastTask, rankTask, tencent, totalTask, worldMapTask} from "./utils/task";
import {connectMongo} from './mongo/mongo'
import {connectSocket, onSocket} from "./sockets/socket";
import {router} from './routers/router'

import {format, startOfYesterday} from 'date-fns'
// 2020-01-27T12:38:42.043Z => 2020年1月27日20:39:01
// const x = format(new Date('2020-01-27T12:38:42.043Z'), 'yyyy-MM-dd HH:mm:ss');
// console.info('时间==>', x);
app.use(router);
app.get('/', (req: any, res: any) => {
    res.send('干嘛？')
});
// 广播
const broadcastChannel: any = io.of('/broadcast')
    .on('connection', async (socket: any) => {
        await connectSocket(socket);
        // await onSocket(socket, 'report');       // report 检查权限+检查消息+记录日志，成功或者失败
        // await onSocket(socket, 'apply');        // 审核通过 report
        // await onSocket(socket, 'getAudit');     // 审核通过 report
        // await onSocket(socket, 'auditDelete');  // 删除audit+report
        // await onSocket(socket, 'getTimeline');  // 获取时间轴
        // await onSocket(socket, 'getNews');      // 获取新闻
        await onSocket(socket, 'getTotal');     // 获取世界地图统计数据
        await onSocket(socket, 'getChinaDay');  // 获取中国折线图
        await onSocket(socket, 'getChinaRank'); // 获取中国Rank排行数据
        await onSocket(socket, 'getWorldRank'); // 获取世界Rank排行数据
        await onSocket(socket, 'getWorldMap');  // 获取世界地图数据
    });


// // 紧急
// const criticalChannel: any = io.of('/critical')
//     .on('connection', async (socket: any) => {
//         console.info('紧急频道用户上线');
//         socket.emit('critical', 'critical  紧急消息频道');
//         await connectSocket(socket)
//     });
//
// // 陨落，太阳陨落，送别花船，希望不会有这个出现
// const fallChannel: any = io.of('/fall')
//     .on('connection', async (socket: any) => {
//         console.info('陨落频道用户上线');
//         socket.emit('fall', '巨星陨落 频道');
//         await connectSocket(socket)
//     });
//
// // 治愈、绽放、Blooming，一朵鲜花重新绽放
// const cureChannel: any = io.of('/cure')
//     .on('connection', async (socket: any) => {
//         console.info('治愈频道用户上线');
//         await connectSocket(socket)
//     });

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

// todo 定时存储是时间到数据库，但是这个还是存在误差的

// setInterval(async () => {
//     // todo 查询history 数据库，是否存在字段，不存在则写入
//     if (new Date().getHours() < 1) {
//         if (!await isHasOne({date: format(startOfYesterday(), 'yyyy-MM-dd')}, 'historys')) {
//             await saveHistoryData()
//         }
//     }
//
// }, 2 * 60 * 1000);

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
    return io.of(channel).emit(eventName, {code: code, data, msg: msg || 'success'})
};
/**
 * @desc 向订阅的频道报告错误的消息
 * */
const _pushError = async (channel: string, eventName: string, data: any, msg?: string | number, code?: number) => {
    //todo记录错误日志
    return io.of(channel).emit(eventName, {code: 1, data, msg: msg || 'error'})
};
http.listen(9999, async () => {
    await connectMongo();
    console.info(' >     Biubiu 走您~ 9999 √');
});

export {
    broadcastChannel,
    _pushError,
    _pushSuccess
}
