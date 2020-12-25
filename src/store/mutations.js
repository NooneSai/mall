import { ADD_COUNTER, ADD_TO_CART, CHECK_CLICK } from './mutation-types'

export default {
  // mutations的传参是state,payload
  [ADD_COUNTER] (state, payload) {
    // 为了让vuex跟踪
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHECK_CLICK] (state, payload) {
    console.log(123);
    console.log(payload.checked);
    payload.checked = !payload.checked
  }
}