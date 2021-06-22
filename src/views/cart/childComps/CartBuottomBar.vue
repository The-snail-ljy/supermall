<template>
  <div class="bottom-bar">
      <div class="check-content">
        <check-button 
        class="check-button" 
        :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算: ({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price.substr(1) * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.$store.state.cartList.length === 0) return false
            //return !(this.$store.state.cartList.filter(item => !item.checked).length)
            return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {//全部选中的时候点击变成全部不选中
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else {//部分或者全部不选中时 点击变成全部选中
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            //console.log(this.$store.state.cartList.find(item => item.checked))
            if(this.$store.state.cartList.find(item => item.checked)
             === undefined) {
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    }
}
</script>

<style>
.bottom-bar {
    display: flex;
    position: relative;

    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
}

.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
}

.price {
    flex: 1;
    margin-left: 30px;
}

.calculate {
    width: 80px;
    color: #fff;
    background-color: red;
    text-align: center;
    
}
</style>