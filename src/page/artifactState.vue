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
  <div class="equip-box" :class="{ 'equip-box-hide': !equipShow }" @click="equipShow = !equipShow">
    <div>{{ $t("msg.equipped") }}:</div>
    <character-equip :character="selectCharacter"></character-equip>
  </div>
  <div class="state-container" :class="'bg-' + characterElement">
    <!-- 人物展示 -->
    <div class="characterDetail">
      <div class="characterName">{{ $t("element." + characterElement) }} / {{ $t("name." + selectCharacter) }}</div>
      <div class="btn btn-genshin show-button" @click="equipShow = !equipShow">{{ $t("msg.equipped") }}</div>
    </div>
    <character-list mode="banner" @character="characterChange" :characterprop="selectCharacter"></character-list>
    <!-- 属性展示 -->
    <div class="stateShowBox">
      <!-- 基础属性 -->
      <div class="stateTitle">{{ $t("term.baseStats") }}</div>
      <div class="stateDetail" v-for="(value, key) in baseStats" :key="key" :class="'stat-' + key">
        <span class="stateName">
          {{ $t("term." + key) }}
        </span>
        <span class="stateValue" v-if="key !== 'elementMastery'">
          +{{ $artifact.entryValFormat(key, value[0]) + " & +" + Number.parseFloat(value[1]).toFixed(0) }}
        </span>
        <span class="stateValue" v-else> +{{ $artifact.entryValFormat(key, value) }} </span>
        <span class="EMBonusDetail" v-if="key === 'elementMastery' && $i18n.locale === 'zh'">{{
          `元素精通越高，就能释放越强的元素能量。
          蒸发、融化反应造成伤害时，伤害提升${EMBonus[0]}%。
          超载、超导、感电、碎冰、扩散反应造成的伤害提升${EMBonus[1]}%。
          结晶反应形成的晶片护盾，提供的伤害吸收量提升${EMBonus[2]}%。`
        }}</span>
        <span class="EMBonusDetail" v-if="key === 'elementMastery' && $i18n.locale === 'en'">{{
          `The higher a character's elemental mastery, the stronger the elemental energy that can be released.
          Increases damage caused by Vaporize and Melt by ${EMBonus[0]}%.
          Also increases damage caused by Overloaded, Superconduct, Electro-Charged, Shattered, and Swirl by ${EMBonus[1]}%.
          Increases the damage absorption power of shields created through Crystallize by ${EMBonus[2]}%.`
        }}</span>
      </div>
      <div class="stateDetail stat-stamina">
        <span class="stateName">{{ $t("term.stamina") }}</span>
        <span class="stateValue">240</span>
      </div>
      <!-- 进阶属性 -->
      <div class="stateTitle">{{ $t("term.advanceStats") }}</div>
      <div class="for-nth-child" style="display:none;"></div>
      <div class="stateDetail" v-for="(value, key) in advanceStats" :key="key" :class="'stat-' + key">
        <span class="stateName">
          {{ $t("term." + key) }}
        </span>
        <span class="stateValue"> +{{ $artifact.entryValFormat(key, value) }} </span>
      </div>
      <!-- 元素属性 -->
      <div class="stateTitle">{{ $t("term.elementalType") }}</div>
      <div class="for-nth-child" style="display:none;"></div>
      <div class="stateDetail" v-for="(value, key) in elementalType" :key="key" :class="'stat-' + key">
        <span class="stateName">
          {{ $t("term." + key) }}
        </span>
        <span class="stateValue"> +{{ $artifact.entryValFormat(key, value) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, onMounted, ref, watch } from "vue";
  // import { useStore } from "vuex";
  import characterList from "../components/character-list";
  import characterEquip from "../components/character-equip";
  export default {
    props: {
      name: {
        type: String,
        default: "",
      },
    },
    components: {
      characterList,
      characterEquip,
    },
    setup(props) {
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      // const db = globalProperties.$db;
      // const store = useStore().state;

      const characterArtifact = ref(artifactFunc.getSet(props.name));
      const selectCharacter = ref(props.name);
      const characterElement = ref([]);
      const baseStats = ref({ HPPer: [0, 0], ATKPer: [0, 0], DEFPer: [0, 0], elementMastery: 0 });
      const advanceStats = ref({ CRITRate: 0, CRITDMG: 0, Healing: 0, incomingHealing: 0, energyRecharge: 0, CD: 0, Shield: 0 });
      const elementalType = ref({
        Pyro: 0,
        PyroRES: 0,
        Hydro: 0,
        HydroRES: 0,
        Dendro: 0,
        DendroRES: 0,
        Electro: 0,
        ElectroRES: 0,
        Anemo: 0,
        AnemoRES: 0,
        Cryo: 0,
        CryoRES: 0,
        Geo: 0,
        GeoRES: 0,
        Physical: 0,
        PhysicalRES: 0,
      });
      const EMBonus = ref([]);

      let character = artiConst.character.find(val => {
        return val.name === props.name;
      });
      if (character !== undefined) {
        characterElement.value = character.element[0];
      }

      onMounted(() => {
        calcStats();
      });

      // 选择人物
      const characterChange = val => {
        selectCharacter.value = val;
      };
      watch(selectCharacter, val => {
        calcStats();
        characterArtifact.value = artifactFunc.getSet(val);
        characterElement.value = artiConst.character.find(chara => {
          return chara.name === val;
        }).element[0];
      });

      // 属性值计算+格式化
      const calcStats = () => {
        const baseList = ["ATK", "ATKPer", "DEF", "DEFPer", "HP", "HPPer", "elementMastery"];
        const advanceList = ["CRITRate", "CRITDMG", "Healing", "incomingHealing", "energyRecharge", "CD", "Shield"];
        const totalStats = artifactFunc.getSetState(selectCharacter.value);
        EMBonus.value = artifactFunc.calcEMBonus(totalStats.elementMastery);
        for (let key in totalStats) {
          const stat = totalStats[key];
          if (baseList.includes(key)) {
            if (key === "ATK") {
              baseStats.value.ATKPer[1] = stat;
            } else if (key === "ATKPer") {
              baseStats.value.ATKPer[0] = stat;
            } else if (key === "HP") {
              baseStats.value.HPPer[1] = stat;
            } else if (key === "HPPer") {
              baseStats.value.HPPer[0] = stat;
            } else if (key === "DEF") {
              baseStats.value.DEFPer[1] = stat;
            } else if (key === "DEFPer") {
              baseStats.value.DEFPer[0] = stat;
            } else {
              baseStats.value[key] = stat;
            }
          } else if (advanceList.includes(key)) {
            advanceStats.value[key] = stat;
          } else {
            elementalType.value[key] = stat;
          }
        }
      };
      // console.log(artifactFunc.setState(props.name));
      // console.log(store);

      // 装备显示/隐藏
      const equipShow = ref(false);

      return {
        characterArtifact,
        selectCharacter,
        characterElement,
        baseStats,
        advanceStats,
        elementalType,
        characterChange,
        EMBonus,
        equipShow,
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
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 3.5rem 6.25rem 0;
  }

  .show-button {
    font-size: 0.875rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  .equip-box {
    position: fixed;
    top: 12rem;
    z-index: 10;
    background-color: rgb(255, 255, 255);
    padding: 0.5rem;
    transition: all 0.2s linear;
  }

  .equip-box-hide {
    transform: translateX(-101%);
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
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    .stateTitle {
      font-size: 0.875rem;
      color: rgb(145, 140, 130);
      margin-top: 0.5rem;
    }

    .stateDetail {
      position: relative;
      line-height: 2.25rem;
      padding: 0 0.5rem 0 2rem;

      .stateValue {
        float: right;
        margin-right: 4rem;
      }

      .EMBonusDetail {
        display: block;
        line-height: 1.25rem;
        font-size: 0.875rem;
        padding-bottom: 0.375rem;
        white-space: pre-line;
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

      &::after {
        content: "";
        display: block;
        position: absolute;
        z-index: 3;
        left: 0.25rem;
        top: 0.3125rem;
        height: 1.5rem;
        width: 1.5rem;
        background-size: 100%;
      }
    }

    // 属性图标
    .stat-HPPer {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_HPPer.png);
      }
    }

    .stat-ATKPer {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_ATKPer.png);
      }
    }

    .stat-DEFPer {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_DEFPer.png);
      }
    }

    .stat-elementMastery {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_elementMastery.png);
      }
    }

    .stat-stamina {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_stamina.png);
      }
    }

    .stat-CRITRate {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_CRITRate.png);
      }
    }

    .stat-Healing {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Healing.png);
      }
    }

    .stat-energyRecharge {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_energyRecharge.png);
      }
    }

    .stat-CD {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_CD.png);
      }
    }

    .stat-Shield {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Shield.png);
      }
    }

    .stat-Pyro {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Pyro.png);
      }
    }

    .stat-Hydro {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Hydro.png);
      }
    }

    .stat-Anemo {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Anemo.png);
      }
    }

    .stat-Electro {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Electro.png);
      }
    }

    .stat-Dendro {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Dendro.png);
      }
    }

    .stat-Cryo {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Cryo.png);
      }
    }

    .stat-Geo {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Geo.png);
      }
    }

    .stat-Physical {
      &::after {
        background-image: url(../assets/images/stats_icon/Icon_Physical.png);
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
      padding: 3.5rem 0 0;

      .stateDetail {
        .stateValue {
          margin-right: 0;
        }
      }
    }
  }
</style>
