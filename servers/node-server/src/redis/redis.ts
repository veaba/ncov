/**
 * @desc Redis  promise resolve 异步返回callback 的结果
 * @time 2020年1月27日12:30:04
 * @author veaba
 * */


const redis = require('redis');
import {redisConfig} from "../config";

/**
 * @desc 设置hash key，增量替换而已
 * */
const setHash = async (key: string, data: object) => {
    if (!key) {
        console.info('setHash 丢失key');
        return
    }
    const client = redis.createClient(redisConfig);
    client.on('error', (err: any) => {
        console.log(err, 'setHash')
    });
    return new Promise(resolve => {
        // 这是单个更新还是多个更新？？
        // const data_string = JSON.stringify({...data});
        client.HMSET(key.toString(), {...data}, (err: any, res: any) => {
            if (err) console.info(err);
            client.end(true);
            resolve(res)
        })
    })
};

/**
 * @desc 获取hash key
 * @param key
 * @param field 可选
 * */
const getHash = async (key: string, field?: string) => {
    const client = redis.createClient(redisConfig);
    client.on('error', (err: any) => {
        console.log(err, 'getHash')
    });
    return new Promise((resolve) => {
        if (field) {
            client.HGET(key, field, async (err: any, obj: any) => {
                if (err) console.log(err);
                client.end(true);//关闭连接
                resolve(obj)
            })
        } else {
            client.hgetall(key, (err: any, obj: any) => {
                if (err) console.info(err);
                client.end(true);//关闭连接
                resolve(obj)
            })
        }
    })
};


/**
 * @desc 删除hash
 * */
const delKey = async (key: string) => {
    const client = redis.createClient(redisConfig);
    client.on('error', (err: any) => {
        console.log(err, 'getHash')
    });
    return new Promise(resolve => {
        client.del(key, (err: any, res: any) => {
            if (err) console.info(err);
            client.end(true);
            resolve(res)
        })
    })

};

/**
 * @desc 设置redis 有效时间
 * @param key
 * @param second
 * */
const setTime = async (key: string, second: number) => {
    const client = redis.createClient(redisConfig);
    client.on('error', (err: any) => {
        console.log(err, 'getHash')
    });
    return new Promise((resolve, reject) => {
        client.expire(key.toString(), second, (err: any, res: any) => {
            if (err) reject();
            else resolve(res);
            client.end(true);
        })
    })

};

export {
    setTime,
    setHash,
    getHash,
    delKey,
}
