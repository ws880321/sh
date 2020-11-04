<template>
    <div class="right-bar">
        <slot></slot>
    </div>   
</template>
<style lang="less" scoped>
.right-bar{
    position: fixed;
    right:16px;
    bottom:0;
    top:64px;
    width: 360px;
    z-index: 1000;
    overflow-y:auto;
}
</style>
