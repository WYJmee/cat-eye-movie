/**
 * Created by wangyanjun on 2017/9/12.
 */
import * as types from './mutation-types'

export const transitionEnd = (content, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.addEventListener('webkitTransitionEnd', function () {
      callback && callback()
    })
    obj.addEventListener('transitionEnd', function () {
      callback && callback()
    })
  }
}
export const transitionAgain = ({commit, state}, {obj, modules}) => {
  if (state[modules].index >= state[modules].length) {
    state[modules].index = 0
    commit(types.REMOVE_TRANSITION, {obj})
    commit(types.SET_TRANSLATEY, {obj, offsetY: 0})
  }
}
