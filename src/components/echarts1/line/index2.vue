<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    dw: {
      type: String,
      default:'℃'
    },
    ddata: {
      type: Array,
      default: () => {
        return [
          {
            date: "2019-08-28",
            tmax: 35,
            tmin: 24,
            apcp: 17.82,
            wind_speed: "4-5级"
          },
          {
            date: "2019-08-29",
            tmax: 35,
            tmin: 24,
            apcp: 17.82,
            wind_speed: "4-5级"
          }
        ];
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
    }
  },
  methods: {
    initChart(data) {
      //   const cdata = data.map(v => {
      //     return {
      //       name: v.name,
      //       value: v.value
      //     };
      //   });
      let max=Math.max(...data.map(v => v.tmax))+3
      let min=Math.min(...data.map(v => v.tmin))-3
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: '{a0}<br />{b0}:  {c0}'+this.dw+'<br />{a1}<br />{b1}:  {c1}'+this.dw
          formatter:(e)=>{
            let arr=''
            e.forEach((v,i)=>{
                arr+=`<p>${v.seriesName?v.seriesName:''}: ${v.data} ${this.dw}</p>`
            })

            return `<div style="padding:5px;">
                    <p>${e[0].axisValue}</p>
                    ${arr}
              </div>`
          }
        },
        grid: {
          show: true,
          top: "15%",
          left: "5%",
          right: "1%",
          bottom: "30%",
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "rgba(0,212,82,0.10)" // 0% 处的颜色
              },
              {
                offset: 0,
                color: "rgba(255,155,0,0.10)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        // color: ["#EB3E3E", "#447AD1"],
        legend: {
          show: true,
          // data:['日最高温','日最低温'],
          right: 30,
          top: 10,
          borderColor: "#EB3E3E",
          textStyle: {
              fontSize: 12,
              color: "rgba(0,0,0,0.65)",
              lineheight: 22
          },
        },
            xAxis: [
          {
            type: "category",

            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "rgba(0,0,0,0.1)"
              }
            },
            axisLabel: {
              
              rotate:45,
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(0,0,0,0.25)",
                margin: 15
              }
            },
            axisTick: {
              show: false
            },
            data: data.map(v => v.date)
          }
        ],
        yAxis: [
          {
            name: this.dw,
            verticalAlign: "center",
            nameLocation: "end",
            nameTextStyle: {
              color: "rgba(0,0,0,0.25)",
              fontSize: "12",
              padding: [-10, 0, 0, -40]
            },
            type: "value",
            // max: 140,
            max:max,
            min:min,
            // splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0,0,0,0.1)"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              //   margin: 20,
              textStyle: {
                color: "rgba(0,0,0,0.25)"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "日最高温",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            // showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#EB3E3E" // 线条颜色
              },
              borderColor: "#f0f"
            },
            label: {
              show: true,
              //   position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            data: data.map(v => v.tmax)
          },
          {
            name: "日最低温",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#447AD1" // 线条颜色
              },
              borderColor: "#f0f"
            },
            label: {
              show: true,
              //   position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            data: data.map(v => v.tmin)
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
//@import "./../../../assets/css/_letiable.scss";
.myChart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 250px;
  position: relative;
}
</style>
