import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)
Vue.use(HappyScroll)
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')