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
    <span slot="action" slot-scope="text,record" > 
      <!-- <slot :record="record"> -->
         <a href="javascript:;" @click="() => details(record)" >查看详情</a>  
      <!-- </slot> -->
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
  watch: {},
  methods: {
      details(record){
        this.$emit('details',record)
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
      }else if(v.col_point_code){
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
         sorter: (a, b) => a.col_point_code - b.col_point_code,
        });
      }else if(v.act_date){
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
         sorter: (a, b) => Date.parse(new Date(a.act_date)) - Date.parse(new Date(b.act_date)),
        });
      }else if(v.soil_plot_name){
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
		  sorter:(a,b)=>{
			  return a.soil_plot_name.charCodeAt()-b.soil_plot_name.charCodeAt()
			  }
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
</style>