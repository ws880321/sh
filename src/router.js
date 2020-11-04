import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'index1',
            component: () =>
                import ('./views/index1.vue')
        },
        {
            path: '/2',
            name: 'index2',
            component: () =>
                import ('./views/index2.vue')
        },
        {
            path: '/3',
            name: 'index3',
            component: () =>
                import ('./views/index3.vue')
        },
        {
            path: '/4',
            name: 'index4',
            component: () =>
                import ('./views/index4.vue')
        },
        {
            path: '/5',
            name: 'index5',
            component: () =>
                import ('./views/index5.vue')
        },
        {
            path: '/6',
            name: 'index6',
            component: () =>
                import ('./views/index6.vue')
        },
        {
            path: '/7',
            name: 'index7',
            component: () =>
                import ('./views/index7.vue')
        },
        {
            path: '/8',
            name: 'index8',
            component: () =>
                import ('./views/index8.vue')
        }
    ]
})

export default router;