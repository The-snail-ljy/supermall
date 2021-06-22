<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content1" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'
import Toast from '../../components/common/toast/Toast.vue'

import {getDetail, Goods, Shop, GoodsParam} from '../../network/detail'
import {backTopMixin} from '../../common/mixin'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        BackTop,
        Toast,

        Scroll
    },
    mixins: [backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            themeTopYs: [],
            currentIndex: 0,
            message: '',
            show: false
        }
    },
    created() {
        //保存传入的iid
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res => {
            //获取顶部的轮播图片的数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            //console.log(res)
            //获取轮播图下的详情信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //获取店铺的信息
            this.shop = new Shop(data.shopInfo)
            //保存商品的详情数据
            this.detailInfo = data.detailInfo
            //获取详情页参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //获取评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            this.$nextTick(() => {
               
            })
        })
    },
    mounted() {
      
    },
    updated() {
        
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
            this.themeTopYs.push(Number.MAX_VALUE)
        },
        titleClick(index) {
            //console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            //console.log(this.themeTopYs)
        },
        contentScroll(position) {
            //console.log(position)
            const positionY = -position.y
            let length = this.themeTopYs.length
            // for(let i in this.themeTopYs) {
            //     //console.log(i)
            //     i = parseInt(i)
            //     // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
            //     //     console.log(i)
            //     // }
            //     if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] 
            //     && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY > this.themeTopYs[i]))){
            //         console.log(i)
            //         this.currentIndex = i
            //         console.log(this.currentIndex)
            //         this.$refs.nav.currentIndex = this.currentIndex
            //     } 
            // }
            //通过增加一个js里最大的值来减少判断的复杂程度，提高性能
            for(let i = 0; i < length-1; i++){
                if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) { 
                    this.currentIndex = i
                    //console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            this.isShowBackTop = -position.y > 1000
        },
        addToCart() {
            //console.log('---------')
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.newPrice
            product.iid = this.iid
            
            //此处将数据传入vuex  如果外面想知道vuex里做什么  那么在vuex里返回promise对象
            this.$store.dispatch('addCart', product).then(res => {
            //     this.show = true
            //     this.message = res
            //     setTimeout(() => {
            //         this.show = false
            //         this.message = ''
            //     },1500)
            //     console.log(res)
                    this.$toast.show(res, 1500)
                    
             })
            //console.log(this.$store.state.cartList)

        }
    }
}
</script>

<style>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
} 
.content1 {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
.detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
}
</style>