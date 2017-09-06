import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import index from './modules/indexstore';
import movieMsg from './modules/moiveMsgstore';
import information from './modules/informationstore';
import movie from './modules/moviestore';
import login from './modules/loginstore';
import studio from './modules/studiostore';
import theaterChain from './modules/theaterChainstore';
import reg from './modules/regstore';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        index,
        movieMsg,
        information,
        studio,
        movie,
        theaterChain,
        reg,
        login
    }
})

  
 export default store

