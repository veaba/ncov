<!--
@desc 接受数据模块
	广播数据
	新闻
	新增案例-通过审核的
	
	

-->
<template>
		<div :class="'timeline-module ' +(timelineButtonStatus?'active':'')">
				<h2>2029新型肺炎(nCoV)时间轴</h2>
				<b class="close-timeline" @click="onCloseTimeline">X</b>
				<ul class="ul-timeline">
						<li class="li-timeline" v-for="item in timelineData">
								<div class="date">{{item.reportDate}}</div>
								<div class="desc">
										<div class="desc-title">
												<a target="_blank" :href="item.newsUrl" :title="item.desc">{{item.desc}}</a>
										</div>
										<div class="author clear">
												<div class="badge-list">
														<strong class="badge" v-show="item.country">{{item.country}}</strong>
														<strong class="badge" v-show="item.province">{{item.province}}</strong>
														<strong class="badge" v-show="item.city">{{item.city}}</strong>
														<strong class="badge" v-show="item.area">{{item.area}}</strong>
												</div>
												
												<a target="_blank" :href="'https://github.com/'+(item.reporter||'/')">@{{item.reporter}}</a>
										</div>
								</div>
						
						</li>
				</ul>
		
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	
	export default {
		name: "Timeline",
		props: {
			timelineButtonStatus: {
				type: Boolean
			}
		},
		data() {
			return {
				// todo 新消息排在前面
				timelineData: [
					{
						reportDate: "2020年1月29日05:39:11",         // 报告日期，年月日，时分秒自动补0,时间戳
						reporter: "veaba",           // 发起报告的人
						githubName: "veaba",         // *Github 用户ID，也就是users 表的name
						country: "中国",            // *国家
						province: "湖北省",           // *省级市
						city: "武汉",               // 城市
						area: "汉口区",               // 区/县等第三级单位
						desc: "武汉新增1例新型冠状病毒肺炎确诊病例",               // * 描述，可能是个title
						newsUrl: "https://news.sina.cn/gn/2020-01-28/detail-iihnzhha5154337.d.html?wm=3049_0016",            // * 新闻地址
					},
					{
						reportDate: "2020年1月29日05:39:11",         // 报告日期，年月日，时分秒自动补0,时间戳
						reporter: "veaba",           // 发起报告的人
						githubName: "veaba",         // *Github 用户ID，也就是users 表的name
						country: "中国",            // *国家
						province: "湖北省",           // *省级市
						city: "武汉",               // 城市
						area: "汉口区",               // 区/县等第三级单位
						desc: "武汉新增1例新型冠状病毒肺炎确诊病例",               // * 描述，可能是个title
						newsUrl: "https://news.sina.cn/gn/2020-01-28/detail-iihnzhha5154337.d.html?wm=3049_0016",            // * 新闻地址
					},
					{
						reportDate: "2020年1月29日05:39:11",         // 报告日期，年月日，时分秒自动补0,时间戳
						reporter: "veaba",           // 发起报告的人
						githubName: "veaba",         // *Github 用户ID，也就是users 表的name
						country: "中国",            // *国家
						province: "湖北省",           // *省级市
						city: "武汉",               // 城市
						area: "汉口区汉口区汉口区汉口区汉口区汉口区汉口区汉口区",               // 区/县等第三级单位
						desc: "武汉新增1例新型冠状病毒肺炎确诊病例",               // * 描述，可能是个title
						newsUrl: "https://news.sina.cn/gn/2020-01-28/detail-iihnzhha5154337.d.html?wm=3049_0016",            // * 新闻地址
					}
				]
			}
		},
		watch: {
			timelineButtonStatus(val) {
				if (val) {
					emitSocket('timeline', this.reportData);
					onSocket.call(this, 'timeline', this.timelineData)
				}
			}
		},
		// todo  检查必填项
		mounted() {
		
		},
		methods: {
			onCloseTimeline() {
				this.$emit('onShowModule', 'timeline');
			},
		}
	};
</script>

<style scoped lang="scss">
		.timeline-module {
				position: absolute;
				left: -402px;
				top: 1px;
				width: 400px;
				height: calc(100% - 10px);
				background: rgba(0, 0, 0, .6);
				transition: all 0.3s ease-in;
				opacity: 0.66;
				padding: 0 40px;
				
				
				h2 {
						text-align: center;
						color: #4d79f3;
				}
		}
		
		.timeline-module.active {
				left: 0;
				transition: all 0.3s ease-in;
				opacity: 0.66;
		}
		
		.close-timeline {
				cursor: pointer;
				position: absolute;
				right: 20px;
				top: 50%;
				transform: translateX(50%);
				color: #03a9f4;
				width: 24px;
				height: 24px;
				border: 1px solid #03a9f4;
				text-align: center;
				border-radius: 50%;
		}
		
		.ul-timeline {
				color: #fff;
				padding-right: 10px;
				position: relative;
				width: 100%;
				height: calc(100% - 10px);
				overflow-y: auto;
				
				&::-webkit-scrollbar {
						height: 10px;
						-webkit-box-shadow: inset 0 0 6px rgba(221, 69, 119, 0.1);
						background: #021019;
				}
				
				&::-webkit-scrollbar-thumb {
						height: 8px;
						background: #666;
				}
				
				.li-timeline {
						position: relative;
				}
				
				.date {
						position: relative;
						color: #d7d7d7;
						&:before {
								display: block;
								position: absolute;
								content: "";
								left: -37px;
								top: -2px;
								width: 23px;
								height: 23px;
								background: rgba(255, 87, 34, 0.5);
								border-radius: 50%;
						}
						
						&:after {
								position: absolute;
								display: block;
								left: -31px;
								top: 3px;
								content: "";
								width: 12px;
								height: 12px;
								background: #ff5722;
								border-radius: 50%;
						}
				}
				
				
				.desc {
						position: relative;
						font-size: 18px;
						padding-bottom: 20px;
						
						.desc-title {
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								color: #ff5722;
						}
						
						a {
								color: #ff5722;
						}
						
						&:before {
								position: absolute;
								display: block;
								left: -26px;
								top: 0;
								content: "";
								width: 1px;
								height: 100%;
								border-left: 1px solid #ff5722
						}
				}
				
				.author {
						margin-top: 10px;
						text-align: right;
						font-size: 14px;
						
						.badge-list {
								float: left;
								max-width: 80%;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								color: #009688;
						}
						
						.badge {
								display: inline-block;
								font-size: 13px;
								border: 1px solid #009688;
								color: #009688;
								border-radius: 4px;
								padding: 0 5px;
								margin-right: 5px;
						}
						
						a {
								color: powderblue;
								text-decoration: none;
						}
				}
		}
</style>
