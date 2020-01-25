/***********************
 * @name mapV 使用的数据集
 * @author veaba
 * @date 2020/1/20 0020
 ***********************/
import {geo} from "./map_geo";
import {infectedCountData} from "../../public/data";
import {today, yesterday} from "../utils/date";

let originData = infectedCountData[today] || [];
// 由于数据更新不及时，数据显示昨天的
if (originData.length === 0) {
	originData = infectedCountData[yesterday] || [];
}

console.info(originData,yesterday);
function getCoorDinates(cityName,mapv) {
	let coordinates = geo[cityName] || [];
	if (!coordinates.length) {
		const {lng="", lat=""} = mapv.utilCityCenter.getCenterByCityName(cityName)||{};
		if (!lng) {
			coordinates = ["", ""];
		}else{
			coordinates = [lng, lat];
		}
	}
	return coordinates
}
/**
 * @desc 文字图层data
 * @format [{geometry:{type:'Point',coordinates:[140,99]},text:'武汉【1例】'}]
 * */
export const textData = (mapv) => {
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count||0;
		// 先手动库找到，如果找不到，再去内置库找，真的没有，丢空数组
		// 这里会产生一个默认的坐标，地图上会看一个错误的坐标点
		let coordinates = getCoorDinates(cityName,mapv);
		return {
			geometry: {
				type: 'Point',
				coordinates
			},
			text: `${cityName}【${count}例】`
		};
	});
};

/**
 * @desc 热点图层data
 * @format [{geometry:{type:'Point',coordinates:[140,99]},count:11}]
 */
export const heatMapData = () => {
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count;
		let coordinates = getCoorDinates(cityName,mapv);
		return {
			geometry: {
				type: 'Point',
				coordinates
			},
			count
		};
	});
};

/**
 * @desc 迁徙data
 * @format [{geometry:{type:'Point',coordinates:[140,99]},count:11}]
 */
export const movePointData = function (mapv) {
	let data = [];
	originData.map(item => {
		const cityName = item.name;
		const count = item.count || 0;
		const fromCenter = {lng: geo['湖北'][0], lat: geo['湖北'][1]};
		const  [lng, lat] =getCoorDinates(cityName,mapv)
		let toCenter = {lng, lat};
		const curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);
		curve.map((cur, i) => {
			data.push({
				geometry: {
					type: 'Point',
					coordinates: cur
				},
				count,
				time: i
			});
		});
	});
	return data;
};


/**
 * @desc 迁徙动画
 * */
export const moveLineData = function (mapv) {
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count;
		const fromCenter = {lng: geo['武汉'][0], lat: geo['武汉'][1]};
		const  [lng, lat] =getCoorDinates(cityName,mapv)
		const toCenter = {lng, lat};
		const curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);
		return {
			geometry: {
				type: 'LineString',
				coordinates: curve
			},
			count
		};
	});
};
