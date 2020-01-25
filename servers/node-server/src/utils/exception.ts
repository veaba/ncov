/**
 * @desc 异常
 * @time 2020年1月25日23:12:44
 * @author veaba
 * */

/**
 * @description  mongodb 操作成功函数
 * @param res
 * @param msg
 * @param data
 * @param code 正常0
 */
const _dbSuccess = async (
    res: any,
    msg?: string,
    data?: any,
    code?: number | undefined
) => {
    return await res.json({
        msg: msg || "操作成功",
        data: data || [],
        code: code || 0
    });
};


/**
 * @description mongodb 操作失败函数
 * @param res
 * @param msg
 * @param data
 * @param code 错误代码,默认1
 */
const _dbError = async (
    res: any,
    msg: string,
    data?: any,
    code?: number | undefined
) => {
    return await res.json({
        msg: msg || "操作失败",
        data: data || [],
        code: code || 1
    });
};

export {
    _dbSuccess, _dbError
}
