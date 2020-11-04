<template>
  <div class="soli-wisdom">
    <h2>土壤样本分析</h2>
    <div class="seletbar">
      <div class="item">
        <span class="item-title">种植作物</span>
        <a-input placeholder="请输入" />
      </div>
      <div class="item">
        <span class="item-title">地块名称</span>
        <a-input placeholder="请输入" />
      </div>
      <div class="item">
        <span class="item-title">采样编号</span>
        <a-input placeholder="请输入" />
      </div>
      <div class="item">
        <span class="item-title">采样时间</span>
        <a-range-picker />
      </div>
      <a-button type="primary">查询</a-button>
    </div>
    <div class="soli-table">
      123
    </div>

  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {}
    },
    created: function () {

    },
    methods: {
    },
    mounted() {

    },
    components: {
    }
  };
</script>
<style lang="less">


</style>