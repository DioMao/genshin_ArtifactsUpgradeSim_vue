<template>
  <div class="score_container">
    <div>{{ $t("msg.entryScore") }}(beta)：{{ ArtifactRate(symbol) }}</div>
    <div class="splitLine"></div>
    <div class="scoreSheetBox">
      <div class="SheetItem" v-for="(entry, index) in currentEntry" :key="'entry' + index">
        <div>
          {{ $t("term." + entry[0]) }}
          <span class="percentShow">{{ entryProgess(entry[0], entry[1]) + "%" }}</span>
        </div>
        <div class="progress_genshin">
          <div class="progress_bar_genshin" :style="{ width: entryProgess(entry[0], entry[1]) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "artifact-score",
    data() {
      return {
        symbol: "",
        score: 0,
        language: "zh",
        currentEntry: [],
      };
    },
    props: {
      rule: {
        type: [String, Array],
        default: "default",
      },
      artifact: {
        default: "",
      },
    },
    mounted() {
      // 读取语言设置
      if (!window.localStorage) {
        alert("浏览器不支持localstorage");
        return false;
      } else if (localStorage.userSetting !== "" && localStorage.userSetting !== undefined) {
        this.language = JSON.parse(localStorage.userSetting).language;
        this.$i18n.locale = JSON.parse(localStorage.userSetting).language;
      } else {
        this.language = this.$store.state.language;
        this.$i18n.locale = this.$store.state.language;
      }
    },
    watch: {
      // 监听属性变化
      artifact(val) {
        if (val !== "" && val !== undefined) {
          this.currentEntry = JSON.parse(val).entry;
          this.symbol = JSON.parse(val).symbol;
        }
      },
    },
    methods: {
      // 圣遗物评分
      ArtifactRate(symbol) {
        return this.$artifact.ArtifactScore(symbol, this.rule).toFixed(2);
      },
      // 进度条
      entryProgess(entry, value) {
        let entryValueList = this.$artiConst.val.entryValue[entry];
        if (entryValueList !== undefined) {
          return Math.floor((value / (entryValueList[entryValueList.length - 1] * 6)) * 100);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .score_container {
    position: relative;
    padding: 0.5rem 1rem;
    background-color: rgb(249, 246, 242);
    border-radius: 0.25rem;
    color: $genshin_dark;
    max-width: 25rem;
    margin: 0 auto;

    &::before {
      content: "";
      pointer-events: none;
      position: absolute;
      inset: 0.25rem;
      border-radius: 0.25rem;
      border: solid 0.125rem rgb(242, 238, 231);
    }
  }

  .splitLine {
    width: 100%;
    margin: 0.25rem 0;
    border-top: solid 0.125rem transparentize($genshin_gray, 0.5);
  }

  .scoreSheetBox {
    font-size: 0.875rem;

    .SheetItem {
      margin-bottom: 0.25rem;

      .percentShow {
        float: right;
        color: $genshin_gold;
      }

      .progress_genshin {
        display: flex;
        height: 0.5rem;
        overflow: hidden;
        font-size: 0.75rem;
        background-color: $genshin_gray;
        border-radius: 1.5rem;
        margin-top: 0.0625rem;

        .progress_bar_genshin {
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          background-color: $genshin_gold;
          transition: width 0.6s ease;
        }
      }
    }
  }
</style>
