<template>
  <div class="data-zoom">
    <a
      href="javascript:;"
      class="paly-btn btn"
      @click="play"
      :class="{ stop: state }"
      >播放</a
    >
    <a href="javascript:;" class="prev-btn btn" @click="prev">上一页</a>
    <a href="javascript:;" class="next-btn btn" @click="next">下一页</a>
    <div class="date-box">
      <a
        href="javascript:;"
        class="date-item"
        v-for="(item, index) in dataYears"
        :key="item"
        :class="{ active: index == current }"
        @click="itemClick(index)"
      >
        <span class="icon"></span>
        <span class="text">{{ item }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "date-zoom",
  data() {
    return {
      current: 0,
      timer: 0,
      state: false,
    };
  },

  props: {
    dataYears: {
      type: Array,
      default: function() {
        return [2017];
      },
    },
    currentYear: {
      type: Number,
      default: function() {
        return 0;
      },
    },
  },
  watch: {
    dataYears: {
      handler: function(val, val2) {
        this.$emit("callBack", this.dataYears[this.current]);
      },
      deep: true,
    },
    currentYear: {
      handler: function(val, val2) {
        console.log(val, 12312);
        this.current = val;
      },
      deep: true,
    },
  },
  methods: {
    next() {
      clearInterval(this.timer);
      this.current++;
      if (this.current > this.dataYears.length - 1) {
        this.current = 0;
      }
      this.$emit("callBack", this.dataYears[this.current]);
    },
    itemClick(i) {
      this.current = i;
      this.$emit("callBack", this.dataYears[this.current]);
    },
    prev() {
      clearInterval(this.timer);
      this.current--;
      if (this.current < 0) {
        this.current = this.dataYears.length - 1;
      }
      this.$emit("callBack", this.dataYears[this.current]);
    },
    play() {
      if (!this.state) {
        this.timer = setInterval(() => {
          this.current++;
          if (this.current > this.dataYears.length - 1) {
            this.current = 0;
          }
          this.$emit("callBack", this.dataYears[this.current]);
        }, 3000);
        this.state = true;
      } else {
        clearInterval(this.timer);
        this.state = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.data-zoom {
  position: absolute;
  bottom: 30px;
  height: 64px;
  border-radius: 12px;
  background-color: rgba(17, 34, 46, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0 44px 0 93px;
  left: 34px;
  //   right: 336px;
  right: 436px;
  z-index: 10000;

  .btn {
    position: absolute;
  }
  &.up {
    right: 16px;
  }
  .paly-btn {
    width: 32px;
    height: 32px;
    background: url(../../assets/images/icon-con-play.svg) no-repeat center;
    background-size: contain;
    left: 16px;
    top: 16px;
    text-indent: -9999px;
    &.stop {
      background: url(../../assets/images/icon-con-stop.svg) no-repeat center;
      background-size: cover;
    }
  }
  .prev-btn {
    width: 16px;
    height: 16px;
    background: url(../../assets/images/icon-con-arrow.svg) no-repeat center;
    background-size: cover;
    left: 64px;
    top: 25px;
    text-indent: -9999px;
    transform: rotate(90deg);
  }
  .next-btn {
    width: 16px;
    height: 16px;
    background: url(../../assets/images/icon-con-arrow.svg) no-repeat center;
    background-size: cover;
    right: 24px;
    top: 25px;
    text-indent: -9999px;
    transform: rotate(-90deg);
  }
  .date-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::after {
      display: inline-block;
      content: "";
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      position: absolute;
      height: 1px;
      left: 114px;
      right: 74px;
      top: 31px;
      z-index: 1;
    }
    a {
      display: inline-block;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
      height: 100%;

      .icon {
        display: inline-block;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.09);
        background-color: #9ea5ab;
        // transition: width,height,border 0.3s ease-in-out;
        position: absolute;
        top: 50%;
        margin-top: -5px;
      }
      .text {
        position: absolute;
        bottom: 5px;
        width: 88px;
        height: 12px;
        font-family: Helvetica;
        font-size: 14px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: rgba(255, 255, 255, 0.85);
        text-align: center;
      }
      &.active .icon {
        width: 12px;
        height: 12px;
        margin-top: -6px;
        border: 6px solid rgba(0, 0, 0, 0.15);
        opacity: 0.8;
      }
    }
  }
}
</style>
