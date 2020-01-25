/**
 * @desc 判断空数组，入参？？
 * @
 */
const isEmptyArray = (arr: any) => {
    return Array.isArray(arr) && arr.length === 0
};

export {isEmptyArray}
