/***********************
 * @name JS
 * @author Jo.gel
 * @date 2020/1/20 0020
 ***********************/
import {geo} from "./map_geo";
import {infectedCountData} from "../../public/data";
import {today} from "../utils/date";

/**
 * @desc 文字图层data
 * @format [{geometry:{type:'Point',coordinates:[140,99]},text:'武汉【1例】'}]
 * */
export const textData = () => {
	const originData = infectedCountData[today] || [];
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count;
		const coordinates = geo[cityName] || [];
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
	const originData = infectedCountData[today] || [];
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count;
		const coordinates = geo[cityName] || [];
		return {
			geometry: {
				type: 'Point',
				coordinates
			},
			count: count
		};
	});
};

/**
 * @desc 迁徙data
 * @format [{geometry:{type:'Point',coordinates:[140,99]},count:11}]
 */
export const moveData = () => {
	const originData = infectedCountData[today] || [];
	return originData.map(item => {
		const cityName = item.name;
		const count = item.count;
		const coordinates = geo[cityName] || [];
		return {
			geometry: {
				type: 'Point',
				coordinates
			},
			count: count
		};
	});
};
