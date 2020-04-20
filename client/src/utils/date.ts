/***********************
 * @name 简单时间格式工具
 * @author veaba
 * @date 2020/1/20 0020
 ***********************/

const date = new Date();
import {format} from 'date-fns';

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const lastDay = String(date.getDate() - 1).padStart(2, '0');
export const today = year + '-' + month + '-' + day;

export const yesterday = year + '-' + month + '-' + lastDay;


// 可能时间产生错误
export const fmtTime = (time:any) => {
	if (typeof time !== 'string') {
		return ' '; // 如果不符合条件,则返回空
	}
	// 2020-01-22T12:58:47Z
	// 2020年1月22日20:58
	const the_time = new Date(time);
	return format(new Date(the_time),'yyyy-MM-dd HH:mm:ss')
};
