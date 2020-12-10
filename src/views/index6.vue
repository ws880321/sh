<template>
  <div class="wrap soli-map ">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="4" :lg="4" xl="4">
        <a-select class="select-ty" @change="selectChange">
          <a-select-option
            :value="item"
            v-for="(item, index) in jb"
            :key="index"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
        <a-range-picker class="date-ty" @change="timeChange" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="7" xl="7">
        <a-card style="width: 260px" class="index-panel">
          <div class="item">
            <a-statistic
              title="新增确诊"
              :value="t1"
              :value-style="{ color: '#ff3300' }"
            />
          </div>
          <div class="item">
            <a-statistic
              title="累计确诊"
              :value="t3"
              :value-style="{ color: '#ff3300' }"
            />
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="7" xl="7">
        <a-card style="width: 260px" class="index-panel index-panel2">
          <div class="item">
            <a-statistic
              title="累计治愈"
              :value="t5"
              :value-style="{ color: 'green' }"
            />
          </div>
          <div class="item">
            <a-statistic title="累计死亡" :value="t7" />
          </div>
        </a-card>
      </a-col>
    </a-row>
    <zoom :dataYears="zm" @callBack="zoomchange" />
    <Map />

    <rightbar>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />全球各国新增确诊及累计确诊数量
        </h3>
        <div class="r-content">
          <BarChart :cdata="data1" v-if="data1" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标变化趋势icon.svg"
            alt=""
          />全球各国死亡人数及治愈人数(万人)统计TOP10
        </h3>
        <div class="r-content">
          <LineBarChart :cdata="data2" v-if="data2" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/建议icon.svg"
            alt=""
          />全球各国累计确诊累计发展趋势
        </h3>
        <div class="r-content">
          <LineChart :cdata="data3" v-if="data3" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
    </rightbar>

    <!-- <div class="right-wrap">
      <div class="inner">
        <a-card
          title="全球各国新增确诊及累计确诊数量"
          :bordered="false"
          class="item"
        >
          <div class="chart-wrap">
            <BarChart :cdata="data1" />
          </div>
        </a-card>
        <a-card
          title="全球各国死亡人数及治愈人数(万人)统计TOP10"
          :bordered="false"
          class="item"
        >
          <div class="chart-wrap">
            <LineBarChart :cdata="data2" />
          </div>
        </a-card>
        <a-card
          title="全球各国累计确诊累计发展趋势"
          :bordered="false"
          class="item"
        >
          <div class="chart-wrap">
            <LineChart :cdata="data3" />
          </div>
        </a-card>
      </div>
    </div> -->
  </div>
</template>
<script>
import Map from "../components/map/olmap";
import BarChart from "../components/echarts/dbbar";
import LineChart from "../components/echarts/line2";
import LineBarChart from "../components/echarts/barline";
import zoom from "../components/dazoom/index";
import { jb, d1 } from "../assets/js/xhr/data6";

import { zm } from "../assets/js/xhr/common";
import rightbar from "../components/rightbar/index.vue";
export default {
  data() {
    return {
      t1: 0,
      t2: 0,
      t3: 0,
      t4: 0,
      t5: 0,
      t6: 0,
      t7: 0,
      t8: 0,
      jibing: "",
      data3: null,
      data2: null,
      data1: null,
      jb: [],
      zm: [],
      time: ["", "2021-12-12"],
    };
  },
  methods: {
    selectChange(e) {
      this.upData(e, this.time);
    },
    timeChange(a, e) {
      console.log(e);
      this.time = e;
      this.upData(this.jibing, this.time);
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
        xData: Array.from(xData),
        yData: yData,
      };
    },
    getBArData(data) {
      let legend = ["新增", "累计"];
      let xData = new Set();
      data.keyValues.map((v, i) => {
        xData.add(v.tag);
      });

      let yData = Array.from(legend).map((v) => []);

      Array.from(legend).forEach((v, i) => {
        yData[i] = data.keyValues
          .map((k) => {
            if (v == "新增") {
              return k.value ? k.value : "0";
            } else {
              return k.name;
            }
          })
          .filter((v) => !!v);
      });
      return { legend: legend, xData: Array.from(xData), yData: yData };
    },
    getBarLineData(data) {
      let xData = new Set();
      data.keyValues.map((v, i) => {
        xData.add(v.name);
      });

      let yData = [[], [], [], []];
      data.keyValues
        .map((k) => {
          let arr = k.value.split(",");
          yData[0].push(arr[0]);
          yData[1].push(arr[1]);
          yData[2].push(arr[2]);
          yData[3].push(arr[3]);
        })
        .filter((v) => !!v);
      console.log({ xData: Array.from(xData), yData: yData }, 888);
      return { xData: Array.from(xData), yData: yData };
    },
    upData(jbc, time) {
      getData(jbc, time).then((res) => {
        if (res.code != 200) return;
        let data = res.data[0].kpiItems;
        Object.assign(this, {
          t1: data[3].keyValues[0].value
            ? data[3].keyValues[0].value.toFixed(0)
            : 0,
          t3: data[0].keyValues[0].value.toFixed(0),
          t5: data[2].keyValues[0].value.toFixed(0),
          t7: data[1].keyValues[0].value.toFixed(0),
        });
        this.data1 = this.getBArData(data[4]);
        this.data2 = this.getBarLineData(data[5]);
        this.data3 = this.getLineData(data[6]);
      });
    },
    zoomchange(e) {
      this.time = e + "," + e;
      this.upData(this.jibing, this.time);
    },
  },
  mounted() {
    jb().then((res) => {
      this.jb = res.data;
    });
    d1(this.jibing, ...this.time).then((res) => {
      console.log(res, 2222);
    });
    zm().then((res) => {
      this.zm = res.data[0].kpiItems[0].keyValues.map((v) => v.value);
    });
    // this.upData(this.jibing, this.time);
  },
  components: {
    Map,
    BarChart,
    LineChart,
    zoom,
    LineBarChart,
    rightbar,
  },
};
</script>

<style lang="less"></style>
