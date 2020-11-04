<template>
    <a-table
            :columns="columns"
            :dataSource="tabledata"
            :pagination="{
      total:total,
      onChange:onChange
  }"
    >
   <span slot="url" slot-scope="url">
    <a-tooltip placement="left">
        <img :src="url" alt="" class="img">
    </a-tooltip>
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
                if (v.url) {
                    this.columns.push({
                        title: keys[0][1],
                        dataIndex: keys[0][0],
                        key: keys[0][0],
                        scopedSlots: { customRender: 'url' },
                    });
                }else{
                    this.columns.push({
                        title: keys[0][1],
                        dataIndex: keys[0][0],
                        key: keys[0][0]
                    });
                }

            });
        },
        components: {}
    };
</script>

<style lang="less" scoped>
    .action{
        margin:0 5px;
    }
    .img{
        width:80px;
        height:80px;
    }
</style>