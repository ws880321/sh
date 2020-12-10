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
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
export default {
  components: {},
  props: {
    cdata: {
      default: () => {
        return [{ name: "标签", value: 10 }, { name: "标签1", value: 10 }];
      },
    },
  },
  watch: {
    cdata: function(v) {
      if (v && v.length) {
        setTimeout(() => {
          Object.assign(this.polar, {
            xAxis: {
              data: v.map((k) => k.name),
            },
            series: [
              {
                data: v.map((k) => k.value),
              },
            ],
          });
        }, 0);
      }
    },
  },
  data() {
    return {
      polar: {
        color: ["#73A0FA", "#73DEB3", "#FFB761"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 10,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.cdata.map((v) => v.name),
            axisLabel: {
              rotate: 90,
            },
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "40%",
            data: this.cdata.map((v) => v.value),
          },
        ],
      },
    };
  },
};
</script>
