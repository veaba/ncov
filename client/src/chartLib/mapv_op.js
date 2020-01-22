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
	gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
	max: 100,
	// range: [0, 100], // 过滤显示数据范围
	draw: 'heatmap'
};

// todo 图例图层
export const pointOp = {};

// todo 迁徙图层-点
export const movePointOp = {
	fillStyle: 'rgba(255, 250, 250, 0.5)',
	zIndex: 200,
	size: 2.5,
	animation: {
		type: 'time',
		stepsRange: {
			start: 0,
			end: 50
		},
		trails: 5,
		duration: 2,
	},
	draw: 'simple'
};

// 迁徙图层-线
export const moveLineOp = {
	strokeStyle: 'rgba(255, 250, 50, 0.8)',
	shadowColor: 'rgba(255, 250, 50, 1)',
	shadowBlur: 20,
	lineWidth: 2,
	zIndex: 100,
	draw: 'simple'
};

// todo 百度地图自带飞行线,废弃
// export const flyLineOp = {
// 	style: "chaos",
// 	step: 0.3,
// 	color: "rgba(33.242,214,0.3)",
// 	textureColor: (data) => {
// 		return data.properties.count > 0.5 ? "#ff0000" : "#56ccdd";
// 	},
// 	textureWidth: 20,
// 	textureLength: 10
// };
