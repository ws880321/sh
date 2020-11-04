<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    ddata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    // this.initChart();
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
          top:"10%",
          left: "10%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: data.map(v=>v.act_date),
            axisLabel:{
                rotate:45,
                color:'#aeaeae'
            }
          }
        ],
        yAxis: [
          {
            type: "value",
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
            type: "bar",
            barWidth: "16px",
            data: data.map(v=>v.avgVal),
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
  min-height: 220px;
  position: relative;
}
</style>
