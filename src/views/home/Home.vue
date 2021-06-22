<template>
    <div id="home" class="wrapper2">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <tab-control class="tab-control"
         v-show="isTabFixed" 
        ref="tabControl1"
        :titals="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
       <scroll class="content" ref="scroll" :probe-type="3" 
       @scroll="contentScroll"
       :pull-up-load="true"
       @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control  ref="tabControl2"
        :titals="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
        <goods-list :goods= "showGoods"></goods-list>
     
       </scroll>

       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/recommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'

import {getHomeMultidata,getHomeGoods} from '../../network/home'
//import {debounce} from '../../common/utils'
import {itemListenerMixin} from '../../common/mixin'

export default {
    name: "Home",
    components: {
       
        HomeSwiper,
        RecommendView,
        FeatureView,    
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    mixins: [itemListenerMixin],
    data(){
        return{
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType : 'pop',
            isShowBackTop: 'false',
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0 ,
            //itemImgListenner: null
        }
    },
    // destroyed() {
    //     console.log('home destroyed')
    // },
    activated() {
        console.log('activated')
         
        this.$refs.scroll.scrollTo(0, this.saveY,0)
        //console.log(this.saveY)
        //需刷新一下  不然会出现返回页面时滚动不了的情况
        this.$refs.scroll.refresh()
    },
    deactivated() {
        //console.log('deactivated')
        //console.log(this.saveY)
        this.saveY = this.$refs.scroll.scroll.y
        
    },
    created() {
        //请求首页导航栏和推荐数据
        this.getHomeMultidata()
        // 请求商品数据 
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        //防抖函数的使用 图片加载完成的事件监听
        // let refresh = debounce(this.$refs.scroll.refresh)
        // this.itemImgListenner = () => {
        //     refresh()
        // }
        // this.$bus.$on('itemImageLoad',this.itemImgListenner)
        // const refresh = debounce(this.$refs.scroll.refresh)
        //   this.$bus.$on('itemImageLoad',() => {
        //    refresh()
        // })
    },
    
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {
       
        //事件监听相关的方法
        tabClick(index){
            switch(index) {
                case 0 :
                    this.currentType = 'pop'
                    //break 防止穿透
                    break
                case 1 :
                    this.currentType = 'new'
                    break
                case 2 :
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        }, 
        backClick() {
            this.$refs.scroll.scrollTo(0,0,500)
        },
        //判断BackTop是否显示
        contentScroll(position) {
            this.isShowBackTop = (-position.y) > 1000
        //判断是否tabControl是否吸顶（position: fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        
        loadMore(){
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
             //获取tabControl的offsetTop
        //所有的组件都有一个属性$el: 用于获取组件中的元素
        //此处直接取出来的元素距顶部的值是不对的，应该监听图片加载完成后再来用offsetTop方法获得距离值
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },


        //网络请求相关的方法
        getHomeMultidata(){
            getHomeMultidata().then(res => {
            //console.log(res);
            //需要将函数里缓存的数据在外部储存起来，不然在函数调用结束的时候缓存的数据会被回收掉
            this.banners = res.data.banner.list,
            this.recommends = res.data.recommend.list
        })
        },
        //getHomeGoods的具体方法逻辑
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            //此处getHomeGoods是到network里请求网络数据
            getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            //加载完成后需要调用finishPullUp方法，不然下一次加载会不成功
            this.$refs.scroll.finishPullUp()
            //加载完后需要刷新一下，因为图片是异步加载的，会影响计算高度导致滚动出bug
            //this.$refs.scroll.refresh()
        })
        }
    }
}
</script>

<style scoped>
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;  在使用浏览器原生滚动时导航栏才使用这个固定定位，
    top: 0px;               而现在使用了局部滚动，不加固定定位也不会影响导航栏的固定
    right: 0px;
    left: 0px; */
    z-index: 9;
}
#home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
}
.tab-control{  
    position: relative; 
    z-index: 9;
} 
.content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
}
/* .fixed { 
    position: fixed;
    top: 44px;
    left: 0px;
    right: 0px;
} */
</style>