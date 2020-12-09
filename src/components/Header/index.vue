<template>
  <div class="header">
    <div class="user">
      <div class="head-img">
        <img src="../../assets/images/头像icon.png" alt="" />
      </div>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <router-link to="/" tag="a">退出</router-link>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "headers",
  data() {
    return {
      userInfo: "",
    };
  },
  computed: {},
  mounted() {},
  components: {},
};
</script>

<style lang="less" scoped>
.header {
  height: 56px;
  background: #ffffff;
  background-color: #343949;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  justify-content: flex-end;
  width: 100%;

  .user {
    padding: 0 10px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;

    a {
      color: rgba(0, 0, 0, 0.65);
    }

    .head-img {
      padding: 0 10px;
    }
  }
}
</style>
