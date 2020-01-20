/***********************
 * @name 基于ECharts
 * @author Jo.gel
 * @date 2020/1/20 0020
 ***********************/
import {textOp, heatMapOp, movePointOp, moveLineOp} from "./chartLib/mapv_layers";
import {textData, heatMapData, moveData} from "./chartLib/mapv_data";

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
	const cityCenter =mapv.utilCityCenter.getCenterByCityName("杭州");
	console.info(111,cityCenter);
	
	// 文字图层
	const textDataSet = new mapv.DataSet(textData());
	const textMapVLayer = new mapv.baiduMapLayer(map, textDataSet, textOp);
	
	// 图标图层
	const heatMapDataSet = new mapv.DataSet(heatMapData());
	const heatMapVLayer = new mapv.baiduMapLayer(map, heatMapDataSet, heatMapOp);
	
	// 迁徙图层-点移动
	const movePointDataSet = new mapv.DataSet(moveData());
	const movePointMapVLayer = new mapv.baiduMapLayer(map, movePointDataSet, movePointOp);
	
	// 迁徙图层-线
	const moveLineDataSet = new mapv.DataSet(moveData());
	const moveLineMapVLayer = new mapv.baiduMapLayer(map, moveLineDataSet, moveLineOp);
	
};

