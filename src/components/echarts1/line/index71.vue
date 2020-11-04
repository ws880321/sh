<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
     dw: {
      type: String
    },
    ddata: {
      type: Object,
      default: () => {
        return {
            n:'%',
            x:["2014", "2015", "2016", "2017", "2018", "2019"],
            y:[150, 200, 259, 360, 378, 450, 450]
        };
      }
    }
  },
  mounted() {
       this.initChart(this.ddata);
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
    //   const cdata = data.map(v => {
    //     return {
    //       name: v.name,
    //       value: v.value
    //     };
    //   });
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
        grid: {
          top: "15%",
          left: "10%",
          right: "1%",
          bottom: "2%",
          containLabel: true
        },tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: "category",

            // boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgba(0,0,0,0.1)"
              }
            },
            axisLabel: {
            rotate:30,
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(0,0,0,0.25)",
                margin: 15
              }
            },
            axisTick: {
              show: false
            },
            data: data.x
          }
        ],
        yAxis: [
          {

            name: this.dw?this.dw:data.n,
            verticalAlign:'center',
            nameLocation:'end',
            nameTextStyle: {
                color: "rgba(0,0,0,0.2)",
                fontSize:'12',
                // padding:[-10,0,0,-40]
            },
            type: "value",
            min: 0,
            max: 5,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0,0,0,0.1)"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
            //   margin: 20,
              textStyle: {
                color: "rgba(0,0,0,0.3)"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            // name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbolSize: 1,
            lineStyle: {
              normal: {
                color: "#00bb65" // 线条颜色
              },
              borderColor: "#f0f"
            },
            label: {
              show: false,
            //   position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                color: "#00bb65"
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,187,101,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,187,101,0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0,187,101, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data:data.y
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
