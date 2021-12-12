<template>
  <div class="set_container">
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
    <!-- 角色列表 -->
    <character-list @character="characterChange" :characterprop="selectCharacter">
      <button
        class="btn btn-genshin btn-switch"
        :class="{ disable: selectCharacter === '' }"
        :disabled="selectCharacter === ''"
        @click="chengeArtifact()"
        v-show="!isSame"
      >
        <span class="circleinbox"></span>
        {{ $t("handle.switch") }}
      </button>
      <button class="btn btn-genshin-dark btn-remove" v-show="isSame" @click="removeArtifact()">
        <span class="xinbox"></span>
        {{ $t("handle.remove") }}
      </button>
      <button class="btn btn-genshin btn-detail" :disabled="selectCharacter === ''" @click="$router.push('/state-' + selectCharacter)">
        <span class="squareinbox"></span>{{ $t("handle.stateDetail") }}
      </button>
    </character-list>
    <!-- 圣遗物变更信息 -->
    <div class="bg-container">
      <!-- 背景样式 -->
      <div class="fog ani-fogMove"></div>
      <div class="starBox">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <div class="upFloodlight"></div>
      <!-- 圣遗物信息 -->
      <div class="artifactDetailBox">
        <!-- 圣遗物信息（当前人物没有装备或正在使用该圣遗物时显示） -->
        <artifact-show
          :showdetail="artifact"
          :language="language"
          :showButton="false"
          :symbol="artifact.symbol"
          @lock="lockChange"
          v-if="JSON.stringify(artifact) !== '{}'"
          v-show="this.oldArtifact === undefined || isSame"
        >
        </artifact-show>
        <!-- 属性变更信息（更换不同圣遗物时显示） -->
        <div class="comparedBox" v-show="!(this.oldArtifact === undefined) && !isSame">
          <div class="oldName">{{ oldArtifactName }}</div>
          <div class="newName"><img src="../assets/images/Arrow.png" alt="Arrow" draggable="false" /> {{ artifactName }}</div>
          <div class="setChange">{{ $t("msg.setChange") }}</div>
          <div class="setChangeInfo">
            <span v-if="JSON.stringify(setBonusChange) === '{}'">{{ $t("msg.noChanges") }}</span>
            <span v-for="(value, key) in setBonusChange" :key="key" :class="value[1] ? 'getBonus' : 'lostBonus'">
              {{ $t("setList[" + $artiConst.val.setList.indexOf(key) + "]") + "(" + value[0] + "): " + setBonusDetail(key, value[0]) }}
            </span>
          </div>
          <div class="attrChange">{{ $t("msg.characterAttrChange") }}</div>
          <div class="attrChangeList">
            <div class="attrChangeInfo" v-for="(value, key) in changeList" :key="key">
              <span class="attrDot">•</span>
              <span class="attrName">{{ $t("term_sp." + key) }}</span>
              <span class="valueChange" :class="value > 0 ? 'value_up' : 'value_down'">{{ formatValue(key, value) }}</span>
            </div>
            <div class="attrChangeInfo" v-if="JSON.stringify(changeList) === '{}'">
              {{ $t("msg.noChanges") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import artifactShow from "../components/artifact-show.vue";
  import characterList from "../components/character-list.vue";
  import "@/style/stars.css";
  import { getCurrentInstance, ref, watch } from "vue";
  import { useRouter } from "vue-router";

  export default {
    props: ["symbol"],
    components: {
      artifactShow,
      characterList,
    },
    setup(props) {
      // 获取全局函数
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      const trans = globalProperties.$t;
      const db = globalProperties.$db;
      const router = useRouter();
      // 输出的响应式对象
      const setIndex = ref(-1);
      const artifact = ref({});
      // 是否与当前人物装备的圣遗物相同
      const isSame = ref(false);
      const selectCharacter = ref("");
      // 人物筛选条件
      const language = ref("origin");

      // 数值处理
      const formatValue = (key, value) => {
        let res = artifactFunc.entryValFormat(key, value);
        if (res.indexOf("-") === -1) res = "+" + res;
        return res;
      };

      // 替换圣遗物
      const chengeArtifact = () => {
        artifactFunc.updateSet(selectCharacter.value, [artifact.value.symbol]);
        // 更新artifact和oldArtifact
        artifact.value = artifactFunc.getArtifact(props.symbol, language.value);
        // isSame判定
        isSame.value = true;
      };
      // 圣遗物锁定
      const lockChange = symbol => {
        artifactFunc.lock(symbol);
        artifact.value = artifactFunc.getArtifact(symbol, language.value);
      };
      const characterChange = val => {
        selectCharacter.value = val;
      };

      // 套装信息
      const setBonusDetail = (key, count) => {
        let artifactSet = "artifactSet";
        if (language.value === "zh") {
          artifactSet += "_zh";
        }
        key = trans("setList[" + artiConst.setList.indexOf(key) + "]");
        count = "Set" + count;
        return artiConst[artifactSet][key][count];
      };

      watch([() => props.symbol], async val => {
        // symbol
        let artifact = await db.ARTIFACT_LIST.get(val[0]);
        if (artifact === undefined) {
          router.replace("/");
        }
      });
      return {
        setIndex,
        artifact,
        isSame,
        selectCharacter,
        language,
        formatValue,
        chengeArtifact,
        lockChange,
        characterChange,
        setBonusDetail,
      };
    },
    data() {
      return {
        artifactName: "none", // 当前圣遗物名称
        oldArtifactName: "none", // 已装备的圣遗物名称
        oldArtifact: undefined, // 人物已装备的圣遗物数据
        setBonusChange: {}, // 圣遗物套装变化情况
        fillCount: 0, // 填充（flex）
        itemMax: 0,
        changeList: {}, // 属性变化表
      };
    },
    mounted() {
      // 读取语言设置
      this.language = this.$i18n.locale;
      // 当前圣遗物信息
      this.artifact = this.$artifact.getArtifact(this.symbol, JSON.parse(localStorage.userSetting).language);
      if (this.artifact) {
        if (this.language === "zh") {
          this.artifactName = this.$artiConst.val.artifactSet_zh[this.artifact.set][this.artifact.part];
        } else if (this.language === "en") {
          let part = this.$artiConst.val.parts[this.$artiConst.val.parts_en.indexOf(this.artifact.part)];
          this.artifactName = this.$artiConst.val.artifactSet[this.artifact.set][part];
        }
        // 如果已经被使用则将当前人物设置为使用者
        if (this.artifact.equipped) {
          this.selectCharacter = this.artifact.equipped;
        }
      }
    },
    watch: {
      characterList() {
        this.fillFunc();
      },
      selectCharacter(val) {
        if (val === "") {
          this.oldArtifact = undefined;
          this.setIndex = -1;
          this.isSame = false;
          return;
        }
        // 更新当前套装序号
        this.setIndex = this.$artifact.getSetIndex(val);
        // 更新已装备的圣遗物
        let oldSymbol = this.$artifact.setList[this.setIndex][this.$artifact.getArtifact(this.symbol).part];
        let oldIndex = this.$artifact.getIndex(this.$artifact.setList[this.setIndex][this.$artifact.getArtifact(this.symbol).part]);
        this.oldArtifact = this.$artifact.getArtifact(oldSymbol);
        if (oldIndex > -1) {
          this.isSameFunc();
        } else {
          this.isSame = false;
        }
      },
      // 如有已经装备的圣遗物，则计算差值+套装变更
      oldArtifact(val) {
        if (val === undefined) return;
        // 清空changeList和setBonusChange
        this.changeList = {};
        this.setBonusChange = {};
        let that = this,
          index = this.$artifact.getIndex(this.symbol),
          artifactNow = this.$artifact.AUSList[index],
          // artiConst = this.$artiConst.val,
          compareFunc = function(arr, type) {
            for (let i in arr) {
              let entry = arr[i][0],
                entryValue = arr[i][1];
              if (Object.prototype.hasOwnProperty.call(that.changeList, entry)) {
                type === "new" ? (that.changeList[entry] += entryValue) : (that.changeList[entry] -= entryValue);
              } else {
                type === "new" ? (that.changeList[entry] = entryValue) : (that.changeList[entry] = -entryValue);
              }
            }
          };
        // 旧装备名称
        this.oldArtifactName = this.$artifact.getArtifactName(val.symbol, this.language);
        // 记录旧数据+对比新数据(旧属性为负值，代表更换后会失去的属性，新属性为正值)
        // 主属性对比
        if (artifactNow.mainEntry === val.mainEntry) {
          this.changeList[val.mainEntry] = artifactNow.mainEntryValue - val.mainEntryValue;
        } else {
          this.changeList[val.mainEntry] = -val.mainEntryValue;
          this.changeList[artifactNow.mainEntry] = artifactNow.mainEntryValue;
        }
        // 副词条对比
        compareFunc(val.entry, "old");
        compareFunc(artifactNow.entry, "new");
        // 去掉为数值零的数据（无变化的数据不展示）
        for (let key in this.changeList) {
          if (this.changeList[key] === 0) {
            delete this.changeList[key];
          }
        }
        // 对比套装变更信息
        if (val.set === artifactNow.set) {
          this.setBonusChange = {};
        } else {
          let oldSet = this.$artifact.getSetBonus(this.selectCharacter);
          // 计算更换圣遗物后的情况
          if (Object.prototype.hasOwnProperty.call(oldSet, artifactNow.set)) {
            if (oldSet[artifactNow.set] === 1 || oldSet[artifactNow.set] === 3) {
              this.setBonusChange[artifactNow.set] = [oldSet[artifactNow.set] + 1, true];
            }
          }
          // 如果有包含已装备圣遗物的套装，则记录卸下后的情况
          if (oldSet[val.set] === 2 || oldSet[val.set] === 4) {
            this.setBonusChange[val.set] = [oldSet[val.set], false];
          }
        }
      },
    },
    methods: {
      // 卸下圣遗物
      removeArtifact() {
        let artifact = this.$artifact.getArtifact(this.symbol);
        let part = artifact.part;
        this.$artifact.removeSetItem(this.selectCharacter, [part]);
        // 更新artifact和oldArtifact
        this.artifact = this.$artifact.getArtifact(artifact.symbol, this.language);
        // isSame判定
        this.oldArtifact = undefined;
        this.isSame = false;
      },
      // isSame判定
      isSameFunc() {
        this.isSame = this.artifact.symbol === this.oldArtifact.symbol;
      },
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

  .set_container {
    user-select: none;
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .filterBox {
    position: relative;
    top: 0;
    height: 3rem;
    width: 100%;
    text-align: center;
    padding: 0.5rem 1rem;

    button {
      line-height: 1.25rem;
      height: 2rem;
      min-width: 16rem;
      text-align: start;
    }

    .dropdown-genshin-toggle {
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0.875rem;
        right: 0.9375rem;
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
      }
    }

    .dropdown-menu {
      border-radius: 1.5625rem;
      background-color: $genshin_dark;
      padding: 0.25rem 0;
      min-width: 16rem;
      max-height: 16rem;
      overflow-y: scroll;

      li {
        padding: 0 0.25rem;
        border-radius: 1.5625rem;

        .dropdown-item {
          color: $genshin_white;
          border-radius: 1.5625rem;

          &:hover {
            background-color: rgb(96, 105, 121);
          }

          span {
            display: block;
            float: right;
          }
        }

        .itemSelected {
          &::before {
            content: "✔";
            display: block;
            float: right;
          }
        }
      }

      .filterLable {
        padding: 0.25rem 0.5rem;
        color: #d3bc8e;
        background: rgba(0, 0, 0, 0.25);
        margin: 0.25rem 0;
        border-radius: 0;
      }
    }
  }

  .buttonBox {
    width: 45%;
    .btn-detail {
      margin-left: 1rem;
    }
  }

  .bg-container {
    position: relative;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(180deg, rgb(112, 53, 25), rgb(125, 83, 38));
    padding-right: 3rem;

    .artifactDetailBox {
      position: absolute;
      z-index: 4;
      inset: 7rem 3rem 3.5rem auto;

      .comparedBox {
        position: relative;
        width: 18.75rem;
        padding: 0 0.25rem;

        .oldName {
          font-size: 1rem;
          color: $genshin_yellow;
          padding: 0.125rem 0.25rem;
        }

        .newName {
          font-size: 1.2rem;
          color: $genshin_yellow;
          background-color: transparentize($genshin_yellow, 0.65);
          padding: 0.125rem 0.25rem;

          img {
            height: 0.875rem;
            width: 0.875rem;
          }
        }

        .setChange {
          font-size: 0.875rem;
          color: transparentize($genshin_green, 0.3);
          margin: 0.5rem 0 0.125rem;
          padding: 0 0.25rem;
        }

        .setChangeInfo {
          font-size: 1rem;
          color: $genshin_white;
          border-top: solid 0.125rem transparentize($genshin_green, 0.8);
          border-bottom: solid 0.125rem transparentize($genshin_green, 0.8);
          padding: 0.125rem 0.25rem;

          .getBonus {
            display: block;
            color: rgb(152, 254, 135);

            &::before {
              content: "✔";
              position: absolute;
              left: -0.5rem;
            }
          }

          .lostBonus {
            display: block;
            color: $genshin_orange_red;

            &::before {
              content: "✘";
              position: absolute;
              left: -0.5rem;
            }
          }
        }

        .attrChange {
          font-size: 0.875rem;
          color: rgb(186, 159, 139);
          margin-top: 1rem;
          padding: 0.125rem 0.25rem;
        }

        .attrChangeList {
          font-size: 0.875rem;
          color: $genshin_white;

          .attrChangeInfo {
            padding: 0.125rem 0.25rem;

            &:nth-child(2n + 1) {
              background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.15), transparent);
            }

            .attrDot {
              display: inline-block;
              text-align: center;
              width: 1rem;
            }

            .attrName {
              color: rgb(255, 255, 255);
            }

            .valueChange {
              float: right;
            }

            .value_up {
              color: $genshin_green_light;
            }

            .value_down {
              color: $genshin_orange_red;
            }
          }
        }
      }
    }

    .fog {
      position: absolute;
      pointer-events: none;
      z-index: 0;
      top: 0;
      left: -100%;
      height: 100%;
      width: 300%;
      background-image: url(../assets/images/fog.png);
      background-size: 125rem 75rem;
      filter: sepia(1);
    }

    .starBox {
      position: relative;
      z-index: 1;
    }

    .upFloodlight {
      position: absolute;
      left: 0;
      opacity: 0.3;
      bottom: 5rem;
      width: 100%;
      height: 35%;
      z-index: 0;
      background-image: linear-gradient(180deg, #ffffff00, #f1d68480, #f1d684, #ffffff00);
      background-image: -webkit-linear-gradient(180deg, #ffffff00, #f1d68480, #f1d684, #ffffff00);
      background-image: -moz-linear-gradient(270deg, #ffffff00, #f1d68480, #f1d684, #ffffff00);
    }
  }

  .btn-switch {
    width: 45%;
  }

  .btn-remove {
    width: 45%;
  }
</style>
