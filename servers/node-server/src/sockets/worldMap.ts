import {_pushSuccess} from "../app";
import {totalTask, worldMapTask} from "../utils/task";
import {getTime} from 'date-fns'

/**
 * @desc 客户端主动请求世界地图数据
 * @param socket
 * @param data  2020-01-30 的时间格式，如果传递时间的话
 * @param channel
 * @param eventName
 * */
export const getWorldMap = async (socket: any, data: any, channel: string, eventName: string) => {
    let dateStr = '';
    if (data && data.date) {
        dateStr = data.date || '';
    }
    return await _pushSuccess(channel, 'worldMap', await worldMapTask(dateStr), getTime(new Date()))
        .catch(err => {
            console.info(err);
        })
};
/**
 * @desc 被动推送地图所需的total
 * */
export const getTotal = async (socket: any, data: any, channel: string, eventName: string) => {
    return await _pushSuccess(channel, 'total', await totalTask(), '被动推送地图统计')
};
