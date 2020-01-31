/***********************
 * @name mapV 使用的options，主要用于修改调整样式配置
 * @author veaba
 * @date 2020/1/20 0020
 ***********************/

// 文字图层
export const textOp = {
	draw: 'text',
	avoid: true,
	size: 12,
	font: '18px Arial',
	fillStyle: 'yellow',
	shadowColor: 'yellow',
	shadowBlur: 10
};
// 热点图层
export const heatMapOp = {
	size: 13,
	gradient: {
		0.25: "#2281af",
		0.55: "#64bbfc",
		1.0: "#16b4f4"},
	max: 100,
	// range: [0, 100], // 过滤显示数据范围
	draw: 'heatmap'
};

// todo 图例图层
export const pointOp = {};

// todo 迁徙图层-点
export const movePointOp = {
	fillStyle: '#16b4f4',
	zIndex: 200,
	size: 5,
	animation: {
		type: 'time',
		stepsRange: {
			start: 1,
			end: 100
		},
		trails: 1,
		duration: 2,
	},
	draw: 'simple'
};

// 迁徙图层-线
export const moveLineOp = {
	strokeStyle: 'rgba(3,116,170,0.32)',
	shadowColor: '#0374AA',
	shadowBlur: 1,
	lineWidth: 1,
	zIndex: 100,
	draw: 'simple'
};
