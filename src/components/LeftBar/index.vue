<template>
  <div class="left-bar" :class="{ collapsed: collapsed }">
    <h1 class="logo">
     </span><var>全球疫情信息统计平台</var>
    </h1>
    <div class="list-content">
      <happy-scroll color="rgba(51,51,51,0)" size="5">
        <a-menu
          mode="inline"
          theme="dark"
          :inlineCollapsed="collapsed"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          @select="select"
        >
		
		   <a-menu-item key="1">
            <router-link to="/" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>海关截获入境信息</span>	
			</router-link>
          </a-menu-item>

		     <a-menu-item key="2">
            <router-link to="/2" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>各国卫生防疫等级</span>	
			</router-link>
          </a-menu-item>
		     <a-menu-item key="3">
            <router-link to="/3" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>各国基本信息展示</span>	
			</router-link>
          </a-menu-item>
		     <a-menu-item key="4">
            <router-link to="/4" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>入境航班航线信息</span>	
			</router-link>
          </a-menu-item>
		     <a-menu-item key="5">
            <router-link to="/5" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>入境航班人员统计</span>	
			</router-link>
          </a-menu-item>
		       <a-menu-item key="6">
            <router-link to="/6" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>各国疫情现状信息</span>	
			</router-link>
          </a-menu-item>
		       <!-- <a-menu-item key="7">
            <router-link to="/7" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>全球疫情风险等级展示</span>	
			</router-link>
          </a-menu-item>
		       <a-menu-item key="8">
            <router-link to="/8" class="zjli">
			   <span class="icon-n icon-time"></span>
			<span v-if='!collapsed'>邮轮航线入境信息</span>	
			</router-link>
          </a-menu-item> -->
		  
        </a-menu>
      </happy-scroll>
    </div>
    <div class="bottom-bar" @click="toggleCollapsed"></div>
  </div>
</template>
<script>
export default {
  name: "left-bar",
  data() {
    return {
      collapsed: false,
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      current: false,
    };
  },
  watch: {
    "$route.path": function (v) {
      if (v == "/harvestTime") {
        this.current = true;
      } else {
        this.current = false;
      }
      if (v == "/dp") {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
    },
  },
  methods: {
    select(e) {
      console.log(e);
    },
    onOpenChange(openKeys) {
      if (!openKeys) {
        return;
      }
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );

      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
        console.log(this.openKeys, 231);
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        console.log(this.openKeys, 333);
      }
      this.openKeys = [latestOpenKey];
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.rootSubmenuKeys = [];
      this.openKeys = [];
    },
    getRouter() {
      let defaultSelectedKeys = 1;
      let defaultOpenKeys = "";
      this.rootSubmenuKeys = [defaultSelectedKeys];
      this.openKeys = [defaultOpenKeys];
    },
  },
  mounted() {},
  created() {
    this.getRouter();
  },
  components: {},
};
</script>
<style lang="less">
.happy-scroll {
  overflow-y: auto;
}
.happy-scroll-container {
  width: 100% !important;

  .happy-scroll-content {
    width: 100%;
  }
}

.zjli222 ul {
  display: none;
}

.zjli222 div:nth-child(2) {
  display: none;
}
</style>
<style lang="less" scoped>
.zw {
  display: inline-block;
  width: 60px;
}

.activet {
  background-color: #00bb65;
}

.left-bar {
  color: #769bad;
  width: 280px;
  background: #292e3c;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-height: 100vh;
  overflow-y: auto;

  &.collapsed {
    width: 56px;
    font-size: 0;
    overflow: hidden;

    var {
      display: none;
    }
  }

  .logo {
    width: 100%;

      background-color: #343949;
    height: 56px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    span {
      width: 36px;
      height: 36px;
      display: inline-block;
      background: url(../../assets/images/logo2.png) no-repeat center;
      background-size: cover;
      margin: 10px;
    }
  }

  .list-content {
    flex: 1;
    overflow-y: hidden;
  }

  .bottom-bar {
    cursor: pointer;
    height: 28px;
    -webkit-mask-image: url(../../assets/images/展开收起icon.png) no-repeat
      center rgba(0, 0, 0, 0.2);
    background: url(../../assets/images/展开收起icon.png) no-repeat center
      rgba(0, 0, 0, 0.2);
  }

  &.collapsed .bottom-bar {
    background-color: #00bb65;
    fill: #fff;
  }

  .icon-n {
    display: inline-block;
    width: 46px!important;
    height: 100%;
    min-height: 40px;
    background-size: 80% 80%;
    position: relative;
  }

  .zjli {
	display: flex;
	text-align: left;
	padding: 0 !important;
  justify-content: flex-start;

	span{
    width: 200px;
    font-size: 16px;
		display: inline-block;
	}
    a {
      width: 100%;
      display: flex;
      align-items: flex-start;
      color: #fff;
    }
  }

  .icon-z {
    background: url(../../assets/images/智慧土壤icon.svg) no-repeat center;
  }

  .icon-zhjk {
    background: url(../../assets/images/植株健康icon.svg) no-repeat center;
  }

  .icon-bhgl {
    background: url(../../assets/images/病害管理icon.svg) no-repeat center;
  }

  .icon-nsgl {
    background: url(../../assets/images/农事管理icon.svg) no-repeat center;
  }

  .icon-chgl {
    background: url(../../assets/images/虫害管理icon.svg) no-repeat center;
  }

  .icon-time {
    background: url(../../assets/images/最佳收获时间icon.svg) no-repeat center;
  }

  .icon-zsjc {
    background: url(../../assets/images/长势监测icon.svg) no-repeat center;
  }

  .icon-center {
    background: url(../../assets/images/数据资源中心icon.svg) no-repeat center;
  }

  .icon-yhgl {
    background: url(../../assets/images/用户管理icon.svg) no-repeat center;
  }

  .icon-zsjc {
    background: url(../../assets/images/长势预测icon.svg) no-repeat center;
  }

  .icon-timetime {
    background: url(../../assets/images/最佳收货时间icon.svg) no-repeat center;
  }

  .icon-strz {
    background: url(../../assets/images/系统日志icon.svg) no-repeat center;
  }

  .icon-yhgl {
    background: url(../../assets/images/用户管理icon.svg) no-repeat center;
  }

  .icon-sjdp {
    background: url(../../assets/images/数据大屏.svg) no-repeat center;
    transform: scale(1.2);
  }
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item{
  margin:15px 0;
}
</style>

