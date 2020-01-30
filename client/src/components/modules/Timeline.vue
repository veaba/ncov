<!--
@desc 接受数据模块
	广播数据
	新闻
	新增案例-通过审核的
	
-->
<template>
		<div :class="'timeline-module ' +(timelineButtonStatus?'isTimeline':'')+ (newsButtonStatus?' isNews':'')">
				<h2>2019新型肺炎 - {{timelineButtonStatus?"时间轴":""}} {{newsButtonStatus?"新闻消息":""}}</h2>
				<b class="close-timeline" @click="onCloseTimeline">X</b>
				<div class="timeline-content">
						<!--时间轴-->
						<ul class="ul-timeline" v-show="timelineButtonStatus">
								<li class="li-timeline" v-for="item in timelineData">
										<div class="date" v-show="item.reportDate">{{format(item.reportDate)}}</div>
										<div class="date" v-show="item.create_time">{{item.create_time}}</div>
										<div class="desc">
												<div class="desc-title">
														<a target="_blank" :href="item.newsUrl" :title="item.desc">{{item.desc}}</a>
												</div>
												<div class="author clear">
														<div class="badge-list" v-show="item.country||item.province||item.city||item.area">
																<strong class="badge" v-show="item.country">{{item.country}}</strong>
																<strong class="badge" v-show="item.province">{{item.province}}</strong>
																<strong class="badge" v-show="item.city">{{item.city}}</strong>
																<strong class="badge" v-show="item.area">{{item.area}}</strong>
														</div>
														<a v-if="item.channel" :href="item.newsUrl">@{{item.channel}}</a>
														<a v-else target="_blank"
														   :href="'https://github.com/'+(item.reporter||item.githubName||'/')">@{{item.reporter||item.githubName}}</a>
												</div>
										</div>
								
								</li>
						</ul>
						<!--新闻消息-->
						<ul class="ul-timeline" v-show="newsButtonStatus">
								<li class="li-timeline" v-for="item in newsData">
										<div class="date" v-show="item.reportDate">{{format(item.reportDate)}}</div>
										<div class="date" v-show="item.create_time">{{item.create_time}}</div>
										<div class="desc">
												<div class="desc-title">
														<a target="_blank" :href="item.newsUrl" :title="item.desc">{{item.desc}}</a>
												</div>
												<div class="author clear">
														<div class="badge-list" v-show="item.country||item.province||item.city||item.area">
																<strong class="badge" v-show="item.country">{{item.country}}</strong>
																<strong class="badge" v-show="item.province">{{item.province}}</strong>
																<strong class="badge" v-show="item.city">{{item.city}}</strong>
																<strong class="badge" v-show="item.area">{{item.area}}</strong>
														</div>
														<a v-if="item.channel" :href="item.newsUrl">@{{item.channel}}</a>
														<a v-else target="_blank"
														   :href="'https://github.com/'+(item.reporter||item.githubName||'/')">@{{item.reporter||item.githubName}}</a>
												</div>
										</div>
								
								</li>
						</ul>
				</div>
		
		
		</div>
</template>

<script>
	import {formatTime} from '../../utils/utils'
	import {emitSocket, onSocket} from "../../utils/socketIo";
	
	export default {
		name: "Timeline",
		props: {
			timelineButtonStatus: {
				type: Boolean
			},
			newsButtonStatus: {
				type: Boolean
			}
		},
		data() {
			return {
				timelineData: [],
				newsData: []
			}
		},
		watch: {
			timelineButtonStatus(val) {
				if (val) {
					this.getTimeline()
				}
			},
			newsButtonStatus(val) {
				if (val) {
					this.getNews()
				}
			},
		},
		mounted() {
			onSocket.call(this, 'timeline', this.timelineData);
			onSocket.call(this, 'getTimeline', this.timelineData);
			onSocket.call(this, 'news', this.newsData);
			onSocket.call(this, 'getNews', this.newsData);
			this.getTimeline();
			this.getNews()
		},
		methods: {
			format(time) {
				return formatTime(time)
			},
			onCloseTimeline() {
				if (this.timelineButtonStatus) {
					this.$emit('onShowModule', {module: "timeline"});
				}
				if (this.newsButtonStatus) {
					this.$emit('onShowModule', {module: "news"});
				}
				
			},
			// 获取timeline
			getTimeline() {
				emitSocket('getTimeline', {msg: 'getTimeline'});
			},
			// 获取timeline
			getNews() {
				emitSocket('getNews', {msg: 'getNews'});
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
				padding: 0 40px 0 20px;
				z-index: 2;
				
				h2 {
						text-align: center;
						color: #4d79f3;
				}
		}
		
		.timeline-module.isTimeline, .timeline-module.isNews {
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
		
		.timeline-content {
				position: relative;
				width: 100%;
				height: calc(100% - 10px);
				padding-bottom: 100px;
				overflow-y: auto;
		}
		
		.ul-timeline {
				color: #fff;
				padding-right: 10px;
				position: relative;
				width: 100%;
				padding-left: 40px;
				padding-bottom: 40px;
				
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
						font-size: 14px;
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
								font-size: 12px;
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
