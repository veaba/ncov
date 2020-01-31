import {_authUser} from "../utils/utils";
import {ReportInterface} from "../interface/interface";
import {_pushError, _pushSuccess} from "../app";
import {
    deleteMany,
    deleteOneById,
    getKeysDB,
    isHasOne,
    taskChannelList,
    updateMany,
    updateOne
} from "../mongo/curd";
import {getHash} from "../redis/redis";
import {_saveTimeline} from "./timeline";

/**
 * @desc 审核部分
 * */

export const applyAudit = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非授权用户
    const applyReq: ReportInterface.apply = data;
    // 校验参数
    if (!applyReq._id) {
        return await _pushError(channel, eventName, applyReq, '参数错误', 1);
    }
    const canAudit = await isHasOne({_id: applyReq._id, pass: true}, 'audits');

    const redisObj: any = await getHash(sid) || {};
    if (!redisObj.isAdmin) {
        return await _pushError(channel, eventName, applyReq, '权限不够');
    }
    if (!canAudit) {
        await updateOne({_id: applyReq._id}, {pass: true}, 'audits'); //审核表先通过
        const {githubName} = await getKeysDB({id: applyReq._id}, ['githubName'], 'audits');
        await updateOne({name: githubName}, {$inc: {passCount: 1}}, 'users');    // 的贡献值
        await updateMany({auditId: applyReq._id}, {pass: true}, 'reports');// 更新报告
        await updateOne({_id: redisObj._id}, {$inc: {auditCount: 1}}, 'users'); // 管理员审核通过的值+1
        const reportData: any = await getKeysDB({_id: applyReq._id, pass: true}, [], 'audits');
        await _saveTimeline(socket, sid, reportData, channel, eventName);// 存入timeline
        // todo 地图获取相应的模块更新数据
        return await _pushSuccess(channel, 'auditStatus', {_id: applyReq._id}, '审核成功')
    } else {
        // 已被审核过了，
        return await _pushError(channel, 'auditStatus', {_id: applyReq._id}, '已被审核过')
    }
};

/**
 * @desc 删除审核数据
 * */
export const deleteAudit = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非登录用户
    const applyReq: ReportInterface.apply = data;
    // 校验参数
    if (!applyReq._id) {
        return await _pushError(channel, eventName, applyReq, '参数错误', 1);
    }
    const canAudit = await isHasOne({_id: applyReq._id, pass: true}, 'audits');
    const redisObj: any = await getHash(sid) || {};
    if (!redisObj.isAdmin) {
        return await _pushError(channel, eventName, applyReq, '权限不够');
    }

    if (!canAudit) {
        await deleteOneById(applyReq._id, 'audits');  // 删除audits表
        // 个人经验值-1
        const {githubName} = await getKeysDB({id: applyReq._id}, ['githubName'], 'audits');
        await updateOne({name: githubName}, {$inc: {passCount: -1}}, 'users');    // 报告者的贡献值-1
        await deleteMany({auditId: applyReq._id}, 'reports');
        await updateOne({_id: redisObj._id}, {$inc: {refuseCount: 1}}, 'users'); // 管理员拒绝的值+1
        return await _pushSuccess(channel, 'auditStatus', {_id: applyReq._id}, '驳回成功')
    } else {
        return await _pushError(channel, 'auditStatus', {_id: applyReq._id}, '已通过审核，无法被驳回')
    }

};

/**
 * @desc 被动推送审核数据
 * */
export const getAudit = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非登录用户
    const redisObj: any = await getHash(sid) || {};
    if (redisObj) {
        const auditList = await taskChannelList('audits', 5, {
            // 查询不等于true
            pass: {
                $ne: true
            }
        });
        return await _pushSuccess(channel, 'getAudit', auditList || [], '下发待审核列表')
    }
    return await _pushError(channel, eventName, [], '权限不够');
};
