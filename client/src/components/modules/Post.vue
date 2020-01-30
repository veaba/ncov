<!--
@desc 这个页面将收录用户提交的请求
@todo 但需要手动确认才可以，这需要做权限划分
@todo 是更新至，还是新增的病例
-->
<template>
		<div :class="'right-layout post-modules ' +(reportButtonStatus?'active':'')">
				<h2>向 <a href="https://github.com/veaba/ncov" target="_blank">nCov仓库</a> 报告新增病例，收录到库中 </h2>
				<blockquote>
						<strong>注意：</strong>
						请注意，你的报告提交后由管理员人工审核，但你为这份报告的真实性负法律责任。
				</blockquote>
				
				<p>
						<strong>数据：</strong>
				</p>
				<div class="row left-right">
						<div>
								<span class="must-be">确诊：</span>
								<input class="number-input" v-model="reportData.count" type="number" placeholder="确诊数" min="0"
								       max="9999">
						</div>
						<div>
								<span class="must-be">疑似：</span>
								<input class="number-input" v-model="reportData.suspected" type="number" placeholder="疑似数" min="0"
								       max="9999">
						
						</div>
				</div>
				
				<div class="row left-right">
						<div>
								<span class="must-be">治愈：</span>
								<input class="number-input" v-model="reportData.cure" type="number" placeholder="治愈数" min="0"
								       max="9999">
						</div>
						<div>
								<!--本意上这个词应该改为陨落~-->
								<span class="must-be">死亡：</span>
								<input class="number-input" v-model="reportData.dead" type="number" placeholder="死亡数" min="0"
								       max="9999">
						</div>
				</div>
				
				<p>
						<strong>信息：</strong>
				</p>
				<div class="row left-right clear">
						<div>
								<span>姓名：</span>
								<input type="text" v-model="reportData.name" :disabled="isDisabledName" placeholder="姓名">
						</div>
						<div>
								<span>年龄：</span>
								<input class="number-input" v-model="reportData.age" :disabled="isDisabledName" type="number" min="0"
								       max="9999" placeholder="年龄">
						</div>
				
				</div>
				
				<div class="row left-right clear">
						<div style="display: inline-block">
								<span>性别：</span>
								<input type="radio" name="sex" value="1" v-model="reportData.sex">男
								<input type="radio" name="sex" value="-1" v-model="reportData.sex">女
								<input type="radio" name="sex" value="0" v-model="reportData.sex">未知
						</div>
						<div style="float: right;">
								<span style="">身份：</span>
								<input type="radio" name="id" value="1" v-model="reportData.profession">平民
								<input type="radio" name="id" value="2" v-model="reportData.profession">医生
						</div>
				
				</div>
				
				<p>
						<strong>追踪：</strong>
				</p>
				<div class="row left-right clear">
						<div>
								<span class="must-be">国家：</span>
								<input name="country" type="text" v-model="reportData.country" placeholder="必填，国家" maxlength="100">
						</div>
						<div style="float: right;">
								<span class="must-be">省市：</span>
								<input name="province" type="text" v-model="reportData.province" placeholder="必填，省份、州、省级市"
								       maxlength="100">
						</div>
				
				</div>
				<div class="row left-right clear">
						<div>
								<span class="must-be">城市：</span>
								<input name="city" type="text" v-model="reportData.city" placeholder="城市" maxlength="100">
						</div>
						<div style="float: right;">
								<span>县区：</span>
								<input name="area" type="text" v-model="reportData.area" placeholder="县、区" maxlength="100">
						</div>
				
				</div>
				
				<div class="row">
						<span class="must-be">新闻地址：</span>
						<input class="news-input" type="text" v-model="reportData.newsUrl" placeholder="必填，新闻地址" maxlength="100">
				</div>
				<div class="row">
						<span class="must-be">报告时间：</span>
						
						<input class="date-input" type="date" v-model="reportData.reportDate"
						       placeholder="必填，报告日期"
						       name="date_input"
						       id="dateInput"
						       maxlength="100">
				
				</div>
				<div class="row">
						<span class="must-be">描述内容：</span>
						
						<textarea class="textarea-input" rows="3" v-model="reportData.desc"
						          placeholder="必填，描述"
						          name="date_input"
						          maxlength="100"></textarea>
				
				</div>
				<div class="row">
						<span class="must-be">对此负责：</span>
						<label>
								<input v-model="isConfirm" type="checkbox"/>我已确认，将承担可能带来的法律后果
						</label>
				</div>
				<div class="row align-right">
						<button @click="onCloseReportModal">关闭</button>
						<button @click="onSubmitReport" class="primary" :disabled="!isConfirm||isCommitting">提交报告</button>
				</div>
				
				<div v-show="isCommitting" class="ncov-loading post-loading"></div>
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {formatTime} from '../../utils/utils'
	import {getTime} from 'date-fns'
	
	export default {
		props: {
			reportButtonStatus: {
				type: Boolean,
			}
		},
		computed: {
			// 当数据栏目相加起来大于1，则禁止提交年龄、姓名
			isDisabledName() {
				const dataCount = this.reportData.count + this.reportData.suspected + this.reportData.dead + this.reportData.cure;
				return dataCount > 1;
			}
		},
		data() {
			return {
				isConfirm: false,
				isCommitting: false,
				// todo
				reportData:{
					count: Math.floor(Math.random() * 100),
					suspected: Math.floor(Math.random() * 100),
					dead: Math.floor(Math.random() * 100),
					cure: Math.floor(Math.random() * 100),
					name: "",
					age: 1,
					sex: '1',
					profession: '1',
					country: "中国",
					province: "海南",
					city: "三亚",
					area: "",
					newsUrl: "https://www.echartsjs.com/examples/zh/index.html",
					desc: "一则案例报告测试@DSADD",
					reportDate: formatTime(new Date),
				}
			};
		},
		mounted() {
			onSocket.call(this, 'report');//接受报告结果
		},
		methods: {
			// todo 增加关闭动画
			onCloseReportModal() {
				this.reportData.count = 1;
				this.reportData.suspected = 0;
				this.reportData.dead = 0;
				this.reportData.cure = 0;
				this.reportData.name = '';
				this.reportData.sex = '1';
				this.reportData.profession = '1';
				this.reportData.age = 1;
				this.reportData.country = '中国';
				this.reportData.province = '';
				this.reportData.city = '';
				this.reportData.area = '';
				this.reportData.newsUrl = "";
				this.reportData.desc = "";
				this.reportData.reportDate = formatTime(new Date);
				this.isConfirm = false;
				this.$emit('onShowModule', {module: 'report'});
			},
			// 提交报告
			onSubmitReport() {
				// 检查参数
				if (!this.reportData.count && !this.reportData.suspected && !this.reportData.dead && !this.reportData.cure) {
					alert('数据栏，至少填写一项');
					return false;
				}
				
				// 检查追踪-地址
				if (!this.reportData.country && this.reportData.province && this.reportData.city) {
					alert('国家、省、市必填');
					return false;
				}
				// 检查追踪-新闻地址
				if (!this.reportData.newsUrl) {
					alert('新闻地址');
					return false;
				}
				// 检查date时间
				if (!this.reportData.reportDate) {
					alert('请输入2019新型肺炎案例发生的时间');
					return false;
				} else {
					if (getTime(this.reportData.reportDate) > (new Date().getTime())) {
						alert('案例发生的时间不能超过当前时间');
						return false;
					}
				}
				
				// 检查描述
				if (!this.reportData.desc) {
					alert('请输入描述内容');
					return false;
				}
				// 检查box
				if (!this.isConfirm) {
					alert('请勾选确认选项');
					return false;
				}
				this.isCommitting = true;
				emitSocket('report', this.reportData);
			}
		}
	};
</script>

<style lang="scss" scoped>
		.post-loading {
				position: absolute;
		}
		
		.post-modules {
				top: 1px;
				right: -500px;
				padding: 20px;
				background: #fff;
				z-index: 5;
				transition: all 0.3s ease-in;
		}
		
		.post-modules.active {
				right: 0;
				transition: all 0.3s ease-in;
		}
		
		.row {
				color: #666;
				margin-top: 10px;
				
				span {
						position: relative;
						
						&:before {
								display: inline-block;
								content: "*";
								color: #fff;
						}
				}
				
				span.must-be {
						position: relative;
						
						&:before {
								display: inline-block;
								content: "*";
								color: red;
						}
				}
				
				button {
						font-size: 16px;
						margin-right: 24px;
				}
				
				.news-input, .date-input, .textarea-input {
						width: calc(100% - 109px);
				}
				
				.number-input {
						width: 172px;
				}
				
		}
		
		.left-right {
				& > div:nth-of-type(1) {
						display: inline-block;
				}
				
				& > div:nth-of-type(2) {
						width: 50%;
						float: right;
				}
		}
		
		.align-right {
				text-align: right;
		}
		
		.center {
				text-align: center;
		}
</style>
