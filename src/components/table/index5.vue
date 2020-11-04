<template>
  <a-table
    :columns="columns"
    :dataSource="tabledata"
    :scroll="{ x: 800}"
    :pagination="{
      total:total,
      onChange:onChange
  }"
  >
   <span slot="text" slot-scope="text">
    <a-tooltip placement="left" :title="text">
       <span class="text">{{text.substring(0,10)+'...'}}</span>
    </a-tooltip>
    </span>
    <span slot="images" slot-scope="images">
    <a-tooltip placement="left" :title="images">
       <img :src='images'  class="img"/>
    </a-tooltip>
    </span>
    <span slot="action" slot-scope="text,record"  class="op-box"> 
         <a href="javascript:;" @click="() => details(record,0)" >详情</a>  
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
      details(record,n){
        this.$emit('details',[record,n])
      },
      deltable(record){
        this.$emit('del',record)
      },
      evaluate(record){
        this.$emit('evaluate',record)
      },

  },
  mounted() {
    this.title.forEach((v) => {
      let keys = Object.entries(v);
      if (v.disease_type||v.disease_description) {
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
          scopedSlots: { customRender: 'text' },
        });
      }else if (v.images_url) {
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
          scopedSlots: { customRender: 'images' },
           width:90
        });
      }else{
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
        });
      }
      
    });
    this.columns.push({
      title: "操作",
      key: "action",
      width:80,
      scopedSlots: { customRender: "action" }
    });
  },
  components: {}
};
</script>

<style lang="less" scoped>
.img{
  width:60px;
  height:60px;
}
.text{
  width:100px;
  display:inline-block;
}
.op-box{
  a{
    margin:0 2px;
  }
}
.s0{
color: #F7B500;
background: rgba(247,181,0,0.10);
border: 1px solid rgba(247,181,0,0.40);
border-radius: 2px;
padding:2px 5px;
font-size:14px;
}
.s3{
  color: #6D7278;
background: rgba(109,114,120,0.10);
border: 1px solid rgba(109,114,120,0.40);
}
.s2{
  color:#00BB65;
background: rgba(0,187,101,0.10);
border: 1px solid rgba(0,187,101,0.40);
}
.s5{
color: #0091FF;
background: rgba(0,145,255,0.10);
border: 1px solid rgba(0,145,255,0.40);
}
.s1{
color:#FA6400;
background: rgba(250,100,0,0.10);
border: 1px solid rgba(250,100,0,0.40);
}
.s4{
color:#B97C2A ;
background: rgba(185,124,42,0.10);
border: 1px solid rgba(185,124,42,0.40);
}
</style>