export default  {
    // addCart(state, payload) {
        //     //state.cartList.push(payload)
        //     //payload是要新添加的商品
        //     // let oldProduct = null;
        //     // for(let item of state.cartList) {
        //     //     if (item.iid === payload.iid){
        //     //         oldProduct = item;
        //     //     }
        //     // }
        //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
        //     if(oldProduct) {
        //         oldProduct.count += 1
        //     } else {
        //         payload.count = 1
        //         state.cartList.push(payload)
        //     }
        // }
        addCounter(state, payload) {
            payload.count += 1
        },
        addToCart(state, payload) {
            payload.checked = true
            state.cartList.push(payload)
        }
}