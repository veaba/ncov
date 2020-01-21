# todo开发

基于Vue 3 + 百度地图+Mapv搭建的可视化大屏。

目前vue 3生态未成熟，无法使用高阶技能，因为配置webpack 搞了一天。


## 技术栈/Technical framework

- vue 3.0.0-alpha
- *echarts*
- 百度地图
- mapv
- webpack
- todo AI大数据框架：[Tensorflow](https://tensorflow.google.cn/)


## 结构

### 感染人数入参
```js
const data=[
	{
		count:1,
        geometry:{
        type:'Point',
        coordinates:[lng, lat],
        coordinates_mercator:[13232403.39, 3028540.05]
        }
	}
]
				
```

## API

为外部提供2019-nCoV 数据

直接拉取本站js
https://ncov.datav.ai/data.js，里面暴露DATA对象，也支持es 的export，相减文件
