<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list class="cart-list"></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBuottomBar.vue'

export default {
    name: "Cart",
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        cartLength() {
           return this.$store.state.cartList.length
        } 
    }
}
</script>

<style>
.nav-bar {
    background-color: var(--color-tint);
    color: white;
}
.cart-list {
    background-color: #fff;
}
</style>