<!--
@desc 这个页面将收录用户提交的请求
@todo 但需要手动确认才可以，这需要做权限划分
@todo 是更新至，还是新增的病例
-->
<template>
		<div v-show="reportButton.isOpen" class="right-layout post-modules">
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
								<!--本意上这个词应该改为陨落~-->
								<span class="must-be">死亡：</span>
								<input class="number-input" v-model="reportData.dead" type="number" placeholder="死亡数" min="0"
								       max="9999">
						</div>
						<div>
								<span class="must-be">治愈：</span>
								<input class="number-input" v-model="reportData.cure" type="number" placeholder="治愈数" min="0"
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
								<span>城市：</span>
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
						<span class="must-be">对此负责：</span>
						<label>
								<input v-model="isConfirm" type="checkbox" @change="onChangeConfirmBox"/>我已确认，将承担可能带来的法律后果
						</label>
				</div>
				<div class="row align-right">
						<button @click="onCloseReportModal">关闭</button>
						<button @click="onSubmitReport" class="primary" :disabled="!isConfirm">提交报告</button>
				</div>
		</div>
</template>

<script>
	export default {
		props: {
			reportButton: {
				type: Object,
				default() {
					return {
						isOpen: false
					};
				}
			},
			reportData: {
				type: Object,
				default() {
					return {
						count: 0,
						suspected: 0,
						dead: 0,
						cure: 0,
						name: "",
						age: 0,
						country: "",
						province: "",
						area: "",
						city: "",
						newsUrl: "",
						reportDate: ""
					};
				}
			}
		},
		computed: {
			// 当数据栏目相加起来大于1，则禁止提交年龄、姓名
			isDisabledName() {
				const dataCount = this.reportData.count + this.reportData.suspected + this.reportData.dead + this.reportData.cure;
				return dataCount > 1;
			}
		},
		setup() {
			return {
				isConfirm: false,
			};
		},
		methods: {
			onChangeConfirmBox() {
				console.info(this.isConfirm);
			},
			// todo 增加关闭动画
			onCloseReportModal() {
				this.reportButton.isOpen = !this.reportButton.isOpen;
				this.reportData.count = 0;
				this.reportData.suspected = 0;
				this.reportData.dead = 0;
				this.reportData.cure = 0;
				this.reportData.name = '';
				this.reportData.sex = '1';
				this.reportData.profession = '1';
				this.reportData.age = 0;
				this.reportData.country = '';
				this.reportData.province = '';
				this.reportData.city = 0;
				this.reportData.area = 0;
				this.reportData.newsUrl = 0;
				this.reportData.reportDate = 0;
				this.isConfirm = false;
			},
			onChangeReportDate(v) {
				console.info(v);
			},
			// 提交报告
			onSubmitReport() {
				// 检查参数
				
				console.info(666, this.reportData);
				if (!this.reportData.count && !this.reportData.suspected && !this.reportData.dead && !this.reportData.cure) {
					alert('数据栏，至少填写一项');
					return false;
				}
				
				// 检查追踪-地址
				if (!this.reportData.country && this.reportData.province) {
					alert('国家和省市必填');
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
				}
				
				// reporter、nCoV 网站的用户
				console.info(99, this.reportData);
			}
		}
	};
</script>

<style lang="scss" scoped>
		.post-modules {
				top: 1px;
				padding: 20px;
				background: #fff;
				z-index: 2;
		}
		
		.row {
				color: #666;
				margin-top: 10px;
				
				button {
						font-size: 16px;
						margin-right: 24px;
				}
				
				.news-input, .date-input {
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
