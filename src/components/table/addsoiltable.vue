<template>
  <a-table
    :columns="columns"
    :dataSource="tabledata"
    :pagination="{
      total:total,
      onChange:onChange
  }"
  >
   <span slot="text" slot-scope="text">
    <a-tooltip placement="left" :title="text">
       <span class="text">{{text}}</span>
    </a-tooltip>
    </span>
    <span slot="action" slot-scope="record">
         <a href="javascript:;"class="action"  @click="() => details(record)" >查看详情</a>
         <!-- <a href="javascript:;"class="action"  @click="() => edit(record)" >编辑</a> -->
         <!-- <a href="javascript:;"class="action"  @click="() => del(record)" >删除</a> -->
    </span>
  </a-table>
</template>
<script>
export default {
  name: "tables",
  data() {
    return {
      columns: [],
      cdata: []
    };
  },
  props: {
    title: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return [];
      }
    },
    tabledata: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return [];
      }
    },
    onChange: {
      type: Function,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {}
    },
    total: {
      type: Number,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return 0;
      }
    }
    
  },
  watch: {
    editdata:function(v){
      console.log(v,222)
    }
  },
  methods: {
      details(record){
        this.$emit('details',record)
      },
      edit(record){
        this.$emit('edit',record)
      },del(record){
        this.$emit('del',record)
      }
  },
  mounted() {
    this.title.forEach((v, i) => {
      let keys = Object.entries(v);
      if (v.corp) {
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
          scopedSlots: { customRender: 'text' },
        });
      }else{
         this.columns.push({
        title: keys[0][1],
        dataIndex: keys[0][0],
        key: keys[0][0]
      });
      }
     
    });
    this.columns.push({
      title: "操作",
      key: "action",
      scopedSlots: { customRender: "action" }
    });
  },
  components: {}
};
</script>

<style lang="less" scoped>
.action{
  margin:0 5px;
}
</style>