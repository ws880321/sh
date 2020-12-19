<template>
  <div class="wrap soli-map ">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="4" :lg="4" xl="4">
        <a-select class="select-ty" :defaultValue="1" @change="selectChange">
          <a-select-option :value="1">温度</a-select-option>
          <a-select-option :value="2">降水量</a-select-option>
        </a-select>
      </a-col>
      <!-- <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
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
      </a-col> -->
    </a-row>
    <Map :pointers="points" />

    <rightbar>
      <div class="r-box" v-if="type == 1">
        <h3>
          <img src="../assets/images/指标统计icon.svg" alt="" />各个国家温度
        </h3>
        <div class="r-content">
          <bar :cdata="data2" v-if="data2" />
          <!-- <LineArea :cdata="data2" v-if="data2" /> -->
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
          <LineArea :cdata="data1" v-if="data1" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box" v-if="type == 2">
        <h3>
          <img src="../assets/images/建议icon.svg" alt="" />各个国家降水量
        </h3>
        <div class="r-content">
          <bar :cdata="data2" v-if="data2" />
          <!-- <bar :cdata="data4" /> -->
          <!-- <a-result v-else title="暂无数据"></a-result> -->
        </div>
      </div>
      <div class="r-box" v-if="type == 2">
        <h3>
          <img src="../assets/images/建议icon.svg" alt="" />各个国家月度降水量
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
import Map from "../components/map/olmap-pointer";
import LineArea from "../components/echarts/line";
import bar from "../components/echarts/bar3";
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
      points: [],
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
        let x = v.tag;
        xData.add(x);
      });

      let yData = Array.from(legend).map((v) => []);

      Array.from(legend).forEach((v, i) => {
        yData[i] = data.keyValues
          .map((k) => {
            if (v == k.name) {
              return k.value ? k.value : "0";
            }
          })
          .filter((v) => !!v);
      });
      return {
        legend: Array.from(legend).splice(0, 9),
        xData: Array.from(xData),
        yData: yData,
      };
    },
    upData() {
      getData(this.time).then((res) => {
        let data = res.data[0].kpiItems;
        // this.data1 = data[1].keyValues.map((v) => {
        //   v.value = v.value ? v.value : 0;
        //   return v;
        // });

        this.data1 = this.getLineData(data[2]);
        let arr = data[3].keyValues
          .sort((a, b) => b.value - a.value)
          .splice(0, 9);
        this.data2 = arr;
        this.data3 = this.getLineData(data[0]);

        // this.data4 = this.getLineData(data[4]);
        let arr2 = data[1].keyValues
          .sort((a, b) => b.value - a.value)
          .splice(0, 9);
        this.data4 = arr2;
        // this.data4 = data[3].keyValues.map((v) => {
        //   v.value = v.value ? v.value : 0;
        //   return v;
        // });
        // this.points = res.data[0].kpiItems[1].keyValues.map((v) => {
        //   return {
        //     name: v.name,
        //     value: v.value,
        //     point: v.tag ? v.tag.split(",") : [],
        //   };
        // });
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
