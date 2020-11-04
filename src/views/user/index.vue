<template>
  <div class="soli-wisdom">
    <h2>用户</h2>
    <div class="seletbar">
      <div class="item">
         <span class="item-title">用户姓名</span> 
        <a-input placeholder="请输入"  v-model='listoption.name'/>
      </div>
      <div class="item">
         <span class="item-title">登录用户名</span> 
        <a-input placeholder="请输入"  v-model='listoption.user_name'/>
      </div>
      <div class="item">
         <span class="item-title">手机号</span> 
        <a-input placeholder="请输入"  v-model='listoption.phone'/>
      </div>
      <a-button type="primary" @click="getlogList">查询</a-button>
    </div>
    <div class="soli-table">
	   <a-table
	    :columns="columns"
	    :dataSource="data"
	    :total='total'
	    :pagination="{
		      total:total,
		      onChange:pageChange
		  }"

	  >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="editPwd(record)">修改密码</a>
      </span>
	    <template slot="name" slot-scope="name">
	      {{name.first}} {{name.last}}
	    </template>
	  </a-table>
     <a-modal
      title="修改密码"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form>
         <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input :value="userName" disabled  />
         </a-form-item>
         <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="pwd"/>
         </a-form-item>
  </a-form>
    </a-modal>
    </div>
  </div>
</template>

<script>
import {get,post} from '../../assets/js/http';
  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'name',
    },
    {
      title: '登录用户名',
      dataIndex: 'user_name',
    },{
      title: '手机号',
      dataIndex: 'phone',
    },{
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    }]
export default {
  name: "log",
  computed:{

  },
  data(){
    return {
      columns,
      total:0,
      visible: false,
      confirmLoading: false,
      modal1Visible:false,
      data:[],
      listoption:{
          name:'',
		  api_name:'',
		  api_url:'',
          pageNum:1,
          pageSize:10
        },
      userName:'',
      user_id:'',
      pwd:'',
    }
  },
  methods: {
    editPwd(e){
      console.log(e)
      this.userName=e.user_name
      this.user_id=e.id
      this.role_id=e.role_id?e.role_id:'null'
      this.visible = true;
    },
    handleOk(e) {
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;

        post(`/nybdata/setPwd?user_name=${this.userName}&pwd=${this.pwd}`).then(res=>{
        // post(`/nybdata/putUser?user_id=${this.user_id}&pwd=${this.pwd}&role_id=${this.role_id}`).then(res=>{
          console.log(res)
          if (res.message="重置密码成功") {
              this.$message.success(res.message);
            }else{
              this.$message.error(res.message);
            }
            this.visible = false;
            this.confirmLoading = false;
              
          })
      },
      handleCancel(e) {
        this.visible = false;
      },
    pageChange(v){
      this.listoption.pageNum=v
       this.getlogList(this.listoption)
    },
    getlogList(){
		let params=''
		Object.keys(this.listoption).forEach(v=>{
		params=params+v+'='+this.listoption[v]+'&'
		})
		let arr=params.substring(0,params.length-1)
       get('/nybdata/getUserListPage?'+arr).then(res=>{
       	this.data=res.datas.rs.list
       	this.total=res.datas.rs.total
       })
    },
 

  },
  mounted(){
   this.getlogList()
  },
  components: {
  }
};
</script>
<style lang="less">
.ant-modal-body{
  padding: 16px;
}
.soli-wisdom-modal{
  .ant-modal-footer{
    .ant-btn-default{
      display: none;
    }
  }
}
  .popup-content{
    .popup-item{
      margin-bottom:16px;

      .item-header{
        height:20px;
        line-height: 20px;
        border-left:3px solid #00BB65;
        padding-left:8px;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        margin-bottom:16px;
      }
      .item-body{
        display: flex;
        flex-wrap: wrap;
        .i-info{
          width: 33%;
          margin-bottom:16px;
          color: #262626;
        }
        .i-info2{
          width: 100%;
          margin-bottom:16px;
          color: #262626;
        }
        .icon-item{
          width: 144px;
          height: 78px;
          background: rgba(0,0,0,0.04);
          margin-right:16px;
          margin-bottom:16px;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          justify-content: space-around;
          padding: 16px 0;
          box-sizing: border-box;
          position:relative;
          .icon{
            position:absolute;
            left:0;top:0;
            display: inline-block;
            background: #00BB65;
            color:#fff;
            border-bottom-right-radius:10px;
            padding:1px 3px;
            font-size:12px;
          }
          var{
            font-size: 22px;
            font-style: normal;
          }
           .level1{
            color: #E02020;
          }
          .level2{
            color: #FF8800;
          }
          .level3{
            color: #60B10A;
          }
        }

      }

    }
  }
</style>

<style lang="less" scoped>

.soli-wisdom {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  padding: 24px 16px;
  margin:16px;
  
  overflow-y: auto;
  h2 {
    height: 33px;
    line-height: 33px;
    font-size: 24px;
    color: #212223;
    margin-bottom:16px;
  }
  .seletbar {
    display: flex;
    justify-content: space-between;
    margin-bottom:16px;
    .item {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .item-title{
        width: 80px;
        text-align: right;
        display:inline-block;
        margin-right:10px;
        display:flex;
        flex-wrap: nowrap;
        white-space: nowrap;
      }
      input{
        flex:1
      }
    }
  }
}
</style>
