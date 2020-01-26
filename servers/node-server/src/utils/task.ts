/**
 * @desc Task
 * @time 2020年1月25日23:37:52
 * @author veaba
 * */
// import {_io} from "../app";

import {getBroadcastChannelList, updateOne} from "../mongo/curd";

/**
 * @desc 广播定时任务
 * */
const broadcastTask = async () => {
    // 查询数据，取broadcasts 表最新20条
    const broadcastList = await getBroadcastChannelList();
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

export {
    broadcastTask
}
