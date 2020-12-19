<template>
  <div class="wrap soli-map ">
    <Map :data="mapData" type="point" />
    <!-- <div class="lebged">
      <div class="item item1">
        <span class="icon"></span>
        <span class="label">5级以上</span>
      </div>
      <div class="item item2">
        <span class="icon"></span>
        <span class="label">4-5级</span>
      </div>
      <div class="item item3">
        <span class="icon"></span>
        <span class="label">3-4级</span>
      </div>
      <div class="item item4">
        <span class="icon"></span>
        <span class="label">2-3级</span>
      </div>
      <div class="item item5">
        <span class="icon"></span>
        <span class="label">1-2级以上</span>
      </div>

      <div class="item item6">
        <span class="icon"></span>
        <span class="label">0-1级以上</span>
      </div>
    </div> -->
  </div>
</template>
<script>
// import Map from "../components/map/indexpointer";

import getData from "../assets/js/xhr/data2";
import Map from "../components/map/olmap";

export default {
  data() {
    return {
      collapsed: false,
      mapData: [],
    };
  },
  mounted() {
    getData().then((res) => {
      if (res.code == 200) {
        this.mapData = res.data[0].kpiItems[0].keyValues.filter((v) => {
          return v.tag && v.tag != "1,1" && v.value;
        });
        console.log(this.mapData);
      }
    });
  },
  components: {
    Map,
  },
};
</script>

<style lang="less" scoped>
.lebged {
  width: 140px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: #ffffff80;
  border-radius: 5px;
  z-index: 10000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .item {
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #f90;
      border-radius: 50%;
    }
    .label {
      display: inline-block;
      width: 75px;
    }
  }
  .item1 .icon {
    width: 35px;
    height: 35px;
  }
  .item2 .icon {
    width: 30px;
    height: 30px;
    margin-left: 3px;
  }
  .item3 .icon {
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
  .item4 .icon {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  .item5 .icon {
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }
  .item6 .icon {
    margin-left: 13px;
  }
}
</style>
