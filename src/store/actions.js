import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  // actions的传参是context
  addCart (context, payload) {
    // payload新添加的商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid
    )
    // 判断oldPrice
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }

  }
}