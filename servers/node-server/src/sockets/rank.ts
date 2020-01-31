import {_pushSuccess} from "../app";
import {rankTask} from "../utils/task";
import {getTime} from 'date-fns'

export const getRank = async (socket: any, data: any, channel: string, eventName: string) => {
    let dateStr = '';
    if (data && data.date) {
        dateStr = data.date || '';
    }
    return await _pushSuccess(channel, 'rank', await rankTask(dateStr), getTime(new Date()))
        .catch(err => {
            console.info(err);
        })
};
