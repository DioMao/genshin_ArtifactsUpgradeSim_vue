<template>
  <div class="container404">
    <div class="msg">{{ $t('tips.notFound') }}</div>
    <div class="aniBox">
      <div ref="anicontainer" :class="{jellohorizontal: animation}" @click="animation = true">
        <img src="@/assets/images/genshin_emoji/Icon_Emoji_005_Paimon_Surprised.png" alt="404 not found" draggable="false" />
      </div>
    </div>
    <router-link to="/">
      {{ $t('tips.toHome') }}
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animation: false,
      };
    },
    mounted() {
      // 读取语言
      this.$i18n.locale = this.$store.state.language || 'en';
      this.$refs.anicontainer.addEventListener('animationend', this.anima, false);
    },
    beforeUnmount() {
      this.$refs.anicontainer.removeEventListener('animationend', this.anima, false);
    },
    methods: {
      anima() {
        this.animation = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container404 {
    position: absolute;
    top: 30%;
    width: 100%;
    text-align: center;

    .msg {
      font-size: 1.2rem;
      color: red;
    }

    .aniBox {
      overflow: hidden;
      height: 300px;
      width: 100%;
    }

    .imgBox {
      position: absolute;
    }
  }

  .jellohorizontal {
    -webkit-animation: jello-horizontal 0.9s both;
    animation: jello-horizontal 0.9s both;
  }
</style>
