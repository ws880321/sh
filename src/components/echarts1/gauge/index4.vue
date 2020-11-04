<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/gauge");
require("echarts/lib/component/title.js");
export default {
  name: "myChart",
  props: {
    dw: {
      type: String
    },
    ddata: {
      type: Object,
      default: () => {
        return {
          nanme:'',
          value:''
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
      let max=100
      if (data.value>100) {
        max=Math.floor(data.value*2)
      }else if(data.value<10){
        max=10
      }
      this.myChart = echarts.init(this.$refs.myChart);
      var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: '#2d78f450' // 0% 处的颜色
    },
    {
        offset: 1,
        color: '#2d78f4' // 100% 处的颜色
    }
]);
var colorSet = [
    [1, color],
    [1, '#15337C']
];
var rich = {
    white: {
        fontSize: 50,
        color: '#fff',
        fontWeight: '500',
        padding: [-150, 0, 0, 0]
    },
    bule: {
        fontSize: 120,
        fontFamily: 'DINBold',
        color: '#fff',
        fontWeight: '700',
        padding: [-120, 0, 0, 0],
    },
    radius: {
        width: 350,
        height: 80,
        // lineHeight:80,
        borderWidth: 1,
        borderColor: '#0092F2',
        fontSize: 50,
        color: '#fff',
        backgroundColor: '#1B215B',
        borderRadius: 20,
        textAlign: 'center',
    },
    size: {
        height: 400,
        padding: [100, 0, 0, 0]
    }
}
      let option = {
   		 series: [
   		 	{
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 16, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: { //设置默认刻度盘上的刻度不显示，重新定义刻度盘
                show: false,
                lineStyle: {
                    width: 1,
                    color: [
                        [1, "rgba(255,255,255,0)"]
                    ]
                }
            }, //仪表盘轴线
            axisLabel: { //仪表盘上的数据
                show: true,
                color: "#4d5bd1", //仪表盘上的轴线颜色
                distance: 3, //图形与刻度的间距
                 fontSize:20,
                formatter: function(v) { //刻度轴上的数据相关显示
                    // switch (v + "") {
                    //     case "2":
                    //         return "差";
                    //     case "6":
                    //         return "中";
                    //     case "10":
                    //         return "良";
                    //     case "14":
                    //         return "优";
                    // }
                }
            }, //刻度标签。
            axisTick: {
                show: false,
                splitNumber: 7, //刻度的段落数
                lineStyle: {
                    color: '#fff',
                    width: 1 //刻度的宽度
                },
                length: 10 //刻度的长度
            }, //刻度样式
            splitLine: { //文字和刻度的偏移量
                show: false,
                length: 10, //便宜的长度
                lineStyle: {
                    color: "#447AD1",
                }
            }, //分隔线样式
        },
        {
            type: "gauge", //刻度轴表盘
            // radius: "80%", //刻度盘的大小
            center:['50%','45%'],
            splitNumber: 10, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: { //刻度的线条
                show: true,
                lineStyle: {
                    color: colorSet,
                    width: 5,
                    // shadowBlur: 15,
                    // shadowColor: '#B0C4DE',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1
                }
            },
            //分隔线样式。
            splitLine: { //表盘上的轴线
                show: false
            },
            axisLabel: { //表盘上的刻度数值文字
                show: false
            },
            axisTick: { //表盘上的刻度线
                show: false
            },
            pointer: { //表盘上的指针
                show: true,
                width: "2",
                length: '70%'
            },
            itemStyle:{//表盘指针的颜色
              color:  '#447AD1',
              borderWidth: 5
            },
             title:{
                      show:true,
                      offsetCenter:['4%','90%'],
                      // color:'#fff',
                      fontSize:16,
                      // padding: [3, 5, 3, 5],
                      // backgroundColor:'#00BB65',
                      color: 'rgba(0,0,0,0.45)',
                      borderRadius:3
                  },
                  detail: {
                    offsetCenter:['0%','49%'],
                    fontSize:14,
                    color:'#000000',
                    formatter:'{value}'+this.dw
                  },
            data: [ data]
        },
        {//指针外环
                "type": 'pie',
                "hoverAnimation": false,
                "legendHoverLink": false,
                "radius": ['4%', '10%'],
                center:['51%','44%'],
                "z": 20,
                "label": {
                    "normal": {
                        "show": false
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": false
                    }
                },
                "data": [{
                    "value": 100,
                    itemStyle: {
                        normal: {
                            color: "#447AD1"
                        }
                    }
                }]
            },
            {//指针内环
                "type": 'pie',
                "hoverAnimation": false,
                "legendHoverLink": false,
                "radius": ['0%', '6%'], 
                center:['52%','45%'],
                "z": 10,
                "label": {
                    "normal": {
                        "show": false
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": false
                    }
                },
                "data": [{
                    "value": 100,
                    itemStyle: {
                        normal: {
                            color: "#ffffff"
                        }
                    }
                }]
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
  height: 100%;
  position: relative;
  flex:1;
}
</style>
