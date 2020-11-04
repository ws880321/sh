<template>
  <a-table
    :columns="columns"
    :dataSource="tdata"
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
    <span slot="action" slot-scope="text,record"  class="op-box"> 
      <!-- <slot :record="record"> -->
         <a href="javascript:;" @click="() => edit(record)" >编辑</a>
         <a href="javascript:;" @click="() => deltable(record)" >删除</a>   
         <!--<a href="javascript:;" @click="() => details(record)" >详情</a>-->

      <!-- </slot> -->
    </span>
      <template slot-scope="status" slot="status">
        <span class="s0"  :class="{ s1: status==1, 's2': status==2 , 's3': status==3 , 's4': status==4 , 's5': status==5 }">
         {{(status==1?'未开始':''
          ||status==2?'执行中':''
          ||status==3?'已暂停':''
          ||status==4?'已结束':''
          ||status==5?'未执行':''
          ||status==6?'已取消':''
          ||status==0?'未开始':''
          )}}
        </span>
    </template>
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
  computed: {  
     tdata: function () {  
         var obj={};  
         obj=JSON.parse(JSON.stringify(this.tabledata)); //this.templateData是父组件传递的对象  
         return obj  
    }  
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
    }, cindex:{
          type: String,
          // 对象或数组默认值必须从一个工厂函数获取
          default: function() {
              return '0';
          }
      }
  },
  watch: {
      cindex:function (v) {
          console.log(v,12)
      }
  },
  methods: {
      edit(record){
        this.$emit('edit',[record,this.cindex])
      },
      details(record,n){
        this.$emit('details',[record,this.cindex])
      },
      deltable(record){
        this.$emit('deltable',[record,this.cindex])
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
      }else if (v.status) {
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
          scopedSlots: { customRender: 'status' },
           width:120
        });
      }else{
        this.columns.push({
          title: keys[0][1],
          dataIndex: keys[0][0],
          key: keys[0][0],
          width:200
        });
      }
      
    });
    // this.columns.push({
    //   title: "操作",
    //   key: "action",
    //   width:120,
    //   scopedSlots: { customRender: "action" }
    // });
  },
  components: {}
};
</script>

<style lang="less" scoped>
.text{
  width:200px;
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