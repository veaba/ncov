/*
* @desc 前端请求timeline数据
* */
import {taskChannelList} from "../mongo/curd";
import {_pushSuccess} from "../app";

export const getNews = async (socket: any, sid: any, data: any, channel: string, eventName: string) => {
    const newsList = await taskChannelList('broadcasts', 10);
    await _pushSuccess(channel, 'getNews', newsList)
};
