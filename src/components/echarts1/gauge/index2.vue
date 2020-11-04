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
    title: {
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
        console.log(val)
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
      let option = {
            series: [
              {
                  name: '业务指标',
                  type: 'gauge',
                  startAngle:205,
                  endAngle:-25,
                  clockwise:true,
                  min:0,
                  max:max ,
                  splitNumber:5,
                  center:['50%','45%'],
                  pointer:{
                      show:true,
                      length:'70%',
                      width:2
                  },
                  axisTick:{
                      show:false
                  },
                  splitLine:{
                      show:true,
                      length:13,
                      lineStyle:{
                          color:'rgba(24,144,255,0.4)'
                      }
                  },
                  axisLine:{
                      show:false,
                      lineStyle:{
                          width:10,
                          color:[[1, '#447AD1']],
                      }
                  },
                  title:{
                      show:true,
                      offsetCenter:['4%','90%'],
                      color:'#fff',
                      fontSize:12,
                      padding: [3, 5, 3, 5],
                      backgroundColor:'#00BB65',
                      borderRadius:3
                  },
                  detail: {
                    offsetCenter:['0%','20%'],
                    fontSize:18,
                    // formatter:'{value}%'
                  },
                  data: [data]
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
