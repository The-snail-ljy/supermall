<template>
  <div class="detail-swiper">
      <swiper class="swiper1">
          <swiper-item v-for="item in topImages" class="swiper-item" :key="item.index">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper/index'
export default {
    name: 'DetailSwiper',
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style>
.swiper1 {
    height: 300px;
    overflow: hidden;
}
 
</style>