<template>
  <button @click="$router.go(-1)" class="btn btn-genshin btn-back">
    <svg
      t="1631673905462"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      p-id="633"
      width="1rem"
      height="1rem"
    >
      <path
        d="M482.7 249.9V106.1c0-37.4-45.3-56.2-71.7-29.7L140.3 347c-16.4 16.4-16.4 43 0 59.4L410.9 677c26.5 26.5 71.7 7.7 71.7-29.7v-155c96.1-0.3 271.5-10.7 271.5 227.7 0 118.1-92.8 216.8-216 239.6 198.1-24.4 326-236 326-361.9 0.1-292.6-309.4-346.3-381.4-347.8z"
        fill=""
        p-id="634"
      ></path>
    </svg>
    {{ $t("handle.back") }}
  </button>
  <div class="state-container" :class="'bg-' + characterElement">
    <!-- 人物展示 -->
    <div class="characterDetail">
      <div class="characterName">{{ $t("element." + characterElement) }} / {{ $t("name." + selectCharacter) }}</div>
    </div>
    <character-list mode="banner" @character="characterChange" :characterprop="selectCharacter"></character-list>
    <!-- 属性展示 -->
    <div class="stateShowBox">
      <div class="stateDetail" v-for="(value, key) in characterState" :key="key">
        <span class="stateName">
          {{ $t("term." + key) }}
        </span>
        <span class="stateValue"> +{{ $artifact.entryValFormat(key, value) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, ref, watch } from "vue";
  // import { useStore } from "vuex";
  import characterList from "../components/character-list";
  export default {
    props: {
      name: {
        type: String,
        default: "",
      },
    },
    components: {
      characterList,
    },
    setup(props) {
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      // const db = globalProperties.$db;
      // const store = useStore().state;

      const characterState = ref(artifactFunc.getSetState(props.name));
      const characterArtifact = ref(artifactFunc.getSet(props.name));
      const selectCharacter = ref(props.name);
      const characterElement = ref([]);

      let character = artiConst.character.find(val => {
        return val.name === props.name;
      });
      if (character !== undefined) {
        characterElement.value = character.element[0];
      }
      // 选择人物
      const characterChange = val => {
        selectCharacter.value = val;
      };
      watch(selectCharacter, val => {
        characterState.value = artifactFunc.getSetState(val);
        characterArtifact.value = artifactFunc.getSet(val);
        characterElement.value = artiConst.character.find(chara => {
          return chara.name === val;
        }).element[0];
      });
      // console.log(artifactFunc.setState(props.name));
      // console.log(store);

      return {
        characterState,
        characterArtifact,
        selectCharacter,
        characterElement,
        characterChange,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .btn-back {
    position: fixed;
    top: 0.5rem;
    right: 0.9375rem;
    z-index: 20;
  }

  .state-container {
    user-select: none;
    position: fixed;
    top: 3.5rem;
    width: 100%;
    height: calc(100% - 3.5rem);
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 6.25rem;
  }

  // 各属性背景色
  .bg-Pyro {
    background-image: linear-gradient(180deg, rgb(98, 29, 25), rgb(143, 40, 27));
  }

  .bg-Hydro {
    background-image: linear-gradient(180deg, rgb(24, 58, 147), rgb(45, 113, 180));
  }

  .bg-Dendro {
    background-image: linear-gradient(180deg, rgb(40, 97, 36), rgb(70, 114, 0));
  }

  .bg-Electro {
    background-image: linear-gradient(180deg, rgb(108, 46, 142), rgb(128, 73, 157));
  }

  .bg-Anemo {
    background-image: linear-gradient(180deg, rgb(30, 105, 98), rgb(75, 187, 176));
  }

  .bg-Cryo {
    background-image: linear-gradient(180deg, rgb(39, 105, 141), rgb(70, 161, 188));
  }

  .bg-Geo {
    background-image: linear-gradient(180deg, rgb(121, 98, 41), rgb(162, 141, 46));
  }

  .characterDetail {
    position: relative;
    width: 100%;

    .characterName {
      position: relative;
      width: unset;
      z-index: 3;
      font-size: 1.5rem;
      color: $genshin_gold;
      padding: 0.25rem 2rem;
    }
  }

  .stateShowBox {
    position: relative;
    overflow-x: hidden;
    padding: 0.5rem 2rem;
    width: 100%;

    color: $genshin_white;
    background-color: rgba(0, 0, 0, 0.35);
    transition: all 0.5s ease-in-out;

    .stateDetail {
      position: relative;
      height: 2.25rem;
      line-height: 2.25rem;
      padding: 0 0.5rem;

      .stateValue {
        float: right;
        margin-right: 4rem;
      }

      &:nth-child(2n + 1) {
        background-color: rgba(0, 0, 0, 0.25);
      }

      &:nth-child(2n) {
        background-color: rgba(255, 255, 255, 0.05);
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        border: solid 0.1875rem transparentize($genshin_gray_light, 1);
        transition: all 0.2s linear;
      }

      &:hover::before {
        border: solid 0.1875rem $genshin_gray_light;
      }
    }
  }

  .artifactEquip {
    position: fixed;
    z-index: 5;
    top: 5rem;
    width: 18rem;
    left: -18rem;
    padding: 0.5rem 1rem;
    transition: all 0.5s ease-in-out;
    background-color: $genshin_white;

    .artifactEquipSwitch {
      position: absolute;
      height: 2rem;
      width: 2rem;
      top: 50%;
      right: -2rem;
      margin-top: -1rem;
      background-color: $genshin_white;
      text-align: center;
      font-size: 1.75rem;
      line-height: 2rem;
    }
  }

  .artifactEquipShow {
    left: 0;
  }

  // 移动端兼容
  @media screen and (max-width: 56.875rem) {
    .state-container {
      padding: 0;

      .stateDetail {
        .stateValue {
          margin-right: 0;
        }
      }
    }
  }
</style>
