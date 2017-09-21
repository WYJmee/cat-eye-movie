/**
 * Created by wangyanjun on 2017/9/17.
 */
const state = {
  movieId:0,
  showOrHidden: true
}
const mutations = {
  saveMsg(state, msg) {
    state.movieId = msg.id
  },
  changeShow(state, show){
    state.showOrHidden = show
  }
}
const actions = {
  saveItem({commit}, msg) {
    commit('saveMsg', msg)
  },
  saveShow({commit}, show){
    commit('changeShow',show)
  }
}


export default {
  state,
  mutations,
  actions
}
