<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            //这个click属性是限制div等标签是否能点击的，不是限制buttom标签的  对buttom标签无效
            click: true,
            //是否实时监听 0，1都是不监听  2监听但不包括非手指滑动 3监听包括非手指滑动
            //不定死probeType值，避免不需要时也监听了滚动，减少性能损耗
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            observeDOM: true
        })
        //监听滚动位置
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        })
        }
        //监听上拉加载事件
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
        }
    },
    //封装了一个scrollTo方法 减少了首页代码的复杂性，没那么难读懂 time=300  es6语法 传入一个默认值
    methods: {
        scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>