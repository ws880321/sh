<template>
  <div class="wrap soli-map">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
        <a-range-picker class="date-ty" @change="timeChange" />
      </a-col>
    </a-row>
    <Map />
    <rightbar>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />各海关截获的确诊人员总量
        </h3>
        <div class="r-content">
          <BarChart :cdata="data1" v-if="data1.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标变化趋势icon.svg"
            alt=""
          />各海关截获的确诊人员发展趋势
        </h3>
        <div class="r-content">
          <LineArea :cdata="data2" v-if="data2.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/建议icon.svg"
            alt=""
          />各海关截获的各类疾病总量统计
        </h3>
        <!-- <div class="r-content"> -->
        <!-- <LineArea :cdata="data3" v-if="data3.legend.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div> -->
      </div>
    </rightbar>
  </div>
</template>
<script>
import Map from "../components/map/olmap-pointer";
import BarChart from "../components/echarts/bar";
import LineArea from "../components/echarts/line";
import getData from "../assets/js/xhr/data4";
import rightbar from "../components/rightbar/index.vue";

export default {
  data() {
    return {
      collapsed: false,
      data1: [],
      data2: [],
      data3: [],
      time: "2020-10-27,2020-10-30",
    };
  },
  methods: {
    timeChange(a, e) {
      this.time = e.join();
      this.upData(this.time);
    },
    getLineData(data) {
      let legend = new Set();
      let xData = new Set();
      data.keyValues.map((v, i) => {
        legend.add(v.name);
        xData.add(v.tag);
      });

      let yData = Array.from(legend).map((v) => []);

      Array.from(legend).forEach((v, i) => {
        yData[i] = data.keyValues
          .map((k) => {
            if (v == k.name) {
              return k.value;
            }
          })
          .filter((v) => !!v);
      });
      console.log(yData, 222);
      return {
        legend: Array.from(legend),
        xData: Array.from(xData),
        yData: yData,
      };
    },
    upData(time) {
      getData(time).then((res) => {
        let data = res.data[0].kpiItems;

        this.data1 = data[0].keyValues;

        this.data2 = this.getLineData(data[1]);
      });
    },
  },
  mounted() {
    // this.upData(this.time);
  },
  components: {
    Map,
    BarChart,
    LineArea,
    rightbar,
  },
};
</script>

<style lang="less"></style>
