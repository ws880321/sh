<template>
    <v-chart :options="polar" :autoresize="true"/>
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
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/polar'
export default {
  components: {
  },
  data () {
    return {
      polar:{
        tooltip: {
            "trigger": "item"
        },
        radar: [
            {
                indicator: [
                    { text: '指标一' ,max: 100},
                    { text: '指标二' ,max: 100},
                    { text: '指标三' ,max: 100},
                    { text: '指标四' ,max: 100},
                    { text: '指标五' ,max: 100},
                    { text: '指标六' ,max: 100},
                    { text: '指标七' ,max: 100},
                    { text: '指标八' ,max: 100},
                    { text: '指标九' ,max: 100},
                    { text: '指标十' ,max: 100}
                ],
                //shape: 'circle',
                name: {
                    formatter: '【{value}】',
                    textStyle: {
                        color: '#000'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['transparent'],
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#d2d2d4'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                "lineStyle": {
                    "normal": {
                        "color": "#5b9bd5",
                        "width": 2
                    }
                },
                itemStyle: {
                    color: "#5b9bd5",//顶点的颜色
                },
                data: [
                    {
                        value: [80, 60, 70, 60, 60,50, 60, 70, 80, 90],
                        name: '图一',
                        symbolSize: 5,
                        symbol: 'circle',
                    }
                ]
            }
        ]
    } 
    }
  }
}
</script>


