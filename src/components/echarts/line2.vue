<template>
  <v-chart :options="polar" :autoresize="true" />
</template>

<style scoped>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/polar";
export default {
  components: {},
  props: {
    cdata: {
      default: () => {
        return {
          legend: ["标签1", "标签2", "标签3"],
          xData: [1, 2, 3],
          yData: [[1, 21, 3], [1, 2, 3], [11, 2, 3]],
        };
      },
    },
  },
  computed: {
    polar: function() {
      let legend = this.cdata ? this.cdata.legend : [];
      let xData = this.cdata ? this.cdata.xData : [];
      return {
        color: ["#73A0FA", "#73DEB3", "#FFB761"],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "10",
          right: "5",
          bottom: "5",
          top: "45",
          containLabel: true,
        },
        legend: {
          data: legend,
          show: true,
          left: 30,
          top: 0,
        },
        xAxis: {
          type: "category",
          data: xData,
          axisLabel: {
            rotate: 45,
            formatter: function(value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              var date = new Date(value);
              var texts = [date.getMonth() + 1, date.getDate()];
              if (index === 0) {
                texts.unshift(date.getYear());
              }
              return texts.join("/");
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 12,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F3F4F4",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: legend
          ? legend.map((v, i) => {
              return {
                name: v,
                type: "line",
                smooth: true,
                data: this.cdata.yData[i],
              };
            })
          : [],
      };
    },
  },
  watch: {},
  data() {
    return {};
  },
};
</script>
