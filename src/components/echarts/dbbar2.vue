<template>
  <v-chart :options="option" :autoresize="true" />
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
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/polar";
export default {
  components: {},
  props: {
    cdata: {
      default: () => {
        return {
          legend: ["标签", "标签2"],
          xData: [1, 2, 3],
          yData: [
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
          ],
        };
      },
    },
  },
  computed: {
    option: function() {
      let legend = this.cdata ? this.cdata.legend : ["标签", "标签2"];
      let xData = this.cdata ? this.cdata.xData : [1, 2, 3];
      console.log(this.cdata, 999);
      return {
        color: ["#73A0FA", "#73DEB3", "#FFB761"],
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
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
          //图例组件，颜色和名字
          show: true,
          right: 10,
          top: 0,
          data: legend,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true, //坐标轴两边留白
            data: xData,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
              margin: 15,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {},
            axisLine: {
              show: true,
            },
            axisTick: {},
            splitLine: {
              show: true,
              lineStyle: {
                opacity: 1,
              },
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100,
          },
        ],
        series: this.cdata
          ? legend.map((v, i) => {
              return {
                name: v,
                type: "bar",
                data: this.cdata.yData[i],
                barWidth: 10,
                barGap: 0, //柱间距离
                label: {
                  //图形上的文本标签
                  normal: {
                    show: true,
                    position: "top",
                  },
                },
              };
            })
          : [],
      };
    },
  },
  watch: {
    // cdata:function(data){
    //   if(data){
    //         Object.assign(this.option,{
    // 			legend:data.legend,
    //             xAxis:{
    //                data: data.xData
    //             },
    //             series:data.xData.map((v,i)=>{
    // 				return {
    // 					name:v,
    // 					type:'bar',
    // 					data:data.yData[i],
    // 					barWidth: 10,
    // 					barGap:0,//柱间距离
    // 					label: {//图形上的文本标签
    // 						normal: {
    // 						show: true,
    // 						position: 'top',
    // 						},
    // 					},
    // 				}
    // 			})
    //         })
    //   }
    // }
  },
  data() {
    return {
      option2: {},
    };
  },
};
</script>
