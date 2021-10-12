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
  <!-- 人物列表 -->
  <div class="state-container">
    <character-list @character="change" :characterprop="'Xingqiu'" style="right:0;"></character-list>
    <div class="stateShowBox">
      <div class="stateDetail" v-for="(value, key) in characterState" :key="key">{{ $t("term." + key) }}: {{ $artifact.entryValFormat(key, value) }}</div>
    </div>
    <div class="artifactEquip" :class="{artifactEquipShow:artifactEquipBox}">
      <div v-for="(value, key) in characterArtifact" :key="key">
        {{ key + ": " + value }}
      </div>
      <div class="artifactEquipSwitch" @click="artifactEquipShow">{{ artifactEquipBox?"✖":">" }}</div>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, ref } from "vue";
  import { useStore } from "vuex";
  import characterList from "@/components/character-list.vue";
  export default {
    props: ["name"],
    components: {
      characterList,
    },
    setup(props) {
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      const artifactFunc = globalProperties.$artifact;
      // const artiConst = globalProperties.$artiConst.val;
      // const db = globalProperties.$db;
      const store = useStore().state;

      const characterState = ref(artifactFunc.getSetState(props.name));
      const characterArtifact = ref(artifactFunc.getSet(props.name));
      const artifactEquipBox = ref(false);
      artifactFunc.getSet();

      // console.log(artifactFunc.setState(props.name));
      console.log(store);

      const artifactEquipShow = () => {
        artifactEquipBox.value = !artifactEquipBox.value;
      };
      const change = val => {
        console.log(val);
      };

      return {
        characterState,
        characterArtifact,
        artifactEquipBox,
        change,
        artifactEquipShow,
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
    overflow: hidden;
  }

  .stateShowBox {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 2rem;
    width: 100%;
    height: 100%;

    .stateDetail {
      &:nth-child(2n + 1) {
        background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.15), transparent);
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
    .stateShowBox {
      height: 50%;
    }
  }
</style>
