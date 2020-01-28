import {getHash} from "../redis/redis";
import {logSocket} from "../sockets/socket";
import {_pushError} from "../app";

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

/**
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

/**
 * @desc 返回OAuth 成功
 * */
const _authSuccess = () => {
    return Buffer.from(`
                      <html lang="zh">
                        <head>
                            <meta charset="UTF-8">
                            <title>恭喜，你已授权成功！Github OAuth to 2019-nCoV Success!</title>
                            <style>
                                .auth{
                                    margin: 200px auto 0 ;
                                    width: 460px;
                                    height: 300px;
                                }
                                a{
                                    font-weight: 500;
                                }
                                a:visited{
                                    color: #0366d6;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="main-auth">
                                <div class="auth">
                                    <h2>授权成功，有问题联系 <a href="http://github.com/veaba/ncov/">社区项目</h2>
                                    
                                    <p>此窗口即将关闭</p>
                                </div>
                            </div>
                            <script>
                                setTimeout(()=>{
                                    window.close();
                                },3000)
                            </script>
                        </body>
                       </html>
        `)
};

/**
 * @desc 返回OAuth 失败
 * */
const _authFail = () => {
    return Buffer.from(`
          <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <title>授权失败！Github OAuth to 2019-nCoV Fail!</title>
                <style>
                    .auth{
                        margin: 200px auto 0 ;
                        width: 460px;
                        height: 300px;
                    }
                    a{
                        font-weight: 500;
                    }
                    a:visited{
                        color: #0366d6;
                    }
                </style>
            </head>
            <body>
                <div class="main-auth">
                    <div class="auth">
                        <h2>授权失败,请联系 <a href="http://github.com/veaba/ncov/">社区项目</h2>
                    </div>
                </div>
            </body>
           </html>
        `)
};


/**
 * @desc 检查socket的emit是否是授权用户，也就是必须是用户，且授权过的，其中包含普通用户和管理员
 * @todo 可能后续直接断开
 * */
const _authUser = async (socket: any, sid: string, data: any, channel: string, eventName: string, logType: string,) => {
    if (!await getHash(sid)) {
        await logSocket(socket, data, channel, eventName, logType);
        return await _pushError(channel, eventName, data, '非法用户，即将断开连接');
        // return socket.disconnect()
    }
};
export {_encryptedPWD, _md5, _sid_obj, _authSuccess, _authFail, _authUser}
