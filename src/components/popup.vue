<template>
  <div class="popup-box" :class="isShow ? 'popup-show' : 'popup-hide'" @click="this.isShow = false">
    <div class="popup-text">
      <div class="popup-title">
        <slot name="title">Tips:</slot>
      </div>
      <div class="popup-content">
        <slot name="content">This is default content.</slot>
      </div>
    </div>
    <div class="popup-image" v-if="image !== ''">
      <div class="isNew">{{ $t("tips.new") }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popup",
    data() {
      return {
        isShow: false,
      };
    },
    props: {
      // 图片src
      image: {
        type: String,
        default: "",
      },
      // 是否添加新标签
      new: {
        type: Boolean,
        default: false,
      },
      show: {
        type: Boolean,
        default: false,
      },
      // 展示时间
      timeout: {
        type: Number,
        default: 2000,
      },
    },
    watch: {
      show(val) {
        let that = this;
        this.isShow = val;
        if (val === true) {
          setTimeout(() => {
            that.isShow = false;
          }, that.timeout);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .popup-box {
    overflow: hidden;
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 40%;
    z-index: 30;
    width: 15rem;
    background-color: rgb(245, 242, 238);
    padding: 0.5rem 1rem;
    transition: all 0.5s ease;

    .popup-text {
      max-width: 9rem;
      height: 4rem;
      max-height: 4rem;

      .popup-title {
        white-space: nowrap;
        color: rgb(102, 112, 122);
        font-size: 1rem;
        line-height: 1rem;
        margin: 0.1875rem 0;
      }

      .popup-content {
        font-size: 0.8rem;
        line-height: 0.9rem;
        color: rgb(181, 181, 181);
      }
    }

    .popup-image {
      position: relative;
      height: 4rem;
      width: 4rem;
      background-color: rgb(102, 112, 122);
      border-radius: 0.25rem;
      font-size: 0.75rem;
    }
  }

  .popup-show {
    left: 0;
  }

  .popup-hide {
    left: -15rem;
  }
</style>
