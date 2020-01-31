import {_pushSuccess} from "../app";
import {parseTotal, parseWorldMap, totalTask, worldMapTask} from "../utils/task";
import {axios} from "../utils/axios";

/**
 * @desc 客户端主动请求世界地图数据
 * @param socket
 * @param data  2020-01-30 的时间格式，如果传递时间的话
 * @param channel
 * @param eventName
 * */
export const getWorldMap = async (socket: any, data: any, channel: string, eventName: string) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const worldMapData = parseWorldMap(allData.areaTree);
                await _pushSuccess(channel, eventName, worldMapData); // 世界地图
                res = null // 最后将res设置为null
            }
        })
};
/**
 * @desc 被动推送地图所需的total
 * */
export const getTotal = async (socket: any, data: any, channel: string, eventName: string) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const totalData = parseTotal(allData.chinaTotal, allData.areaTree.slice(1), allData.lastUpdateTime);
                await _pushSuccess(channel, eventName, totalData); // total数据
                res = null // 最后将res设置为null
            }
        })
};
