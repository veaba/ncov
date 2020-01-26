/***********************
 * @name 基于ECharts
 * @author Jo.gel
 * @date 2020/1/20 0020
 ***********************/
import {textOp, heatMapOp, movePointOp, flyLineOp, moveLineOp} from "../chartLib/mapv_op";
import {textData, heatMapData, moveLineData, movePointData} from "../chartLib/mapv_data";

// 人工版本的绘图
export const drawMap = () => {
	// 百度地图API功能
	const map = new BMap.Map("map", {
		enableMapClick: false
	});
	map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);
	map.enableScrollWheelZoom(true);
	
	map.setMapStyle({
		style: 'midnight'
	});
	
	// 根据城市名称提取坐标，国内省会可以提取
	// const cityCenter = mapv.utilCityCenter.getCenterByCityName("贵阳");
	// console.info("拾取坐标：",cityCenter);
	// 文字图层
	const textDataSet = new mapv.DataSet(textData(mapv));
	const textMapVLayer = new mapv.baiduMapLayer(map, textDataSet, textOp);
	
	// 图标图层
	const heatMapDataSet = new mapv.DataSet(heatMapData(mapv));
	const heatMapVLayer = new mapv.baiduMapLayer(map, heatMapDataSet, heatMapOp);
	
	// 迁徙图层-点移动
	const movePointDataSet = new mapv.DataSet(movePointData.call(mapv, mapv));
	const movePointMapVLayer = new mapv.baiduMapLayer(map, movePointDataSet, movePointOp);
	
	// console.info("movePointDataSet",movePointDataSet);
	// console.info("movePointOp",movePointOp);
	// todo
	// 迁徙图层-线
	const moveLineDataSet = new mapv.DataSet(moveLineData(mapv));
	const moveLineLayer = new mapv.baiduMapLayer(map, moveLineDataSet, moveLineOp);
	
};

/**
 * @desc 实时绘图、异步绘图
 * */
export const realtimeDrawMap = (socket) => {
	console.info('---> 实时绘图 <----');
	// todo 解析数据
	// socket.on('')
};
