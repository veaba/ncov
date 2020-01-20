/***********************
 * @name JS
 * @author Jo.gel
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
export const heatMapOp={
	size: 13,
	gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
	max: 100,
	// range: [0, 100], // 过滤显示数据范围
	draw: 'heatmap'
};

// todo 图例图层
export const pointOp = {};

// todo 迁徙图层-点
export const movePointOp = {};

// todo 迁徙图层-线
export const moveLineOp = {};
