const axios = require('axios');

/**
 * @desc req 拦截器
 * */
axios.interceptors.request.use((req: any) => {
    return req
}, (err: any) => {
    return Promise.reject(err.request)
});
/**
 * @desc res 拦截器 axios
 * */
axios.interceptors.response.use((res: any) => {
    if (res && res.data) {
        if (res.status === 200) {
            return res.data
        } else {
            return res.json(res.data)
        }
    }
    return res
}, (error: any) => {
    // 错误信息扶正，后续在请求时，不需要catch
    return Promise.resolve(error.response)
});

// 暴露出去给vuex 使用
export {axios}
