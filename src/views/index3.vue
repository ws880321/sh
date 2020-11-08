<template>
  <div class="wrap soli-map ">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="4" :lg="4" xl="4">
        <a-select class="select-ty" :defaultValue="1" @change="selectChange">
          <a-select-option :value="1">温度</a-select-option>
          <a-select-option :value="2">湿度</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
        <a-select class="select-ty" :defaultValue="1" @change="timeChange">
          <a-select-option :value="1">1月</a-select-option>
          <a-select-option :value="2">2月</a-select-option>
          <a-select-option :value="3">3月</a-select-option>
          <a-select-option :value="4">4月</a-select-option>
          <a-select-option :value="5">5月</a-select-option>
          <a-select-option :value="6">6月</a-select-option>
          <a-select-option :value="7">7月</a-select-option>
          <a-select-option :value="8">8月</a-select-option>
          <a-select-option :value="9">9月</a-select-option>
          <a-select-option :value="10">10月</a-select-option>
          <a-select-option :value="11">11月</a-select-option>
          <a-select-option :value="12">12月</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <Map />

    <rightbar>
      <div class="r-box" v-if="type == 1">
        <h3>
          <img src="../assets/images/指标统计icon.svg" alt="" />各个国家温度
        </h3>
        <div class="r-content">
          <bar :cdata="data1" v-if="data1.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box" v-if="type == 1">
        <h3>
          <img
            src="../assets/images/指标变化趋势icon.svg"
            alt=""
          />各个国家月度温度
        </h3>
        <div class="r-content">
          <LineArea :cdata="data2" />
          <!-- <a-result v-else title="暂无数据"></a-result> -->
        </div>
      </div>
      <div class="r-box" v-if="type == 2">
        <h3><img src="../assets/images/建议icon.svg" alt="" />各个国家湿度</h3>
        <div class="r-content">
          <bar :cdata="data4" />
          <!-- <a-result v-else title="暂无数据"></a-result> -->
        </div>
      </div>
      <div class="r-box" v-if="type == 2">
        <h3>
          <img src="../assets/images/建议icon.svg" alt="" />各个国家湿度趋势
        </h3>
        <div class="r-content">
          <LineArea :cdata="data3" />
          <!-- <a-result v-else title="暂无数据"></a-result> -->
        </div>
      </div>
    </rightbar>
  </div>
</template>
<script>
import Map from "../components/map/index";
import LineArea from "../components/echarts/line";
import bar from "../components/echarts/bar";
import getData from "../assets/js/xhr/data3";
import rightbar from "../components/rightbar/index.vue";
export default {
  data() {
    return {
      collapsed: false,
      type: 1,
      time: 1,
      data1: [],
      data2: null,
      data3: [],
      data4: [],
    };
  },
  methods: {
    selectChange(e) {
      this.type = e;
    },
    timeChange(a) {
      this.time = a;
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
      return {
        legend: Array.from(legend),
        xData: Array.from(xData).sort((a, b) => a - b),
        yData: yData,
      };
    },
    upData() {
      getData(this.time).then((res) => {
        let data = res.data[0].kpiItems;
        this.data1 = data[1].keyValues.map((v) => {
          v.value = v.value ? v.value : 0;
          return v;
        });
        this.data2 = this.getLineData(data[0]);
        this.data3 = this.getLineData(data[2]);
        this.data4 = data[3].keyValues.map((v) => {
          v.value = v.value ? v.value : 0;
          return v;
        });
        console.log(this.data3);
      });
    },
  },
  mounted() {
    this.upData();
  },
  components: {
    Map,
    LineArea,
    bar,
    rightbar,
  },
};
</script>

<style lang="less"></style>
