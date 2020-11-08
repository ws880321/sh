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
let title = "总量";
let color = ["#73A0FA", "#73DEB3", "#FFB761", "#11B711"];
let echartData = [
  {
    name: "A类",
    value: "3720",
  },
  {
    name: "B类",
    value: "2920",
  },
  {
    name: "C类",
    value: "2200",
  },
  {
    name: "D类",
    value: "1420",
  },
];

let formatNumber = function(num) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
let total = echartData.reduce((a, b) => {
  return a + b.value * 1;
}, 0);

import "echarts/lib/chart/pie";
import "echarts/lib/component/polar";
export default {
  components: {},
  data() {
    return {
      polar: {
        color: color,
        legend: {
          //   orient: "vertical",
          icon: "rect",
          x: "5%",
          y: "0",
          itemWidth: 12,
          itemHeight: 12,
          align: "left",
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
              },
              value: {
                fontSize: 16,
                padding: [0, 5, 0, 15],
              },
              unit: {
                fontSize: 12,
              },
            },
          },
          formatter: function(name) {
            let res = echartData.filter((v) => v.name === name);
            res = res[0] || {};
            let unit = res.unit || "";
            return "{name|" + name + "}  {value|" + "}{unit|" + unit + "}";
          },
          // data: legendName
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            center: ["50%", "60%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
              },
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 50,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    "}{value|" +
                    formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -50, 25, -50],
                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 12,
                    padding: [0, 10, 0, 4],
                    color: "#666666",
                  },
                  value: {
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#333333",
                  },
                },
              },
            },
          },
        ],
      },
    };
  },
};
</script>
