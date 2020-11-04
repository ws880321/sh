<template>
    <div class="soli-map">

        <a-select default-value="2020" style="position:absolute;left:230px;top:16px;width: 120px;z-index: 1000;">
            <a-select-option value="2019">2019</a-select-option>
            <a-select-option value="2020">2020</a-select-option>
            <a-select-option value="2021">2021</a-select-option>
        </a-select>
        <div class="map-tips">
            <a-icon type="exclamation-circle" />
            气泡大小仅代表元素值大小！
        </div>
        <mapb />
        <timebar />
        <rightbar>
            <div class="r-box">
                <div class="r-content top-box">
                    <img src="../../assets/images/展位图icon.png" alt="" class="zwt">
                    安徽芜湖试验田
                </div>
            </div>
            <div class="r-box">
                <h3><img src="../../assets/images/指标统计icon.svg" alt="">指标分级统计</h3>
                <div class="r-content">
                    <pie />
                </div>
            </div>
            <div class="r-box">
                <h3><img src="../../assets/images/指标变化趋势icon.svg" alt="">指标变化趋势</h3>
                <div class="r-content">
                    <bar />
                </div>
            </div>
            <div class="r-box">
                <h3><img src="../../assets/images/建议icon.svg" alt="">施肥建议</h3>
                <div class="r-content">
                </div>
            </div>
        </rightbar>
    </div>
</template>

<script>
    import mapb from '../../components/map/soilmap.vue';
    import timebar from '../../components/timebar/index.vue';
    import rightbar from '../../components/rightbar/index.vue';
    import pie from '../../components/echarts/pie/pie2.vue';
    import bar from '../../components/echarts/bar/bar.vue';
    export default {
        name: "login",
        data() {
            return {
                type: 'PH',
                dtime: '',
                dkid: 'a1'
            }
        },
        computed: {

        },
        watch: {

        },
        methods: {


        },
        mounted() {
            this.getSoilElementDic()
            this.getSoilDateAxis()
        },
        components: {
            mapb, timebar, rightbar, pie, bar
        }
    };
</script>

<style lang="less" scoped>
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

        >h3 {
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
</style>