<template>
  <div class="app">
    <LeftBar />
    <div class="app-body">
      <Header />
      <div class="router-view-body">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./components/Header";
import LeftBar from "./components/LeftBar";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  computed: {},
  data() {
    return {
      // loginFlag:true
    };
  },
  watch: {
    // $route:function(val){
    //   if (val.name=='login') {
    //     this.loginFlag=false
    //   }else{
    //      this.loginFlag=true
    //   }
    // }
  },
  methods: {
    ...mapMutations(["login"]),
  },
  mounted() {
    console.log(this.loginFlag);
  },
  beforeDestroy() {
    this.loginFlag = true;
  }, //生命周期 - 销毁之前
  components: {
    Header,
    LeftBar,
  },
};
</script>

<style lang="less">
.zwt {
  width: 78px !important;
  height: 46px !important;
}

.ant-modal-footer div {
  display: flex;
  text-align: right;
  justify-content: flex-end;
}

.ant-upload-list-item-actions .anticon-eye-o {
  display: none !important;
}

.app {
  .leaflet-control-attribution a {
    display: none;
  }

  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  // background:#f9fafc;
  .app-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .router-view-body {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background-color: #f9fafc;

      > div {
        background-color: #fff;
      }
    }
  }
}
</style>
<style lang="less">
.soli-map {
  flex: 1;
  display: flex;
  max-height: 100%;
  position: relative;
}

.r-box {
  padding: 10px;
  background: #fff;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;

  > h3 {
    display: flex;
    font-size: 14px;
    color: #000000;
    font-weight: normal;
    align-items: center;

    img {
      margin-right: 8px;
    }
  }

  .txt {
    padding: 0 16px;
  }
}

.top-box {
  font-size: 18px;
  color: #333333;

  img {
    margin-right: 10px;
    width: 78px;
    height: 46px;
  }
}
</style>
<style lang="less">
.top-box {
  font-size: 18px;
  color: #333333;

  img {
    margin-right: 10px;
    width: 78px;
    height: 46px;
  }
}

.soli-map-select {
  position: absolute;
  z-index: 1000;
  top: 16px;
  left: 16px;
  width: 200px;
}

.map-tips {
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 1000;
  color: #fff;
}
.select-ty {
  width: 120px;
}
.top-panel {
  left: 20px;
  top: 20px;
  right: 400px;
  z-index: 1000;
  position: absolute !important;
}
.index-panel {
  // position: absolute;
  // left: 560px;
  // top:20px;
  z-index: 10000;
  display: flex;
  .ant-card-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .item {
      flex: 1;
      > p {
        font-size: 12px;
        text-indent: 5px;
      }
    }
  }
}
.r-content {
  height: 200px;
}
</style>
