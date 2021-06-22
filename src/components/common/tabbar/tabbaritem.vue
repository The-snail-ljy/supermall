<template>
    <div class="tab-bar-item" @click="itemClick" >
        <div :style="activeStyle"> <slot name="item"></slot></div>
   
    </div>
</template>

<script>
export default {
    name:'tabbaritem',
    props:{
        path: String,
        activeColor: {
            type: String,
            default: 'hotpink'
        }
    },
    data(){
        return {
            //   isActive: true
        }
    },
    //click this icon to change the view
    methods:{
        itemClick(){
          this.$router.push(this.path)
        },
        //  isActive(){
        //     return this.$route.path.indexOf(this.path) !== -1
        // }
    },
    //click this icon to change the icon's color
    computed: {
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
        },
    //bind a active style to contrl the tag style`
        activeStyle(){
            return this.isActive ? {color: this.activeColor} : {}
        }
    }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* align-items: center; */
  padding-top: 2px;
  height: 49px;
}
.iconfont{
    font-size: 16px;
}
::before{
    font-size: 22px;
}
/* .active{
    color: hotpink;
} */

</style>