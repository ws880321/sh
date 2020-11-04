<template>
  <div class="time-line">
    <span class="play-btn" :class="{'pause':playFlag}" @click="play">播放</span>
    <span class="preve-btn" @click="preveClick">preve</span>
    <ul>
      <li
        v-for="(item,i) in timeData"
        :key="i"
        @click="itemClick(i)"
        :class="{'active':i==current}"
      >
        <span>{{item}}</span>
      </li>
    </ul>
    <span class="next-btn" @click="nextClick">next</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playFlag: false,
      current: 0,
      timer: 0
    };
  },
  props: {
    timeData: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4, 5, 6, 7];
      }
    }
  },
  watch:{
    timeData:function(val) {
        this.$emit('change',val[this.current])
    }
  },
  methods: {
    nextClick() {
      this.current += 1;
      if (this.current >= this.timeData.length) {
        this.current = 0;
      }
      clearInterval(this.timer);
      this.playFlag = false;
      this.$emit('change',this.timeData[this.current])
    },
    preveClick() {
      this.current -= 1;
      clearInterval(this.timer);
      this.playFlag = false;
      if (this.current < 0) {
        this.current = this.timeData.length - 1;
      }
      this.$emit('change',this.timeData[this.current])
    },
    itemClick(i) {
      this.current = i;
      clearInterval(this.timer);
      this.playFlag = false;
      this.$emit('change',this.timeData[this.current])
    },
    play() {
      clearInterval(this.timer);
      this.playFlag = !this.playFlag;
      if (!this.playFlag) {
        clearInterval(this.timer);
        return;
      }
      this.timer = setInterval(() => {
        this.current += 1;
        if (this.current >= this.timeData.length) {
          this.current = 0;
        }
       this.$emit('change',this.timeData[this.current])
      }, 2000);
    }
  }
};
</script>
<style lang="less" scoped>
.time-line {
  height: 70px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  position: absolute;
  bottom: 16px;
  z-index: 1000;
  left: 16px;
  right: 22px;
  align-items: center;
  padding: 0 19px;
  box-sizing: border-box;
  justify-content: space-around;
  > span {
    margin: 0 10px;
    text-indent: -9999px;
  }
  .play-btn {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/暂停按钮.svg) no-repeat center;
    transition: all 0.3s;
    cursor: pointer;
  }
  .pause {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/暂停icon.svg) no-repeat center;
  }
  .preve-btn {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/左侧按钮_默认状态.svg) no-repeat center;
    transition: all 0.3s;
  }
  .preve-btn:hover {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/右侧按钮_选中状态.png) no-repeat center;
    transform: rotate(180deg);
  }
  .next-btn {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/左侧按钮_默认状态.svg) no-repeat center;
    transform: rotate(180deg);
    transition: all 0.3s;
  }
  .preve-btn:hover {
    height: 32px;
    width: 32px;
    background: url(../../assets/images/右侧按钮_选中状态.png) no-repeat center;
  }
  ul {
    display: flex;
    flex: 1;
    position: relative;
    height: 100%;
    margin: 0 10px;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    padding: 0;
    &:after {
      width: 100%;
      content: "";
      height: 1px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 50%;
    }
    li {
      position: relative;
      flex: 1;
      color: #fff;
      list-style: none;
      text-align: center;
      span {
        position: relative;
        top: 18px;
        font-size: 14px;
        color: #ffffff;
      }
      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -4px;
        margin-left: -4px;
        content: "";
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background: #fff;
        transition: all 0.3s;
      }
    }
    li.active,
    li:hover {
      &:after {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 1),
          0 0 0 6px rgba(255, 255, 255, 0.8), 0 0 0 8px rgba(255, 255, 255, 0.6),
          0 0 0 10px rgba(255, 255, 255, 0.4),
          0 0 0 13px rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>


