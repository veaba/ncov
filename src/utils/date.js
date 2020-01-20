/***********************
 * @name 简单时间格式工具
 * @author veaba
 * @date 2020/1/20 0020
 ***********************/

const date = new Date();

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

export const today = year + '-' + month + '-' + day;
