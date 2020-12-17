<template>
  <v-chart :options="polar" :autoresize="true" />
</template>

<style scoped>
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
  props: {
    cdata: {
      default: () => {
        return [{ name: "标签", value: 10 }, { name: "标签1", value: 10 }];
      },
    },
  },
  data() {
    return {
      polar: {
        color: color,
        legend: {
          show: false,
        },
        series: [
          {
            type: "pie",
            // radius: ["45%", "60%"],
            center: ["50%", "50%"],
            data: this.cdata,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
              },
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 20,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  console.log(params);
                  return (
                    "{icon|●}{name|" +
                    params.data.name +
                    "}{value|" +
                    formatNumber(params.percent) +
                    "%}"
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
                    fontSize: 12,
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
