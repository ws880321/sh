<template>
	<div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
	// 引入基本模板
	let echarts = require("echarts/lib/echarts");
	// 引入柱状图组件
	require("echarts/lib/chart/gauge");
	require("echarts/lib/component/title.js");
	export default {
		name: "myChart",
		props: {
			title: {
				type: String
			},
			active: {
				type: Boolean
			},
			ddata: {
				type: Object,
				default: () => {
					return {
						"crop_code": "nanjing",
						"name": "分蘖",
						"start_time": "2019-07-28"
					};
				}
			}
		},
		mounted() {
			this.initChart(this.ddata);
		},
		watch: {
			ddata: {
				handler: function(val, oldVal) {
					this.initChart(val);
				},
				deep: true
			},
			active: {
				handler: function(val, oldVal) {
					this.initChart(this.ddata);
				},
				deep: true
			}
		},
		methods: {
			initChart(data) {
				let arr = ['播种', '出苗', '移栽', '返青', '分蘖', '拔节', '幼穗分化', '孕穗', '抽穗', '乳熟', '成熟', '仓储']
				let value = 0
				arr.forEach((v, i) => {
					if (v == data.name) {
						value += i * 10
					}
				});
				//   const cdata = data.map(v => {
				//     return {
				//       name: v.name,
				//       value: v.value
				//     };
				//   });

				this.myChart = echarts.init(this.$refs.myChart);
				var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: 'green' // 0% 处的颜色
					},
					{
						offset: 1,
						color: 'yellow' // 100% 处的颜色
					}
				]);
				var colorSet = [
					[1, color],
					[1, '#15337C']
				];
				var rich = {
					white: {
						fontSize: 50,
						color: '#fff',
						fontWeight: '500',
						padding: [-150, 0, 0, 0]
					},
					bule: {
						fontSize: 120,
						fontFamily: 'DINBold',
						color: '#fff',
						fontWeight: '700',
						padding: [-120, 0, 0, 0],
					},
					radius: {
						width: 350,
						height: 80,
						// lineHeight:80,
						borderWidth: 1,
						borderColor: '#0092F2',
						fontSize: 50,
						color: '#fff',
						backgroundColor: '#1B215B',
						borderRadius: 20,
						textAlign: 'center',
					},
					size: {
						height: 400,
						padding: [100, 0, 0, 0]
					}
				}
				let option = {
					tooltip: {
						formatter: (c) => {
							return c.data.data.name
						}
					},
					toolbox: {
						show: false,
						feature: {
							restore: {},
							saveAsImage: {}
						}
					},
					series: [{
						name: '业务指标',
						type: 'gauge',
						radius: '90%',
						startAngle: 205,
						endAngle: -25,
						clockwise: true,
						min: 0,
						max: 110,
						splitNumber: 11,
						center: ['50%', '50%'],
						pointer: {
							show: true,
							length: '70%',
							width: 10
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(24,144,255,0.4)'
							}
						},
						axisLabel: {
							fontSize: 14,
							color: 'rgba(0,0,0,0.65)',
							distance: 3, //图形与刻度的间距
							formatter: function(value) {
								let arr = ['播种', '出苗', '移栽', '返青', '分蘖', '拔节', '幼穗分化', '孕穗', '抽穗', '乳熟', '成熟', '仓储']
								switch (value) {
									case 0:
										return arr[0];
									case 20:
										return arr[2];
									case 40:
										return arr[4];
									case 70:
										return arr[7];
									case 90:
										return arr[9];
									case 110:
										return arr[11];
								}
								// console.log(parseInt(parseInt(value)/9));
								//    console.log(arr[parseInt(parseInt(value)/9)]);
								// return arr[parseInt(parseInt(value)/10)];
							}
						},
						axisLine: { //刻度的线条
							show: true,
							lineStyle: {
								color: colorSet,
								width: 20,
								shadowBlur: 2,
								// shadowColor: '#B0C4DE',
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								opacity: 1
							}
						},
						detail: {
							show: true,
							formatter: data.name,
							offsetCenter: ['4%', '40%'],
							fontSize: 16,
							color: 'rgba(0,0,0,0.85)',
						},
						title: {
							show: true,
							offsetCenter: ['4%', '60%'],
							color: '#fff',
							fontSize: 14,
							padding: [3, 5, 3, 5],
							backgroundColor: this.active ? '#00BB65' : '#00BB6580',
							borderRadius: 3
						},
						data: [{
							name: data.crop_name,
							value: value,
							data: data
						}]
					}]
				};

				/*setInterval(function () {
				    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
				    myChart.setOption(option, true);
				},2000);*/

				this.myChart.setOption(option);
			}
		}
	};
</script>

<style lang="less" scoped>
	//@import "./../../../assets/css/_letiable.scss";
	.myChart-wrapper {
		width: 80%;
		height: 80%;
		min-height: 150px;
		position: relative;
	}
</style>
