<template>
  <div class="wrap soli-map">
    <Map :data="mapData" type="pointer" />

    <rightbar>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />全球各国入境航班人员总量

          <a-icon type="ordered-list" @click="showList" />
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
          />全国各国入境人员的发展趋势
        </h3>
        <div class="r-content">
          <LineChart :cdata="data2" v-if="data2" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/建议icon.svg"
            alt=""
          />全球各国入境的人员年龄分布
        </h3>
        <div class="r-content">
          <LineChart :cdata="data3" v-if="data3" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
    </rightbar>
    <!-- <div class="right-wrap">
      <div class="inner">
        <a-card title="全球各国入境航班人员总量" :bordered="false" class="item">
          <div class="chart-wrap">
            <BarChart :cdata="data1" />
          </div>
        </a-card>
        <a-card
          title="全国各国入境人员的发展趋势"
          :bordered="false"
          class="item"
        >
          <div class="chart-wrap">
            <LineChart :cdata="data2" />
          </div>
        </a-card>
        <a-card
          title="全球各国入境的人员年龄分布"
          :bordered="false"
          class="item"
        >
          <div class="chart-wrap">
            <LineChart :cdata="data3" />
          </div>
        </a-card>
      </div>
    </div> -->
    <a-modal v-model="visible" :title="false" :footer="false">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :scroll="{ y: 300 }"
        bordered
      >
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import Map from "../components/map/olmap";
import BarChart from "../components/echarts/bar5";
import LineChart from "../components/echarts/line";
import getData from "../assets/js/xhr/data5";
import rightbar from "../components/rightbar/index.vue";

export default {
  data() {
    return {
      collapsed: false,
      data1: null,
      data2: null,
      data3: null,
      mapData: [],
      visible: false,
      columns: [
        {
          title: "序号",
          dataIndex: "index",
        },
        {
          title: "国家名称",
          dataIndex: "name",
          width: 120,
        },
        {
          title: "人员总量（人）",
          dataIndex: "value",
        },
      ],
      data: [],
    };
  },
  methods: {
    showList() {
      this.visible = true;
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
        legend: Array.from(legend),
        xData: Array.from(xData).sort((a, b) => a - b),
        yData: yData,
      };
    },
  },
  mounted() {
    getData().then((res) => {
      let data = res.data[0].kpiItems;
      this.data = [
        ...data[0].keyValues.map((v, index) => {
          v.index = index + 1;
          return v;
        }),
      ];
      this.mapData = [...data[0].keyValues];
      let legend = ["人员总量", "中转", "直达"];
      let xData = [];
      let yData = legend.map((v) => []);
      data[0].keyValues.map((v) => {
        xData.push(v.name);
        yData[0].push(v.value);
        yData[1].push(0);
        yData[2].push(0);
      });
      let newY = data[0].keyValues;
      this.data1 = { legend: legend, xData: xData, yData: yData };

      //   let legend2 = new Set();
      //   let xData2 = ["", "", "", ""];
      //   data[1].keyValues.map((v, i) => {
      //     legend2.add(v.name);
      //   });

      //   let yData2 = Array.from(legend2).map((v) => []);

      //   Array.from(legend2).forEach((v, i) => {
      //     yData2[i] = data[1].keyValues
      //       .map((k) => {
      //         if (v == k.name) {
      //           return k.value;
      //         }
      //       })
      //       .filter((v) => !!v);
      //   });
      //   this.data2 = {
      //     legend: Array.from(legend2),
      //     xData: xData2,
      //     yData: yData2,
      //   };

      //   let legend3 = new Set();
      //   let xData3 = [
      //     "10",
      //     "20",
      //     "30",
      //     "40",
      //     "50",
      //     "60",
      //     "70",
      //     "80",
      //     "90",
      //     "100",
      //   ];
      //   data[2].keyValues.map((v, i) => {
      //     legend3.add(v.name);
      //   });

      //   let yData3 = Array.from(legend3).map((v) => []);
      //   let length = 0;
      //   Array.from(legend3).forEach((v, i) => {
      //     console.log(v, i);
      //     yData3[i] = [];
      //     data[2].keyValues
      //       .map((k) => {
      //         if (k.name && v == k.name) {
      //           length = k.value.split(",").length;
      //           yData3[i] = k.value.split(",");
      //         }
      //       })
      //       .filter((v) => !!v);
      //   });
      //   this.data3 = {
      //     legend: Array.from(legend3),
      //     xData: xData3.splice(0, length),
      //     yData: yData3,
      //   };
      //   // this.data3 = this.getLineData(data[2]);
      //   // console.log(this.data3);
    });
  },
  components: {
    Map,
    BarChart,
    LineChart,
    rightbar,
  },
};
</script>

<style lang="less"></style>
