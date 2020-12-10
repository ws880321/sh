<template>
  <div class="wrap soli-map ">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="4" :lg="4" xl="4">
        <a-select class="select-ty" @change="selectChange">
          <a-select-option :value="item.value" v-for="(item, index) in jb" :key="index">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
        <a-range-picker class="date-ty" @change="timeChange" />
      </a-col>
    </a-row>
    <Map />
    <rightbar>
      <div class="r-box">
        <h3>
          <img src="../assets/images/指标统计icon.svg" alt="" />各海关截获的确诊人员发展趋势
        </h3>
        <div class="r-content">
          <BarChart :cdata="data1" v-if="data1.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img src="../assets/images/指标变化趋势icon.svg" alt="" />各海关截获的各类疾病总量统计
        </h3>
        <div class="r-content">
          <BarChart :cdata="data2" v-if="data2.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img src="../assets/images/建议icon.svg" alt="" />各海关截获的各类疾病总量统计
        </h3>
        <div class="r-content">
          <LineChart :cdata="data3" v-if="data3.legend.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
    </rightbar>
  </div>
</template>
<script>
  const _ = require("lodash");
  import Map from "../components/map/olmap-pointer.vue";
  import BarChart from "../components/echarts/bar";

  import rightbar from "../components/rightbar/index.vue";
  import LineChart from "../components/echarts/dbbar2";
  import getData from "../assets/js/xhr/data1";
  import { jb, zm } from "../assets/js/xhr/common";
  export default {
    data() {
      return {
        collapsed: false,
        data1: [],
        data2: [],
        data3: {
          legend: ["标签", "标签2"],
          xData: [1, 2, 3],
          yData: [[1, 2, 3], [1, 2, 3], [1, 2, 3]],
        },
        jb: [],
        zm: [],
        jibing: "",
        time: "2020-01-01,2020-12-01",
      };
    },
    methods: {
      selectChange(e) {
        this.upData(e, this.time);
      },
      timeChange(a, e) {
        this.time = e.join();
        this.upData(this.jibing, this.time);
      },
      getBarData(data) {
        let legend = new Set();
        let xData = new Set();
        data.map((v, i) => {
          xData.add(v.tag);
          legend.add(v.name);
        });

        let yData = Array.from(legend).map((v) => []);

        Array.from(legend).forEach((v, i) => {
          yData[i] = Array.from(xData).map((k) => {
            return data.find((l) => {
              return l.tag == k && l.name == v;
            }).value;
          });
        });

        return {
          legend: Array.from(legend),
          xData: Array.from(xData),
          yData: yData,
        };
      },
      upData(jibing, time) {
        getData(jibing, time).then((res) => {
          let data = res.data[0].kpiItems;
          this.data1 = data[0].keyValues.map((v) => {
            v.value = v.value ? v.value : 0;
            return v;
          });
          this.data2 = data[1].keyValues.map((v) => {
            v.value = v.value ? v.value : 0;
            return v;
          });
          let data3 = data[2].keyValues;
          let names = new Set();
          let tags = new Set();
          data3.map((v) => {
            names.add(v.name);
            tags.add(v.tag);
          });

          this.data3 = this.getBarData(data3);
        });
      },
    },
    mounted() {
      jb().then((res) => {
        this.jb = res.data[0].kpiItems[0].keyValues;
      });
      zm().then((res) => {
        this.zm = res.data[0].kpiItems[0].keyValues.map((v) => v.value);
      });

      this.upData(this.jibing, this.time);
    },
    components: {
      Map,
      BarChart,
      LineChart,
      rightbar,
    },
  };
</script>

<style lang="less">
  .wrap {}
</style>