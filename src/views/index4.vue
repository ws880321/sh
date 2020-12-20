<template>
  <div class="wrap soli-map">
    <a-row class="top-panel" :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :md="22" :lg="4" xl="4">
        <a-range-picker class="date-ty" @change="timeChange" />
      </a-col>
    </a-row>
    <Map :data="mapData" />
    <rightbar>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />全球各国入境的航班数量统计
          <a-icon type="ordered-list" @click="showList" />
        </h3>
        <div class="r-content">
          <BarChart :cdata="data1" v-if="data1.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />全球各国入境的航班数量占比
        </h3>
        <div class="r-content">
          <Pie :cdata="data1" v-if="data1.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标变化趋势icon.svg"
            alt=""
          />全球各国入境航班的发展趋势
        </h3>
        <div class="r-content">
          <LineArea :cdata="data2" v-if="data2.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div>
      </div>
      <!-- <div class="r-box">
        <h3>
          <img
            src="../assets/images/建议icon.svg"
            alt=""
          />各海关截获的各类疾病总量统计
        </h3>
       <div class="r-content">
        <LineArea :cdata="data3" v-if="data3.legend.length" />
          <a-result v-else title="暂无数据"></a-result>
        </div> 
      </div> -->
    </rightbar>
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
import BarChart from "../components/echarts/bar2";
import Pie from "../components/echarts/pie1";
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
      mapData: [],
      time: "2020-10-27,2020-10-30",
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
          title: "航班数量（人）",
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
      return {
        legend: Array.from(legend),
        xData: Array.from(xData),
        yData: yData,
      };
    },
    upData(time) {
      getData(time).then((res) => {
        let data = res.data[0].kpiItems;
        this.mapData = [...data[0].keyValues];
        this.data = [
          ...data[0].keyValues.map((v, index) => {
            v.index = index + 1;
            return v;
          }),
        ];
        if (data[0].keyValues.length > 10) {
          this.data1 = data[0].keyValues.splice(0, 9);
        } else {
          this.data1 = data[0].keyValues;
        }

        // this.data2 = this.getLineData(data[1]);
      });
    },
  },
  mounted() {
    this.upData(this.time);
  },
  components: {
    Map,
    BarChart,
    LineArea,
    rightbar,
    Pie,
  },
};
</script>

<style lang="less"></style>
