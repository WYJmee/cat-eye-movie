/**
 * Created by wangyanjun on 2017/9/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as actions from './actives'
import header from '../store/modules/header'
import movieitem from "../store/modules/movieitem"

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  modules: {
    header,
    movieitem
  }
})
