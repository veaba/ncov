/**
 * @desc Task
 * @time 2020年1月25日23:37:52
 * @author veaba
 * */
// import {_io} from "../app";
import {format, getTime} from 'date-fns'

import {findCount, getKeysAll, getRankAll, taskChannelList, updateOne} from "../mongo/curd";

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
    let reportDateObj: any = {};
    if (dateStr && new Date(dateStr)) {
        reportDateObj.reportDate = getTime(new Date(dateStr))
    }
    return await getKeysAll({pass: true, ...reportDateObj}, [
        'count', 'cure', 'dead', 'suspected',
        'country', 'province', 'city', 'area', 'reportDate'], 'audits');
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

