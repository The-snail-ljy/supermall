<template>
<div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
</div>
  
</template>

<script>
export default {
    name : 'NavBar'
}
</script>

<style>
    .nav-bar {
        display: flex;
        line-height: 44px;
        height: 44px;
        text-align: center;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, .1);
    }
    .left,.right {
        width: 20%;
    }
    .center {
        flex: 1;
    }
</style>