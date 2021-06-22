<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item.index">{{item}}</li> -->
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import Scroll from '../../../components/common/scroll/Scroll.vue'
//import {mapGetters} from 'vuex'
import computed from '../../../store/getters'
export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed,
    activated() {
      this.$refs.scroll.refresh()
      //console.log('-------')
    }
    
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>