/***********************
 * @name mapV 使用的数据集
 * @author veaba
 * @date 2020/1/20 0020
 ***********************/
import {geo, getCenterByCityName} from "./map_geo";

/***/
export function getCoorDinates(cityName) {
	let coordinates = geo[cityName] || [];
	// console.info('coordinates=>',coordinates,cityName);
	if (!coordinates.length) {
		const {lng = "", lat = ""} = getCenterByCityName(cityName) || {};
		if (!lng) {
			coordinates = ["", ""];
			console.info('==>', cityName);
		} else {
			coordinates = [lng, lat];
		}
	}
	return coordinates;
}
