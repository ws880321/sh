<template>
  <v-chart :options="polar" :autoresize="true" ref="charts" />
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
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
export default {
  props: {
    cdata: {
      default: () => {
        return [
          { name: "标签", value: 10 },
          { name: "标签1", value: 10 },
        ];
      },
    },
  },
  watch: {
    cdata: function (v) {
      if (v && v.length) {
        setTimeout(() => {
          this.polar.xAxis.data = v.map((k) => k.name);
          this.polar.series[0].data = v.map((k) => k.value);
          // this.$refs.charts.mergeOptions(this.polar)
        }, 0);
      }
    },
  },
  components: {},
  data() {
    return {
      polar: {
        color: ["#73A0FA", "#73DEB3", "#FFB761"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 20,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.cdata.map((v) => v.name),
        },
        yAxis: {
          type: "value",
        },

        series: [
          {
            data: this.cdata.map((v) => v.value),
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: "rgba(0, 0, 0, .3)",
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#00ca95",
              },
            },

            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 1)",
                shadowBlur: 20,
              },
            },
          },
        ],
        animationDuration: 2000,
      },
    };
  },
};
</script>


