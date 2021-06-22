export default {
    cartLength() {
        return this.$store.state.cartList.length
    },
    cartList() {
        return this.$store.state.cartList
    }
}