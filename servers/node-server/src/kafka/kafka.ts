import {_pushSuccess, consumer, producer} from "../app";
import {kafkaConfig} from "../config";

/**
 * @desc kafka
 * */

/**
 * @desc kafka 生产者
 * */
export const proKafka = async (topic: string, message: any) => {
    await producer.send({
        topic: topic,
        messages: [
            {value: message},
        ],
    });
};

/**
 * @desc 拉取全部
 * */
export const cusAllKafka = async () => {

};

/**
 * @desc kafka消费者 每发送一次，推送一次
 * @partition
 * @topic
 * @offset message.offset
 * @value message.value
 * */
export const cusKafka = async (consumer: any, topic: any) => {
    console.info('fuuuck');
    // consumer.subscribe({topic: 'talk', fromBeginning: true});
    // await consumer.run({
    //     autoCommit: false,
    //     // 一次提供一条的函数
    //     eachMessage: async ({message, offset}: any) => {
    //         const msgStr = message.value.toString();
    //         try {
    //             const talkMsg = JSON.parse(msgStr);
    //             console.info('如果是第一次连接呢？', talkMsg);
    //             return await _pushSuccess('broadcast', 'talk', talkMsg, 'talking')
    //         } catch (e) {
    //             return await _pushSuccess('broadcast', 'talk', {data: msgStr}, 'talking')
    //         }
    //     },
    // })
};

/**
 * @desc 获取全部消息，单个用户推送，todo
 *
 * */
export const cusKafkaAll = async (consumer: any, topic: any) => {
    console.info('首次socket连接推送全部消息');
    await consumer.subscribe({topic, fromBeginning: true, offset: '1'});
    await consumer.run({
        autoCommit: false,
        // 一次提供一条的函数
        eachMessage: async ({message, offset}: any) => {
            setTimeout(async () => {
                const msgStr = message.value.toString();
                try {
                    const talkMsg = JSON.parse(msgStr);
                    console.info('如果是第一次连接呢？', talkMsg);
                    return await _pushSuccess('broadcast', 'talk', talkMsg, 'talking')
                } catch (e) {
                    return await _pushSuccess('broadcast', 'talk', {data: msgStr}, 'talking')
                }
            }, 1000)

        },
    })
};
