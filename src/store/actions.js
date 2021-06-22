export default {
    addCart(context, payload) {
            //context.state.cartList.push(payload)
            //payload是要新添加的商品
            // let oldProduct = null;
            // for(let item of context.state.cartList) {
            //     if (item.iid === payload.iid){
            //         oldProduct = item;
            //     }
            // }
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct) {
            //oldProduct.count += 1
            context.commit('addCounter', oldProduct)
            resolve('当前商品数量+1')
        } else {
            payload.count = 1
            //state.cartList.push(payload)
            context.commit('addToCart', payload)
            resolve('添加了新的商品')
        }
        })
    }
} 