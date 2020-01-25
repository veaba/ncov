const cryPto = require('crypto');
/**
 * @desc 密码加密模块
 * @edu 加盐'edu'，十六进制,加密算法sha256
 * */
const _encryptedPWD = (password: string): string => {
    return cryPto.createHmac('sha1', password)
        .update('edu')
        .digest('hex')
};
/**
 * @desc node md5算法
 * @param password
 */
const _md5 = (password: string): string => {
    return cryPto.createHash('md5').update(password).digest('hex')
};

/*
* @desc 分离频道和sid
* @eg broadcast#PzRhGmFZpPAtFQdJAAAA
* */
const _sid_obj = (str_sid: string) => {
    const [channel, sid] = (str_sid || '').trim().split('#');
    return {
        channel,
        sid
    }
};

export {_encryptedPWD, _md5, _sid_obj}
