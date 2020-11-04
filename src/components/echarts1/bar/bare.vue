<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip.js");
require("echarts/lib/component/legend.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    ddata: {
      type: Array,
      default: () => {
        return [{
            date: "2019-08-28",
            tmax: 35,
            tmin: 24,
            apcp: 17.82,
            wind_speed: "4-5级"
          }]
      }
    }
  },
  mounted() {
    this.initChart(this.ddata);
  },
  watch: {
    ddata: {
      handler: function(val, oldVal) {
        this.$nextTick(() => {
          this.initChart(val);
        });
      },
      deep: true
    }
  },
  methods: {
    initChart(data) {
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
        color: ["#31B679"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
            show:true,
          top:"15%",
          left: "3%",
          right: "1%",
          bottom: "10%",
        //   containLabel: true, 
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
            global: true // 缺省为 false
          }
        },
        legend: {
          show: true,
          right: 30,
          top: 10,
          textStyle: {
              fontSize: 12,
              color: "rgba(0,0,0,0.65)",
              lineheight: 22
          },
        },
        xAxis: [
          {
            // type: "category",
            data: data.map(v=>v.date),
            axisLabel:{
                // rotate:45,
                color:'#aeaeae'
            }
          }
        ],
        yAxis: [
          {
            // type: "value",
            axisLabel:{
                color:'#aeaeae'
            },
            axisTick:{
                show:false
            },
            splitLine:{
                lineStyle:{
                    type:'dashed'
                }
            },
            axisLine:{
                show:false
            }
          }
        ],
        series: [
          {
            name: "降雨",
            type: "bar",
            barWidth: "16px",
            data: data.map(v=>v.apcp),
             label: {
                show: true,
                position: 'top'
            },
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
