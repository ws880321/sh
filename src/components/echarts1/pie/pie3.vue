<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/legendScroll.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    ddata: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
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
      let total=0
      const cdata=data.map(v=>{
        total+=v.counts
        return {
          name:v.level,
          value:v.counts
        }
      })
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
        title: {
          text: total,
          x: "48%",
          y: "35%",
          subtext: '监测指标数',
          textAlign:'center',
          textStyle: {
            fontWeight: "normal",
            color: "#494949",
            fontSize: "18",
            align:'center'
          },
          subtextStyle: {
            fontWeight: "normal",
            color: "#494949",
            fontSize: "12",
            align:'center'
          }
        },
       // color: ["#447AD1","#31B679","#F5BE25","#116AD1","#21B229","#F5B325","#1221D1","#534679","#19BE25"],
        legend: {
          show: false,
          right: "5%",
          top:'center',
          icon: "circle",
          orient: "vertical",
          formatter: name => {
            return [
              "{a|" +
                name +
                "}{b|" +
                (1)+
                "}{c||}{d|" +
                (2) +
                "%}"
            ].join("\n");
          },
          textStyle: {
            rich: {
              a: {
                color: "#494949",
                align: "left",
              },
              b: {
                color: "#494949",
                align: "center",
                width:30,
              },
              c: {
                color: "#494949",
                align: "center",
                width:30,
              },
              d: {
                color: "#494949",
                align: "center",
                width:30,
              }
            }
          }
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["60%", "80%"],
            center:['50%','50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: cdata
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
  min-height: 150px;
  position: relative;
}
</style>
