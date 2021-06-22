import { debounce } from "./utils"

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        let refresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
        //console.log(this.$bus.$on.itemImageLoad)
        //console.log('mixin混入的内容')
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0,0,500)
        },
    }
}