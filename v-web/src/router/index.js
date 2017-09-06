import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index/index'


import Information from '@/components/information/information'
import Movie from '@/components/movie/movie'
import Login from '@/components/login/login'
import Reg from '@/components/reg/reg'
import MovieMsg from '@/components/movieMsg/movieMsg'
import TheaterChain from '@/components/theaterChain/theaterChain'
import Studio from '@/components/studio/studio'



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
         },
        {
            path: '/reg',
            name: 'reg',
            component: Reg
         },{
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '/movieMsg',
                    name: 'movieMsg',
                    component: MovieMsg
                },
                {
                    path: '/information',
                    name: 'information',
                    component: Information
                },
                {
                    path: '/studio',
                    name: 'studio',
                    component: Studio
                },
                {
                    path: '/movie',
                    name: 'movie',
                    component: Movie
                },
                {
                    path: '/theaterChain',
                    name: 'theaterChain',
                    component: TheaterChain
                }
            ]
      },
  ]
})
