/**
 * @desc Socker
 * @time 2020年1月26日01:47:41
 * @author veaba
 * */

import {insertOne, updateOne} from "../mongo/curd";
import {_sid_obj} from "./utils";
import {getTime} from 'date-fns'

/**
 * @desc 记录socket连接数
 * @param socket {Object}
 * */
export const logSocket = async (socket: any) => {
    const {id, handshake} = socket;
    const {issued} = handshake;
    await insertOne({..._sid_obj(id), begin_time: issued}, 'socket');
    socket.on('disconnect', async () => {
        const {id} = socket;
        const {sid} = _sid_obj(id);
        await updateOne({sid}, {..._sid_obj(id), end_time: getTime(new Date())}, 'socket');
    })
};
