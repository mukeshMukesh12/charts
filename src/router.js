import Vue from 'vue'
import VueRouter from 'vue-router'
import Line from '@/components/Line'
import Bar from '@/components/Bar'
import Bar1 from '@/components/Bar1'
import Scatter from '@/components/Scatter'
import Pie from '@/components/Pie'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/line', component: Line},
        {path: '/bar', component: Bar},
        {path: '/', component: Bar1},
        {path: '/scatter', component: Scatter},
        {path: '/pie', component: Pie}
    ]
})