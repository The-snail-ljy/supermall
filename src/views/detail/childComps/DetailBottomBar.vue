<template>
  <div class="bottom-bar1">
      <span></span>
      <span></span>
      <span class="cart" @click="addToCart">加入购物车</span>

  </div>
</template>

<script>
export default {
    name: "DetailBottomBar",
    methods: {
        addToCart() {
            this.$emit('addToCart')
        }
    }
}
</script>

<style>
.bottom-bar1 {
    display: flex;
    height: 49px;
    background-color: white;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    
}
.bottom-bar1 span {
    flex: 1;
    line-height: 49px;
    text-align: center;
}
.cart {
    background-color: hotpink;
}
</style>