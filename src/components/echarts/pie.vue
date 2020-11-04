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
let title = '总量';
let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
let echartData = [{
        name: "A类",
        value: "3720"
    },
    {
        name: "B类",
        value: "2920"
    },
    {
        name: "C类",
        value: "2200"
    },
    {
        name: "D类",
        value: "1420"
    }
];

let formatNumber = function(num) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
}
let total = echartData.reduce((a, b) => {
    return a + b.value * 1
}, 0);

import 'echarts/lib/chart/pie'
import 'echarts/lib/component/polar'
export default {
  components: {
  },
  data () {
    return {
      polar: {
    color: color,
    // tooltip: {
    //     trigger: 'item'
    // },
    title: [{
        text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
        top: 'center',
        left: 'center',
        textStyle: {
            rich: {
                name: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: '#666666',
                    padding: [10, 0]
                },
                val: {
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#333333',
                }
            }
        }
    },{
        text: '单位：个',
        top: 20,
        left: 20,
        textStyle: {
            fontSize: 14,
            color:'#666666',
            fontWeight: 400
        }
    }],
    legend: {
        orient: 'vertical',
        icon: 'rect',
        x: '80%',
        y: 'center',
        itemWidth: 12,
        itemHeight: 12,
        align: 'left',
        textStyle: {
            rich: {
                name: {
                    fontSize: 12
                },
                value: {
                    fontSize: 16,
                    padding: [0, 5, 0, 15]
                },
                unit: {
                    fontSize: 12
                }
            }
        },
        formatter: function(name) {
            let res = echartData.filter(v => v.name === name);
            res = res[0] || {};
            let unit = res.unit || '';
            return '{name|' + name + '}  {value|' + res.value + '}{unit|' + unit + '}'
        }
        // data: legendName
    },
    series: [{
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['50%', '50%'],
        data: echartData,
        hoverAnimation: false,
        itemStyle: {
            normal: {
                borderWidth: 2
            }
        },
        labelLine: {
            normal: {
                length: 20,
                length2: 120,
                lineStyle: {
                    color: '#e6e6e6'
                }
            }
        },
        label: {
            normal: {
                formatter: params => {
                    return (
                        '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '}'
                    );
                },
                padding: [0 , -100, 25, -100],
                rich: {
                    icon: {
                        fontSize: 16
                    },
                    name: {
                        fontSize: 14,
                        padding: [0, 10, 0, 4],
                        color: '#666666'
                    },
                    value: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#333333'
                    }
                }
            }
        },
    }]
}

    }
  }
}
</script>


