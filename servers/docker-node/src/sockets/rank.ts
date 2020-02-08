import {_pushSuccess} from "../app";
import {parserChinaRank, parseWorldRank} from "../utils/task";
import {getTime} from 'date-fns'
import {axios} from "../utils/axios";

/**
 * @desc 获取ChinaRank
 * */
export const getChinaRank = async (socket: any, data: any, channel: string, eventName: string) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const chinaRank = parserChinaRank(allData.areaTree[0]);
                await _pushSuccess(channel, eventName, chinaRank); // 国内rank
                res = null
            }
        })
        .catch((err: any) => {
            console.info('getChinaRank', err);
        })
};

/**
 * @desc 获取WorldRank
 * */
export const getWorldRank = async (socket: any, data: any, channel: string, eventName: string) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const worldRank = parseWorldRank(allData.areaTree);
                await _pushSuccess(channel, eventName, worldRank); // 世界rank
                res = null
            }
        })
        .catch((err: any) => {
            console.info('getWorldRank', err);
        })
};
/**
 * @desc 获取ChinaDay
 * */

export const getChinaDay = async (socket: any, data: any, channel: string, eventName: string) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const chinaDayList = allData.chinaDayList;
                await _pushSuccess(channel, eventName, chinaDayList, getTime(new Date())); // timeline 折线图
                res = null
            }
        })
        .catch((err: any) => {
            console.info('getChinaDay', err);
        })
};
