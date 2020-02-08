/**
 * @desc timeline
 * @author veaba
 * @date 2020年1月29日14:32:18
 * */
import {getAllList, insertOne, isHasOne} from "../mongo/curd";
import {_pushSuccess} from "../app";
import {_authUser} from "../utils/utils";

/*
* @desc 前端请求timeline数据
* */
export const getTimeline = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    const timelineList = await getAllList({}, 'timelines');
    await _pushSuccess(channel, 'getTimeline', timelineList)
};

/**
 * @desc 内部实现timeline函数
 * */
export const _saveTimeline = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    await _authUser(socket, sid, data, channel, eventName, 'noAuth'); // 非授权用户
    // 先查找是否存在这个人记录，存在则不操作，不存在则插入
    const canSave = await isHasOne({_id: data._id, newsUrl: data.newsUrl}, 'timelines');
    if (!canSave) {
        await insertOne(data, 'timelines')
    }
};
