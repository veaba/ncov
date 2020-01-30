/**
 * @desc 判断空数组，入参？？
 * @
 */
export const isEmptyArray = (arr: any) => {
    return Array.isArray(arr) && arr.length === 0
};

/**
 * @desc 判断空对象
 * */
export const isEmptyObject = (obj: any) => {
    return (Object.prototype.toString.call(obj) === '[object Object]' && JSON.stringify(obj) === '{}')
}

/**
 * @desc 判断是对象类型
 * */
export const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
};

/**
 * @desc 判断是字符串
 * */
export const isString = (str: any) => {
    return Object.prototype.toString.call(str) === '[object String]'
};
/**
 * @desc 判断是数字
 * */
export const isNumber = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Number]'
};

