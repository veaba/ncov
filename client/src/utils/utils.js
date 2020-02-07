import {format, subDays} from 'date-fns';

/**
 * @desc 分离频道和sid
 * @eg broadcast#PzRhGmFZpPAtFQdJAAAA
 * */
export const sid_obj = (str_sid) => {
	const [channel, sid] = (str_sid || '').trim().split('#');
	return {
		channel,
		sid
	};
};

/**
 * @desc 判断字符串类型
 * @param str
 * @return {boolean}
 * */
const isString = (str) => {
	return Object.prototype.toString.call(str) === '[object String]';
};

/**
 * @desc 时间转换格式
 * */
export const formatTime = (time, str) => {
	if (!time) return '';
	if (isString(time)) return time;
	return format(time, str || 'yyyy-MM-dd');
};


/**
 * @desc 颜色渐变转换
 * @return {Array}
 * @来源 https://www.zhihu.com/question/38869928
 * */
export const gradientColor = (startColor, endColor, num) => {
	
	const parseColor = function (hexStr) {
		return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
			return 0x11 * parseInt(s, 16);
		}) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
			return parseInt(s, 16);
		});
	};
	
	const pad = function (s) {
		return (s.length === 1) ? '0' + s : s;
	};
	
	const gradientColors = function (start, end, steps, gamma) {
		let i, j, ms, me, output = [], so = [];
		gamma = gamma || 1;
		const normalize = function (channel) {
			return Math.pow(channel / 255, gamma);
		};
		start = parseColor(start).map(normalize);
		end = parseColor(end).map(normalize);
		for (i = 0; i < steps; i++) {
			ms = i / (steps - 1);
			me = 1 - ms;
			for (j = 0; j < 3; j++) {
				so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
			}
			output.push('#' + so.join(''));
		}
		return output;
	};
	
	return gradientColors(startColor, endColor, num);
};

function _dateFn(date) {
	return format(date, 'MM-dd');
}

/**
 * @desc 过去几天
 * @return [1-25,2-1]
 * */
export const lastWhatDay = (num) => {
	const whatDayStart = subDays(new Date(), num);
	return [_dateFn(whatDayStart), _dateFn(new Date())];
};
/**
 * @desc 过去7天数组，不包含今天
 * */
export const lastWhatDaysList = (num) => {
	const daysList = [];
	for (let i = 1; i < num + 2; i++) {
		daysList.push(_dateFn(subDays(new Date(), i)));
	}
	return daysList.sort();
};

/*
* @desc 生成十六进制颜色
* */
export const randomColor = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
