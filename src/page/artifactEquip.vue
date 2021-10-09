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
    <!-- 角色选择容器 -->
    <div class="user_container">
      <!-- 角色筛选器 -->
      <div class="filterBox">
        <button type="button" class="btn btn-genshin dropdown-genshin-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ filterShow }}
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end">
          <li @click="filterCharacter = 'default'">
            <a class="dropdown-item" :class="{ itemSelected: filterCharacter === 'default' }">{{ $t("msg.default") }}</a>
          </li>
          <!-- 属性筛选 -->
          <li class="filterLable">{{ $t("element.element") }}</li>
          <li v-for="element in $artiConst.val.elementType" :key="element" @click="filterCharacter = element">
            <a class="dropdown-item" :class="{ itemSelected: filterCharacter === element }">{{ $t("element." + element) }}</a>
          </li>
          <!-- 武器筛选 -->
          <li class="filterLable">{{ $t("weaponType.weapon") }}</li>
          <li v-for="weapon in $artiConst.val.weaponType" :key="weapon" @click="filterCharacter = weapon">
            <a class="dropdown-item" :class="{ itemSelected: filterCharacter === weapon }">{{ $t("weaponType." + weapon) }}</a>
          </li>
          <!-- 地区筛选 -->
          <li class="filterLable">{{ $t("nation.nation") }}</li>
          <li v-for="nation in $artiConst.val.nation" :key="nation" @click="filterCharacter = nation">
            <a class="dropdown-item" :class="{ itemSelected: filterCharacter === nation }">{{ $t("nation." + nation) }}</a>
          </li>
        </ul>
      </div>
      <!-- 角色列表 -->
      <div class="characterBox" ref="characterBox">
        <div
          class="characterShow"
          v-for="character in characterList"
          :key="character"
          :class="{ isSelect: selectCharacter === character.name }"
          @click="selectCharacter = character.name"
          @mousedown="clickMethod($event, true)"
          @mouseup="clickMethod($event, false)"
          @mouseleave="clickMethod($event, false)"
        >
          <div class="avatarBox" :class="'star_' + character.rarity">
            <img :src="avatarSrc(character.name)" :alt="character.name" draggable="false" />
          </div>
          <div class="elementBox">
            <img :src="elementSrc(character.element[0])" :alt="character.element[0]" draggable="false" />
          </div>
          <div class="lvBox">Lv. 90</div>
        </div>
        <div class="fillItem" v-for="i in fillCount" :key="'fill_' + i"></div>
      </div>
      <!-- 按钮 -->
      <div class="buttonBox">
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
        <button class="btn btn-genshin btn-detail" :class="{ disable: selectCharacter === '' }"><span class="squareinbox"></span>Detail</button>
      </div>
    </div>
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
              {{ $t("setList[" + $artiConst.val.setList.indexOf(key) + "]") + "(" + value[0] + ")" }}
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
  import artifactShow from "../components/artifact-show";
  import "@/style/stars.css";

  export default {
    props: ["symbol"],
    components: {
      artifactShow,
    },
    data() {
      return {
        selectCharacter: "",
        characterList: [], // 人物列表
        setList: [], // 人物套装列表
        artifact: {}, // 当前圣遗物数据
        artifactName: "none", // 当前圣遗物名称
        oldArtifactName: "none", // 已装备的圣遗物名称
        oldArtifact: undefined, // 人物已装备的圣遗物数据
        setBonusChange: {}, // 圣遗物套装变化情况
        fillCount: 0, // 填充（flex）
        itemMax: 0,
        language: "origin",
        setIndex: -1, // 当前人物套装序号
        isSame: false, // 是否与当前人物装备的圣遗物相同
        changeList: {}, // 属性变化表
        filterCharacter: "default", // 人物筛选条件
      };
    },
    mounted() {
      // 初始化人物列表
      this.characterList = this.$artiConst.val.character;
      // 初始化人物装备列表
      this.setList = this.$artifact.setList;
      // 读取语言设置
      if (!window.localStorage) {
        alert("浏览器不支持localstorage");
        return false;
      } else if (localStorage.userSetting !== "" && localStorage.userSetting !== undefined) {
        this.language = JSON.parse(localStorage.userSetting).language;
        this.$i18n.locale = JSON.parse(localStorage.userSetting).language;
      }
      try {
        if (this.$artifact.AUSList.length === 0) {
          this.$db.ARTIFACT_LIST.toArray().then(res => {
            this.$artifact.AUSList = res;
            if (this.$artifact.getIndex(this.symbol) === -1) {
              this.$router.replace("/");
            }
            this.initPage();
          });
        } else {
          this.initPage();
        }
      } catch (error) {
        console.log(error);
        this.$router.replace("/");
      }
    },
    computed: {
      filterShow() {
        const artiConst = this.$artiConst.val;
        if (this.filterCharacter === "default") {
          return this.$t("msg.default");
        } else if (artiConst.elementType.indexOf(this.filterCharacter) > -1) {
          return this.$t("element." + this.filterCharacter);
        } else if (artiConst.weaponType.indexOf(this.filterCharacter) > -1) {
          return this.$t("weaponType." + this.filterCharacter);
        } else if (artiConst.nation.indexOf(this.filterCharacter) > -1) {
          return this.$t("nation." + this.filterCharacter);
        }
        return "-NOT FOUND THIS STRING-";
      },
    },
    watch: {
      symbol(val) {
        if (this.$artifact.getIndex(val) === -1) {
          this.$router.replace("/");
        }
      },
      characterList() {
        this.fillFunc();
      },
      // 人物筛选
      filterCharacter(val) {
        let artiConst = this.$artiConst.val;
        if (val === "default") {
          this.characterList = artiConst.character;
        } else {
          let res = [],
            type;
          if (artiConst.elementType.indexOf(val) > -1) {
            type = "element";
          } else if (artiConst.weaponType.indexOf(val) > -1) {
            type = "weapon";
          } else if (artiConst.nation.indexOf(val) > -1) {
            type = "nation";
          }
          artiConst.character.forEach(el => {
            if (type === "element" && el["element"].indexOf(val) > -1) {
              res.push(el);
            } else if (el[type] === val) res.push(el);
          });
          this.characterList = res;
        }
        // 筛选后重置当前选择人物
        this.selectCharacter = "";
      },
      selectCharacter(val) {
        if (val === "") {
          this.oldArtifact = undefined;
          this.setIndex = -1;
          this.isSame = false;
          return;
        }
        let index = this.$artifact.getIndex(this.symbol);
        // 更新当前套装序号
        this.setIndex = this.$artifact.getSetIndex(val);
        // 更新已装备的圣遗物
        let oldIndex = this.$artifact.getIndex(this.$artifact.setList[this.setIndex][this.$artifact.AUSList[index].part]);
        this.oldArtifact = this.$artifact.AUSList[oldIndex];
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
          artiConst = this.$artiConst.val,
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
        if (this.language === "zh") {
          let set_zh = artiConst.setList_zh[artiConst.setList.indexOf(val.set)],
            part_zh = artiConst.parts_zh[artiConst.parts.indexOf(val.part)];
          this.oldArtifactName = artiConst.artifactSet_zh[set_zh][part_zh];
        } else if (this.language === "en") {
          this.oldArtifactName = artiConst.artifactSet[val.set][val.part];
        }
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
          let oldSet = this.$artifact.getSetBonus(Number.parseInt(this.setIndex));
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
      // 人物头像链接处理
      avatarSrc(name) {
        try {
          let src = require("../assets/images/character/Character_" + name.replace(/\s+/g, "_") + "_Thumb.png");
          return src;
        } catch (error) {
          return "";
        }
      },
      // 元素图片链接处理
      elementSrc(name) {
        try {
          let src = require("../assets/images/elements/Element_" + name + ".png");
          return src;
        } catch (error) {
          return "";
        }
      },
      // 替换圣遗物
      chengeArtifact() {
        this.$artifact.updateSet(Number.parseInt(this.setIndex), [this.artifact.symbol]);
        // 更新artifact和oldArtifact
        this.artifact = this.$artifact.getArtifact(this.symbol, this.language);
        // isSame判定
        this.isSame = true;
      },
      // 圣遗物锁定
      lockChange(symbol) {
        this.$artifact.lock(symbol);
        this.artifact = this.$artifact.getArtifact(symbol, this.language);
      },
      // 卸下圣遗物
      removeArtifact() {
        let artifact = this.$artifact.getArtifact(this.symbol);
        let part = artifact.part;
        this.$artifact.removeSetItem(Number.parseInt(this.setIndex), [part]);
        // 更新artifact和oldArtifact
        this.artifact = this.$artifact.getArtifact(artifact.symbol, this.language);
        // isSame判定
        this.oldArtifact = undefined;
        this.isSame = false;
      },
      // 数值处理
      formatValue(key, value) {
        return this.$artifact.entryValFormat(key, value);
      },
      // 点击效果
      clickMethod(event, type) {
        if (type) {
          event.currentTarget.classList.add("isClick");
        } else {
          event.currentTarget.classList.remove("isClick");
        }
      },
      // 计算填充
      fillFunc() {
        let boxWidth = this.$refs.characterBox.offsetWidth,
          html = document.getElementsByTagName("html"),
          rem = Number.parseFloat(window.getComputedStyle(html[0]).fontSize.slice(0, -2));
        this.itemMax = Math.floor(boxWidth / (4.5 * rem));
        this.fillCount = this.itemMax - (this.characterList.length % this.itemMax);
        if (this.fillCount === this.itemMax) this.fillCount = 0;
      },
      // isSame判定
      isSameFunc() {
        this.isSame = this.artifact.symbol === this.oldArtifact.symbol;
      },
      initPage() {
        this.artifact = this.$artifact.getArtifact(this.symbol, JSON.parse(localStorage.userSetting).language);
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
    position: fixed;
    top: 3.5rem;
    width: 100%;
    height: calc(100% - 3.5rem);
    overflow: hidden;
  }

  .user_container {
    position: fixed;
    z-index: 5;
    width: 24rem;
    background-color: rgba(53, 57, 61, 0.9);
    background-image: linear-gradient(180deg, rgb(39, 50, 63), rgb(57, 56, 54));
    height: 100%;
    overflow: hidden;
    transition: all 0.5s ease;
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
    position: relative;
    height: 3.5rem;
    width: 100%;
    box-shadow: 0 -0.25rem 0.75rem rgb(53, 57, 61);
    z-index: 4;
    padding: 0.5rem 1rem 0 1rem;
    text-align: center;

    .btn-detail {
      margin-left: 1rem;
    }
  }

  .characterBox {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 10rem);

    .characterShow {
      position: relative;
      z-index: 3;
      background-color: $genshin_white;
      border-radius: 0.25rem;
      margin: 0.25rem;
      width: 4rem;
      height: 5rem;
      transform: all 0.2s ease;

      .avatarBox {
        width: 4rem;
        height: 4rem;
        border-radius: 0.25rem 0.25rem 1rem 0;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .elementBox {
        position: absolute;
        top: -0.25rem;
        left: 0.0625rem;
        width: 1rem;
        height: 1rem;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .star_5 {
        background-image: linear-gradient(135deg, rgb(127, 87, 46), rgb(183, 115, 38));
      }

      .star_4 {
        background-image: linear-gradient(135deg, rgb(87, 83, 129), rgb(156, 114, 177));
      }

      .lvBox {
        font-size: 0.75rem;
        line-height: 1rem;
        text-align: center;
      }
    }

    .fillItem {
      width: 4rem;
      margin: 0.25rem;
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
      inset: 3.5rem 3rem 3.5rem auto;

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
              content: "✖";
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
      background-image: -moz-linear-gradient(180deg, #ffffff00, #f1d68480, #f1d684, #ffffff00);
    }
  }

  .btn-switch {
    width: 12rem;
  }

  .btn-remove {
    width: 12rem;
  }
</style>
