import {format} from 'date-fns';

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
 * @desc 时间转换格式
 * */
export const formatTime = (time, str) => {
	if (!time) return '';
	return format(time, str || 'yyyy-MM-dd');
};

