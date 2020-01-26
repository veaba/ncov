/**
 * @desc 判断空数组，入参？？
 * @
 */
const isEmptyArray = (arr: any) => {
    return Array.isArray(arr) && arr.length === 0
};

/**
 * @desc 判断是对象类型
 * */
const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
};

/**
 * @desc 判断是字符串
 * */
const isString = (str: any) => {
    return Object.prototype.toString.call(str) === '[object String]'
};
/**
* @desc 判断是数字
* */
const isNumber = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Number]'
};
export {isEmptyArray, isObject,isString,isNumber}
