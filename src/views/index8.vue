<template>
  <div class="wrap soli-map ">
    <Map />

    <rightbar>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标统计icon.svg"
            alt=""
          />全球各国疾病风险等级划分
        </h3>
        <div class="r-content">
          <Bar />
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/指标变化趋势icon.svg"
            alt=""
          />全球各国疾病风险等级趋势
        </h3>
        <div class="r-content">
          <Pie />
        </div>
      </div>
      <div class="r-box">
        <h3>
          <img
            src="../assets/images/建议icon.svg"
            alt=""
          />全球各国风险等级管理条例
        </h3>
        <div class="r-content">
          <LineC />
        </div>
      </div>
    </rightbar>
  </div>
</template>
<script>
import Map from "../components/map/olmap";
import LineC from "../components/echarts/line";
import Pie from "../components/echarts/pie";
import Bar from "../components/echarts/bar";
import rightbar from "../components/rightbar/index.vue";

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Map,
    Bar,
    LineC,
    Pie,
    rightbar,
  },
};
</script>

<style lang="less"></style>
