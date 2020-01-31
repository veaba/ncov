/**
 * @desc Task
 * @time 2020年1月25日23:37:52
 * @author veaba
 * */
// import {_io} from "../app";
import {format, getTime} from 'date-fns'

import {findCount, getKeysAll, getRankAll, taskChannelList, updateOne} from "../mongo/curd";
import {axios} from "./axios";
import {_pushSuccess} from "../app";

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


/**
 * @desc 推送人数统计任务，读取reports pass 为true 的数据
 * @reports 710.355ms
 * @audits  a1: 40.648ms
 * */
export const totalTask = async () => {
    let resList = await getKeysAll({pass: true}, ['count', 'cure', 'dead', 'suspected'], 'audits');
    const totalObj = {
        count: 0,
        cure: 0,
        dead: 0,
        suspected: 0,
        treat: 0
    };
    resList.map((item: any) => {
        totalObj.count += item.count;
        totalObj.cure += item.cure;
        totalObj.dead += item.dead;
        totalObj.suspected += item.suspected;
    });
    totalObj.treat = totalObj.count - (totalObj.cure + totalObj.dead);
    return totalObj
};

/**
 * @desc 推送世界地图数据,读入reports pass 为true的数据
 * @data 根据入参时间获取世界地图数据
 * @time  // 1580256000000 -> 2020-01-29 08:00:00
 * @param dateStr
 * @return [{name,country,province,city,area,count,cure,dead,suspected}]
 * */
export const worldMapTask = async (dateStr?: string | null) => {

};

/**
 * @desc 获取rank
 * */
export const rankTask = async (dateStr?: string | null) => {
    let reportDateObj: any = {};
    if (dateStr && new Date(dateStr)) {
        reportDateObj.reportDate = getTime(new Date(dateStr))
    }
    let auditList = await getRankAll({pass: true, country: "中国", ...reportDateObj}, [
        "count", "cure", "dead", "suspected",
        'country', 'province'], 'audits') || [];
    let provinceObj: any = {};
    auditList.map((item: any) => {
        if (!provinceObj[item.province]) {
            provinceObj[item.province] = {
                count: 0,
                cure: 0,
                dead: 0,
                suspected: 0
            }
        }
        provinceObj[item.province].count += (item.count || 0);
        provinceObj[item.province].cure += (item.cure || 0);
        provinceObj[item.province].dead += (item.dead || 0);
        provinceObj[item.province].suspected += (item.suspected || 0);
        provinceObj[item.province].province = item.province || "";
        provinceObj[item.province].country = item.country || ""
    });

    let rankList = [];
    for (let item in provinceObj) {
        delete provinceObj[item]._id;
        rankList.push(provinceObj[item])
    }

    rankList.sort((left: any, right: any) => {
        if (left.count > right.count) {
            return 1
        }
        if (left.count < right.count) {
            return -1
        }
        return 0
    });

    return rankList

};

/**
 * @desc 解析rankData
 * */
export const parserChinaRank = (data: any) => {
    const chinaObj = data || {};
    const chinaData = [];
    for (let item of chinaObj.children || []) {
        chinaData.push({
            name: item.name,
            province: item.name,
            ...item.total
        })
    }
    return chinaData
};

/**
 * @desc 解析世界地图
 * @return 返回的结果中name值可能有：=》地区待确认
 * */
export const parseWorldMap = (data: any) => {
    const otherCountryArray = data.slice(1);
    const otherCountryData = [];

    for (let item of otherCountryArray) {
        otherCountryData.push({
            name: item.name,
            country: item.name,
            province: item.name,
            city: item.name,
            ...item.total
        })
    }
    const chinaObj = data[0] || {};
    const chinaData = [];
    for (let items of chinaObj.children || []) {
        if (items.children) {
            for (let item of items.children) {
                chinaData.push({
                    country: "中国",
                    name: item.name || "地区待确认",
                    city: item.name || "地区待确认",
                    province: items.name || "地区待确认",
                    ...item.total
                })
            }
        }

    }
    return chinaData.concat(otherCountryData)
};

/**
 * @desc 解析total
 * */
export const parseTotal = (chinaTotal: any, otherCountryTotal: any, lastUpdateTime: string) => {
    const worldTotalObj = {
        worldConfirm: Number(chinaTotal.confirm || 0),
        worldHeal: Number(chinaTotal.heal || 0),
        worldDead: Number(chinaTotal.dead || 0),
        worldSuspect: Number(chinaTotal.suspect || 0),
    };

    for (let item of otherCountryTotal) {
        worldTotalObj.worldConfirm += Number((item.total.confirm || 0));
        worldTotalObj.worldHeal += Number((item.total.heal || 0));
        worldTotalObj.worldDead += Number((item.total.dead || 0));
        worldTotalObj.worldSuspect += Number((item.total.suspect || 0))
    }
    return {
        chinaConfirm: Number(chinaTotal.confirm),
        chinaHeal: Number(chinaTotal.heal),
        chinaDead: Number(chinaTotal.dead),
        chinaSuspect: Number(chinaTotal.suspect),
        lastUpdateTime,
        ...worldTotalObj
    }
};

/**
 * @desc 解析外国统计数据
 * */
export const parseWorldRank = (data: any) => {
    const worldData = [];
    for (let item of data) {
        worldData.push({
            name: item.name,
            country: item.name,
            ...item.total
        })
    }
    return worldData
};

/**
 * @desc 获取感染数据，来自腾讯数据
 *
 * */
export const tencent = async (dateStr?: number | string | null) => {
    axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=')
        .then(async (res: any) => {
            if (res.ret === 0) {
                const allData = JSON.parse(res.data || {});
                const totalData = parseTotal(allData.chinaTotal, allData.areaTree.slice(1), allData.lastUpdateTime);
                const worldMapData = parseWorldMap(allData.areaTree);
                const chinaRank = parserChinaRank(allData.areaTree[0]);
                const worldRank = parseWorldRank(allData.areaTree);
                const chinaDayList = allData.chinaDayList;
                //  延时推送，以免一次性数据量太大
                await _pushSuccess('broadcast', 'getTotal', totalData, getTime(new Date())); // 统计
                setTimeout(async () => {
                    await _pushSuccess('broadcast', 'getWorldRank', worldRank, getTime(new Date())); // 世界rank
                }, 1000);
                setTimeout(async () => {
                    await _pushSuccess('broadcast', 'getChinaDay', chinaDayList, getTime(new Date())); // timeline 折线图
                }, 3000);
                setTimeout(async () => {
                    await _pushSuccess('broadcast', 'getChinaRank', chinaRank, getTime(new Date())); // 国内rank
                }, 4000);
                setTimeout(async () => {
                    await _pushSuccess('broadcast', 'getWorldMap', worldMapData, getTime(new Date())); // 世界地图
                }, 5000);
                res = null // 最后将res设置为null
            }
        })
};


/*
* - 世界地图
* - 中国省份rank
* - 外国rank榜单，左侧
* - 轮播的时间轴 中下
* - 弹幕直接走腾讯的数据，全屏
* - 过去数据中国和轮播一起绑定
* - 新增数据 今日新增折线图-中国
* */
export const barrage = async () => {
    console.info('弹幕==');
    await _pushSuccess('broadcast', 'barrage', [], '弹幕消息'); // 弹幕消息
};
