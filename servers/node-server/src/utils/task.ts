/**
 * @desc Task
 * @time 2020年1月25日23:37:52
 * @author veaba
 * */
// import {_io} from "../app";

import {taskChannelList, updateOne} from "../mongo/curd";

/**
 * @desc 广播定时任务
 * */
export const broadcastTask = async () => {
    // 查询数据，取broadcasts 表最新2条
    const broadcastList = await taskChannelList('broadcasts', 2);
    let sendData = [];
    for (let item of broadcastList) {
        // 说明是新的
        if (!item.is_new) {
            sendData.push(item);
            // todo 并更新这些值
            // await updateOne({_id: item._id}, {...item, is_new: true}, 'broadcasts')
        }
    }
    return sendData

};


/**
 * @desc 推送审核任务, 5 条
 * */

export const auditTask = async () => {
    const broadcastList = await taskChannelList('audits', 5);
    let auditList = [];
    for (let item of broadcastList) {
        // 说明是新的
        if (!item.pass) {
            auditList.push(item);
            // todo 并更新这些值
            await updateOne({_id: item._id}, {...item, pass: true}, 'broadcasts')
        }
    }
    return auditList
};

