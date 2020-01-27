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
