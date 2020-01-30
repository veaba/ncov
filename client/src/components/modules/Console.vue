<!--
@desc todo 用于标注post 模块、news 模块的真实性录入到Timeline中
@info 同时，支持Python 产生的数据推送过来
@audit 审核模块
-->
<template>
		<div :class="'console-module '+(auditButtonStatus?'active':'')">
				
				<div class="align-center">
						<b class="close-btn" @click="onClickHide">X</b>
				</div>
				
				<div class="audit-list clear align-center">
						<ul class="item" v-for="item in auditList">
								<!--标识-->
								<!--<strong :class="'badge ' +zoomClass(item.country)"> {{isZoom(item.country)}}</strong>-->
								<li>
										{{item.count?'确诊【'+item.count+'】例':""}}
										{{item.cure?'治愈【'+item.cure+'】例':""}}
										{{item.dead?'死亡【'+item.dead+'】例':""}}
										{{item.suspected?'疑似【'+item.suspected+'】例':""}}
								</li>
								
								<li>报告时间：{{format(item.reportDate)}}</li>
								
								<li v-show="item.profession===2">职业/(医生)</li>
								<li>
										发生地点：{{item.country}} > {{item.province}} {{item.city?'>'+item.city:""}}
										{{item.area?'>'+item.area:''}}
								</li>
								<li><a :href="item.newsUrl" target="_blank">消息来源</a></li>
								<div class="audit-btn">
										
										<button style="border: 1px solid #666;color:#333;margin-right: 20px;"
										        @click="onClickCancel(item._id)">驳回
										</button>
										<button @click="onClickApply(item._id)">审核通过</button>
								</div>
						</ul>
				</div>
		</div>
</template>

<script>
	
	import {formatTime} from '../../utils/utils'
	import {zoomMap} from "../../utils/enums"
	import {emitSocket} from "../../utils/socketIo";
	import {axios} from "../../utils/axios";
	
	export default {
		name: "Console",
		props: {
			auditButtonStatus: {
				type: Boolean
			},
			auditList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		watch: {
			auditButtonStatus(val) {
				if (val) {
					this.getAudit()
				}
			}
		},
		data() {
			return {}
		},
		mounted() {
		
		},
		methods: {
			getAudit() {
				emitSocket('getAudit');
			},
			format(time) {
				return formatTime(time)
			},
			// 直接删除
			onClickCancel(_id, ids) {
				emitSocket('auditDelete', {_id, ids});
			},
			// 应用、通过、生效
			onClickApply(_id) {
				emitSocket('apply', {_id});
			},
			onClickHide() {
				this.$emit('onShowModule', {module: "audit"});
				// this.$emit('onClickMapHideAudit', false)
			}
		}
	};
</script>

<style scoped lang="scss">
		.console-module {
				position: absolute;
				left: 5px;
				bottom: -290px;
				width: calc(100% - 10px);
				height: 280px;
				border: 1px solid #03a9f4;
				background: rgba(0, 0, 0, .9);
				z-index: 1;
				transition: all 0.3s ease-in;
				opacity: 0.66;
		}
		
		.console-module.active {
				bottom: 0;
				transition: all 0.3s ease-in;
				opacity: 0.66;
		}
		
		.close-btn {
				cursor: pointer;
				position: absolute;
				top: 10px;
				left: 50%;
				transform: translateY(50%);
				color: #03a9f4;
				width: 24px;
				height: 24px;
				border: 1px solid #03a9f4;
				text-align: center;
				border-radius: 50%;
		}
		
		.audit-list {
				position: relative;
				padding: 0 20px;
				/*
				.badge{
						position: absolute;
						left: 50%;
						background: #000202;
						transform: translate(-33px, 10px);
						top: -26px;
						border: 1px solid #03A9F4;
						width: 60px;
						height: 32px;
						text-align: center;
						line-height: 32px;
				}*/
				.item {
						position: relative;
						display: inline-block;
						background: rgba(0, 0, 0, .6);
						color: #fff;
						border: 1px solid #03A9F4;
						border-radius: 4px;
						padding: 10px;
						line-height: 32px;
						text-align: left;
						
						a {
								color: #03a9f4;
						}
						
						.audit-btn {
								margin-top: 5px;
								text-align: center;
						}
						
						& + .item {
								margin-left: 20px;
						}
				}
		}
</style>
