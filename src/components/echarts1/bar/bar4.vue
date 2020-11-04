<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    ddata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    // this.initChart();
  },
  watch: {
    ddata: {
      handler: function(val, oldVal) {
        this.$nextTick(() => {
        	console.log(val,99999)
          this.initChart(val);
        });
      },
      deep: true
    }
  },
  methods: {
    initChart(data) {
      this.myChart = echarts.init(this.$refs.myChart);
      let option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '7%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color:['#118FE3','#00D835','#FCDA34','#991A34'],
    xAxis : [{
        type : 'category',
        data :data.x,
        axisTick: {
            show: true,
            alignWithLabel: true
        },
        splitLine: {
            show: false
        },
        axisLine:{
            show:true,
            lineStyle:{
                color:'#708292'
            }
        },
         axisLabel: {
            textStyle: {
               color: '#708292',
             fontSize: '13',
             }
        },
    }],
    yAxis: [{
        min:0,
        type: 'value',
        name: '个',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
               color: '#708292',
             fontSize: '13',
             }
        },
        nameTextStyle: {
            color: '#708292',
            fontSize: '13',
            padding:[0,0,0,-40]
        },
        splitArea: {
            show: false
        },
        axisLine: {
            show:false,
            lineStyle: {
                width: 1
            }
        },
         splitLine: {
            show: true,
            lineStyle: {
                color:  '#213B4D',
                width: 1,
                type: "solid"
            }
        },	
		axisTick: {
			show: false
		},
    }],
    series :data.y.map((v,i)=>{
    	return {
            name:data.z[0].split(',')[i],
            barWidth:'30%',
            type:'bar',
            stack: '1',
            // label: {
            //     show: true,
            //     position: 'center',
            //     color:'#333'
            // },
            data:data.y.map((k,j)=>{
            	return k.split(',')[i]
            })
    	}
    })

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
  min-height: 220px;
  position: relative;
}
</style>
