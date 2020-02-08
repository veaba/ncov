/**
 * @desc Router
 * @time 2020年1月27日12:29:26
 * @author veaba
 * */
import {getKeysDB, insertOne, isHasOne, updateOne} from "../mongo/curd";
import 'url-search-params-polyfill'
const {Router} = require('express');
const router = Router();
import {githubOAuthConfig} from '../config'
import {axios} from "../utils/axios";
import {setHash} from "../redis/redis";
import {_pushSuccess} from "../app";
import {_authFail, _authSuccess} from "../utils/utils";

const handlerRedirect = async (req: any, res: any) => {
    const {query} = req;
    const {code} = query || {};
    // 得到一个{code:988f6df528f1bf0f4ba2}, 拿到授权码后。再去请求令牌
    if (!code) {
        res.set('Content-Type', 'text/html');
        res.send(_authFail());
    }
    // access_token=davasdsaxsasadsad&scope=&token_type=bearer
    const githubToken = await axios.post(githubOAuthConfig.getTokenUrl, {
        client_id: githubOAuthConfig.client_id,
        client_secret: githubOAuthConfig.client_secret,
        code,
    });
    const allUrl = new URLSearchParams(githubToken);
    const access_token = allUrl.get('access_token');
    const sid = req.params.sid;
    if (!sid) {
        return res.send(_authFail());
    }
    axios.get(githubOAuthConfig.getApiUrl, {
        headers: {
            'Authorization': 'token ' + access_token
        }
    })
        .then(async (apiRes: any) => {
            if (apiRes.id) {
                // 得到结果，更新到用户列表里面去，格式入config.ts 展示的
                const reqRedisObj: any = {
                    isAdmin: false
                };
                // 管理员
                if (apiRes.login === 'veaba') {
                    reqRedisObj.isAdmin = true
                }
                if (await isHasOne({name: apiRes.login}, 'users')) {
                    await updateOne({name: apiRes.login}, {
                        githubOAuthObj: apiRes,
                    }, 'users');
                    const {_id} = await getKeysDB({name: apiRes.login}, [], 'users');
                    reqRedisObj._id = _id.toString();
                    reqRedisObj.avatar_url = apiRes.avatar_url;
                    reqRedisObj.name = apiRes.login;
                    reqRedisObj.sid = sid;
                } else {
                    const {_id, name, githubOAuthObj} = await insertOne({
                        name: apiRes.login,
                        githubOAuthObj: apiRes,
                        ...reqRedisObj
                    }, 'users');
                    reqRedisObj.avatar_url = githubOAuthObj.avatar_url;
                    reqRedisObj._id = _id.toString();
                    reqRedisObj.name = name;
                    reqRedisObj.sid = sid;
                }
                await setHash(sid, reqRedisObj);
                await _pushSuccess('/broadcast', 'auth', [], '已授权访问Github', 0);
                // 插入到redis里面去，表示登录在线的，断开socket即失去登录状态
                res.set('Content-Type', 'text/html');
                res.send(_authSuccess());
            }
        });
};


// Github OAuth
router.get('/redirect/github/:sid', handlerRedirect);
export {
    router
}
