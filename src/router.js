import Vue from 'vue'
import Router from 'vue-router'
import toastr from '@/libs/toastr'
import decode from "jwt-decode";
import moment from "moment";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,


    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/movie',
            name: 'movie',
            component: () => import('./views/Movie.vue')
        },
        {
            path: '/director',
            name: 'director',
            component: () => import('./views/Director.vue')
        },
        {path: '*', redirect: '/login'}
    ]
})


router.beforeEach((to, from, next) => {

    let loggedIn = localStorage.getItem('token')

    const curr_time = moment().unix();
    if (loggedIn) {
        const decoded = decode(loggedIn);
        if (decoded.exp < curr_time) {
            loggedIn = false
        }
    }


    if (to.fullPath === '/login' && loggedIn) {
        next('/movie');
        console.log("burda++")
    }else if (to.fullPath !== '/login' && !loggedIn){
        next('/login');
        console.log("burda+")
    }else{
        next('/login');
        console.log("burda")
    }

})


export default router
