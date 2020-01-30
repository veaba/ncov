/**
 * @desc Task
 * @time 2020年1月25日23:37:52
 * @author veaba
 * */
// import {_io} from "../app";
import {format, getTime} from 'date-fns'

import {findCount, getKeysAll, taskChannelList, updateOne} from "../mongo/curd";

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
 * */

export const totalTask = async () => {
    const count = await findCount({isConfirm: true, pass: true}, 'reports');
    const cure = await findCount({isCure: true, pass: true}, 'reports');
    const dead = await findCount({isDead: true, pass: true}, 'reports');
    const suspected = await findCount({isSuspected: true, pass: true}, 'reports');
    const all = count + cure + dead;
    return {
        all,
        count,
        cure,
        suspected,
        dead,
    }
};

/**
 * @desc 推送世界地图数据,读入reports pass 为true的数据
 * @todo 根据入参时间获取世界地图数据
 * @time  // 1580256000000 -> 2020-01-29 08:00:00
 * @param dateStr
 * @return [{name,country,province,city,area,count,cure,dead,suspected}]
 * */
export const worldMapTask = async (dateStr?: string) => {
    let queryDate: number = 0;
    if (dateStr && new Date(dateStr)) {
        queryDate = getTime(new Date(dateStr))
    } else {
        queryDate = getTime(new Date(format(new Date(), 'yyyy-MM-dd')))
    }
    // todo bug
    let passList = await getKeysAll({pass: true, reportDate: queryDate}, [
        'isConfirm', 'isCure', 'isSuspected', 'isDead',
        'country', 'province', 'city', 'area', 'reportDate'], 'reports');
    const allObj: any = {};
    passList.map((item: any) => {
        if (!allObj[item.city]) {
            allObj[item.city] = {};
        }
        allObj[item.city].country = item.country;
        allObj[item.city].province = item.province;
        allObj[item.city].city = item.city;
        allObj[item.city].area = item.area;
        if (item.isConfirm) {
            allObj[item.city].count = (allObj[item.city].count || 0) + 1
        }
        if (item.isCure) {
            allObj[item.city].cure = (allObj[item.city].cure || 0) + 1
        }
        if (item.isDead) {
            allObj[item.city].dead = (allObj[item.city].dead || 0) + 1
        }
        if (item.isSuspected) {
            allObj[item.city].suspected = (allObj[item.city].suspected || 0) + 1
        }
    });

    let resList = [];

    for (let city in allObj) {
        resList.push({
            name: city,
            country: allObj[city].country,
            province: allObj[city].province,
            city: city,
            area: allObj[city].area,
            count: allObj[city].count || 0,
            cure: allObj[city].cure || 0,
            dead: allObj[city].dead || 0,
            suspected: allObj[city].suspected || 0,
        })
    }
    return resList
};
