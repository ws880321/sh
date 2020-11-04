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
        console.log(val,33333333);
          this.initChart(val);
      },
      deep: true
    }
  },
  methods: {
    initChart(data) {
      const cdata=data.map(v=>{
        return {
          name:v.name,
          value:v.value
        }
      })
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
        title: {
          text: "82",
          x: "18%",
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
          show: true,
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
            center:['20%','50%'],
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
