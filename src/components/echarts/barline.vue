<template>
  <v-chart :options="options" :autoresize="true" />
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
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
export default {
  components: {},
  props: {
    cdata: {
      default: () => {
        return {
          xData: [1, 2],
          yData: [[1, 21, 3], [1, 2, 3], [11, 2, 3], [11, 2, 3]],
        };
      },
    },
  },
  computed: {
    options: function() {
      let yData = this.cdata
        ? this.cdata.yData
        : [[1, 21, 3], [1, 2, 3], [11, 2, 3], [11, 2, 3]];
      return {
        color: ["#73A0FA", "#73DEB3", "#FFB761"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "6%",
          top: 30,
          containLabel: true,
        },
        legend: {
          data: ["死亡人数", "治愈人数", "死亡率", "治愈率"],
        },
        xAxis: [
          {
            type: "category",
            data: this.cdata ? this.cdata.xData : [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            axisLabel: {
              textStyle: {
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
          },
          {
            type: "value",
            min: 0,
            interval: 1,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "死亡人数",
            type: "bar",
            data: yData[0],
          },
          {
            name: "治愈人数",
            type: "bar",
            data: yData[1],
          },
          {
            name: "死亡率",
            type: "line",
            yAxisIndex: 1,
            data: yData[2],
          },
          {
            name: "治愈率",
            type: "line",
            yAxisIndex: 1,
            data: yData[3],
          },
        ],
      };
    },
  },
  data() {
    return {};
  },
};
</script>
