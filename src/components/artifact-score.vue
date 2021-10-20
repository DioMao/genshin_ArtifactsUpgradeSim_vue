<template>
  <div class="score_container">
    <div>{{ $t("msg.entryScore") }}(beta)：{{ ArtifactRate(symbol) }}</div>
    <div class="splitLine"></div>
    <div class="scoreSheetBox">
      <div class="SheetItem" v-for="(entry, index) in currentEntry" :key="'entry' + index">
        <div class="sheetTitle">
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
  import { getCurrentInstance, ref, watch } from "vue";
  // import { useStore } from "vuex";

  export default {
    name: "artifact-score",
    props: {
      rule: {
        type: [String, Array],
        default: "default",
      },
      artifact: {
        default: "",
      },
    },
    setup(props) {
      // 获取全局函数
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      // const store = useStore().state;
      const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;

      const language = ref("");
      const currentEntry = ref([]);
      const symbol = ref("");

      watch(
        () => props.artifact,
        val => {
          if (val !== "" && val !== undefined) {
            currentEntry.value = JSON.parse(val).entry;
            symbol.value = JSON.parse(val).symbol;
          }
        }
      );

      // 圣遗物评分
      const ArtifactRate = symbol => {
        return artifactFunc.ArtifactScore(symbol, props.rule).toFixed(2);
      };
      // 进度条
      const entryProgess = (entry, value) => {
        let entryValueList = artiConst.entryValue[entry];
        if (entryValueList !== undefined) {
          return Math.floor((value / (entryValueList[entryValueList.length - 1] * 6)) * 100);
        }
      };

      return {
        language,
        currentEntry,
        symbol,
        ArtifactRate,
        entryProgess,
      };
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

      .sheetTitle {
        margin-bottom: 0.125rem;
      }

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
