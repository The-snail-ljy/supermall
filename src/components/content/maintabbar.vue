<template>
   <tab-bar>
     <tab-bar-item path= '/home' activeColor="red">
       <div slot="item" class="iconfont icon-cangchucangku"><div>首页</div></div>
     </tab-bar-item>
     <tab-bar-item path = '/category' activeColor="red">
       <div slot="item" class="iconfont icon-yingyongchangjing"><div>分类</div></div>
     </tab-bar-item>
     <tab-bar-item path = '/cart' activeColor="red">
       <div slot="item" class="iconfont icon-maijiagouwuche"><div>购物车</div></div>
     </tab-bar-item>
     <tab-bar-item path = '/profile' activeColor="red">
       <div slot="item" class="iconfont icon-user"><div>我的</div></div>
     </tab-bar-item>
   </tab-bar>
</template>

<script>
import TabBar from '../common/tabbar/tabbar.vue';
import TabBarItem from '../common/tabbar/tabbaritem.vue';
export default {
    name : 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>