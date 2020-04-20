/**
 * @desc 通用枚举值
 * */

export const auditMap = {
	isConfirm: '确诊',
	isCure: '治愈',
	isDead: '死亡',
	isSuspected: '疑似'
};

// 职业
export const professionMap = {
	1: "平民",
	2: "医生"
};


// 境内还是境外

export const zoomMap = ["中国"];

/**
 * @desc 疫情颜色
 * */
export const nCovColorsMap = [
	"#f44336",  // 确诊
	"#4caf50",  // 治愈
	"#9c27b0",  // 死亡
	"#ffa730",  // 疑似
];

/**
 * @desc rank的渐变范围从
 * #f44336 -> #ffa730
 *  ["#f44336", "#f75c35", "#fa7533", "#fc8e32", "#ffa730"]
 *
 * */

