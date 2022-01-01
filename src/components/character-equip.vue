<template>
  <div class="artifacts-equip-container">
    <div v-for="(artifact, key) in equipArtifact" :key="'character_equip_' + key">
      <div class="artifact-equip-box" v-if="artifact">
        <div class="genshin-item-box star-5">
          <img src="../assets/images/Background_Symbol.png" alt="symbol" draggable="false" />
          <img :src="setUrl(artifact.symbol)" :alt="artifact.symbol" draggable="false" />
        </div>
        <div class="lvBox">+{{ artifact.level }}</div>
      </div>
      <div class="artifact-equip-box" v-else>
        <div class="genshin-item-box none-box">
          <img src="../assets/images/Background_Symbol.png" alt="symbol" draggable="false" />
        </div>
        <div class="lvBox">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {computed, getCurrentInstance} from 'vue';
  export default {
    name: 'character-equip',
    props: {
      character: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      // 获取全局函数
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      // const store = useStore().state;
      const artifactFunc = globalProperties.$artifact;

      const equipArtifact = computed(() => {
        // 当前人物装备
        let characterSet = artifactFunc.getSet(props.character) || {name: '', Plume: '', Flower: '', Sands: '', Circlet: '', Goblet: ''};
        let artifacts_obj = {};
        for (let key in characterSet) {
          const symbol = characterSet[key];
          if (key === 'name') continue;
          artifacts_obj[key] = artifactFunc.getArtifact(symbol);
        }
        return artifacts_obj;
      });

      const artifactName = symbol => artifactFunc.getArtifactName(symbol);
      const setUrl = symbol => {
        let item = artifactFunc.getArtifact(symbol),
          src = require(`../assets/images/Artifacts/${item.set.replace(/\s+/g, '')}/${item.part}.png`);
        return src;
      };

      return {
        equipArtifact,
        artifactName,
        setUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .artifacts-equip-container {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .artifact-equip-box {
      position: relative;
      z-index: 3;
      background-color: $genshin_white;
      border-radius: 0.25rem;
      margin: 0.25rem;
      width: 4rem;
      transition: all 0.2s ease;

      .genshin-item-box {
        position: relative;
        width: 4rem;
        height: 4rem;
        border-radius: 0.25rem 0.25rem 1rem 0;
        overflow: hidden;

        img {
          position: absolute;
          display: inline-block;
          height: 100%;
          width: 100%;
        }
      }

      .star-5 {
        img {
          &:first-child {
            opacity: 0.2;
          }
        }
        background-image: linear-gradient(135deg, rgb(165, 95, 30), rgb(200, 115, 15));
      }
    }

    .lvBox {
      font-size: 0.75rem;
      line-height: 1rem;
      text-align: center;
    }
  }
</style>
