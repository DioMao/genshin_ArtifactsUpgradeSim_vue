<template>
  <div class="ArtifactShow">
    <div class="aTitle" :style="{fontSize: language==='en'?'0.875rem':'inherit'}">{{ artifactName }}</div>
    <div class="titleLine">
      <img class="leftArrow" src="../assets/images/artifact_arrow.png" alt="artifactArrow" draggable="false" />
      <img class="rightArrow" src="../assets/images/artifact_arrow.png" alt="artifactArrow" draggable="false" />
    </div>
    <div class="aHead">
      {{ showdetail.part }}
      <div class="mainEntry">{{ showdetail.mainEntry }}</div>
      <div class="mainEntryValue">{{ showdetail.mainEntryValue }}</div>
      <div class="aImg">
        <img :src="setUrl" :alt="showdetail.part" draggable="false" />
      </div>
      <div class="levelStar">
        <span v-for="i in 5" :key="i" style="margin-right: 3px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="aContent">
      <span class="badge">+{{ showdetail.level }}</span>
      <span class="unlock" v-if="!showdetail.lock" @click="lockChange">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4021"
          width="1rem"
          height="1rem"
          fill="rgb(158,161,168)"
        >
          <path
            d="M825 384H268.6c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C445.6 78.6 478.5 72 512.5 72s66.9 6.6 97.8 19.7c19.4 8.2 37.5 18.7 54.2 31.4 14.4 11 34.6 9.8 47.5-3 15.4-15.4 13.7-40.9-3.7-54.1C653.9 24.6 586.1 0 512.5 0 334 0 189.2 144.7 189.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM544.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4z"
            p-id="4022"
          ></path>
        </svg>
      </span>
      <span class="islock" v-else @click="lockChange">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4168"
          width="1rem"
          height="1rem"
          fill="rgb(255,138,117)"
        >
          <path
            d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z"
            p-id="4169"
          ></path>
        </svg>
      </span>
      <ul>
        <li v-for="entry in showdetail.entry" :key="entry">·{{ entry[0] + "+" + entry[1] }}</li>
      </ul>
      <div class="setName">{{ showdetail.set }}:</div>
      <div class="setBonusDetail">
        <span :class="setActive >= 2 ? 'setActived' : 'setInactivated'">{{ $t("term.Set2") }}: {{ setDetail.Set2 }}</span>
        <span :class="setActive >= 4 ? 'setActived' : 'setInactivated'">{{ $t("term.Set4") }}: {{ setDetail.Set4 }}</span>
      </div>
      <div class="bottomBg"></div>
    </div>
    <div class="aEquipped" v-if="showdetail.equipped">
      <img :src="sideUrl" alt="side_avatar" draggable="false" />
      <span v-show="language === 'en'">Equipped: </span>
      <span>{{ $t("name." + showdetail.equipped).replace(/\s+/g, "") }}</span>
      <span v-show="language === 'zh'">已装备</span>
    </div>
    <div v-if="showButton">
      <div class="actionBox mt-2 mb-2 d-flex justify-content-between">
        <div class="btn btn-genshin" @click="toPath(symbol, 'equip')"><span class="squareinbox"></span> {{ $t("handle.equip") }}</div>
        <div class="btn btn-genshin btn-toupgrade" @click="toPath(symbol, 'artifact')"><span class="circleinbox"></span>{{ $t("msg.toUpgradePage") }}</div>
      </div>
      <div class="aButtonBox mt-3 msg-box">
        <h4>◆ {{ $t("handle.commonHandle") }}</h4>
        <div class="firstLine mb-2">
          <button class="btn btn-genshin btn-sm" @click="upgrade" :disabled="showdetail.level >= 20">
            {{ $t("msg.upgrade") }}
          </button>
          <button class="btn btn-genshin btn-sm" @click="init" :disabled="showdetail.lock || showdetail.level === 0">{{ $t("msg.reset") }}</button>
          <button class="btn btn-genshin btn-sm del" :disabled="showdetail.lock" @click="del">
            <span class="mobileShow" @click="close"></span>
            {{ $t("msg.delete") }}
          </button>
        </div>
        <h4>◆ {{ $t("handle.targetedEnhanced") }}</h4>
        <div>
          <div class="entryUp" v-for="(entry, index) in showdetail.entry" :key="entry[0] + index">
            <span> • {{ entry[0] }}+{{ entry[1] }} </span>
            <button class="btn btn-genshin btn-sm" @click="upgrade(index)" :disabled="showdetail.level >= 20">
              {{ $t("msg.upgrade") }}
            </button>
          </div>
        </div>
        <h4>◆ {{ $t("handle.enhancedRank") }}</h4>
        <div>
          <select class="form-select" v-model="enhancedRank">
            <option value="-1">{{ $t("msg.random") }}</option>
            <option value="0">{{ $t("tips.lowest") }}</option>
            <option value="1">{{ $t("tips.lower") }}</option>
            <option value="2">{{ $t("tips.higher") }}</option>
            <option value="3">{{ $t("tips.highest") }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "artifact-show",
    data() {
      return {
        enhancedRank: -1,
      };
    },
    props: {
      showdetail: {
        type: [Object, Function],
        default() {
          return {
            symbol: "",
            level: 0,
            set: "none",
            part: "none",
            mainEntry: "none",
            mainEntryValue: 0,
            entry: [],
            initEntry: "",
            upgradeHistory: [],
            creationDate: Date.now(),
            lock: false,
            equipped: 0,
          };
        },
      },
      language: {
        type: String,
        default: "origin",
      },
      showButton: {
        type: Boolean,
        default: true,
      },
      symbol: {
        type: String,
        default: "",
      },
    },
    computed: {
      artifactName() {
        return this.$artifact.getArtifactName(this.symbol, this.language);
      },
      setUrl() {
        let item = this.$artifact.getArtifact(this.symbol),
          src = require(`../assets/images/Artifacts/${item.set.replace(/\s+/g, "")}/${item.part}.png`);
        return src;
      },
      sideUrl() {
        if (this.showdetail.equipped) {
          let src;
          try {
            src = require(`../assets/images/avatars_side/${this.showdetail.equipped.replace(/\s+/g, "_")}_side.png`);
            return src;
          } catch {
            src = require("../assets/images/genshin_emoji/Icon_Emoji_003_Paimon_Hehe.png");
            return src;
          }
        }
        return "";
      },
      setDetail() {
        let artifactSet;
        if (this.language === "zh") {
          artifactSet = this.$artiConst.val.artifactSet_zh;
        } else {
          artifactSet = this.$artiConst.val.artifactSet;
        }
        return artifactSet[this.showdetail.set];
      },
      // 套装激活情况
      setActive() {
        if (this.showdetail.equipped) {
          let setBonus = this.$artifact.getSetBonus(this.showdetail.equipped);
          for (let key in setBonus) {
            const count = setBonus[key];
            let setName = key;
            if (this.language === "zh") {
              setName = this.$artiConst.val.setList_zh[this.$artiConst.val.setList.indexOf(key)];
            }
            if (setName === this.showdetail.set) {
              return count;
            }
          }
        }
        return 0;
      },
    },
    methods: {
      upgrade(entry = -1) {
        this.$emit("upgrade", this.symbol, entry, this.enhancedRank);
      },
      init() {
        this.$emit("init", this.symbol);
      },
      del() {
        this.$emit("del", this.symbol);
      },
      lockChange() {
        this.$emit("lock", this.symbol);
      },
      close() {
        this.$emit("close");
      },
      toPath(symbol, type) {
        if (symbol !== "") {
          this.$router.push("/" + type + "-" + symbol);
        } else {
          void 0;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .swiperContainer {
    position: relative;
    z-index: 10;
  }

  .ArtifactShow {
    position: relative;
    margin: 0 auto;
    width: 18.75rem;
    overflow: hidden;

    .aTitle {
      height: 1.875rem;
      color: #fff;
      line-height: 2.0625rem;
      padding-left: 1rem;
      background-color: #bc6832;
    }

    .titleLine {
      position: absolute;
      z-index: 2;
      inset: 0.125rem;
      width: 18.5rem;
      height: 1.625rem;
      border: solid 0.125rem rgba(144, 82, 41, 0.7);

      .leftArrow {
        position: absolute;
        z-index: 4;
        top: 0.3125rem;
        left: -0.25rem;
        height: 0.75rem;
        width: 0.75rem;
        background-color: #bc6832;
      }

      .rightArrow {
        position: absolute;
        z-index: 4;
        top: 0.3125rem;
        right: -0.25rem;
        height: 0.75rem;
        width: 0.75rem;
        background-color: #bc6832;
        transform: rotate(180deg);
      }
    }

    .aHead {
      position: relative;
      color: #fff;
      overflow: hidden;
      font-size: 0.8125rem;
      height: 8.4375rem;
      padding: 0.3125rem 1rem 0.5625rem;
      background-image: linear-gradient(to bottom right, rgba(110, 72, 72, 0.5) 15%, rgba(225, 125, 40, 0.5), rgba(255, 175, 45, 0.7) 95%),
        url(../assets/images/item_bg.png);
      background-size: auto 8.25rem, 100%;
      background-position-y: 0, 0;

      .mainEntry {
        position: absolute;
        z-index: 2;
        top: 3.4375rem;
        left: 1.125rem;
        color: rgb(191, 173, 166);
      }

      .mainEntryValue {
        position: absolute;
        z-index: 2;
        font-size: 1.5rem;
        top: 4.375rem;
        left: 1.125rem;
      }

      .aImg {
        position: absolute;
        z-index: 2;
        right: 0.375rem;
        top: 0.5rem;
        width: 7.8125rem;
        height: 7.8125rem;

        img {
          &:first-child {
            position: relative;
            z-index: 2;
            width: inherit;
            height: inherit;
          }
        }
      }

      .levelStar {
        position: absolute;
        z-index: 2;
        left: 1.125rem;
        bottom: 0.5625rem;
      }
    }

    .aContent {
      position: relative;
      min-height: 16rem;
      font-size: 0.875rem;
      padding: 0.6875rem 1rem 2.5rem;
      background-color: #ece5d8;

      .badge {
        font-weight: 400;
        font-size: 0.875rem;
        padding: 0.125rem 0.25rem 0;
        background-color: rgb(57, 68, 79) !important;
      }

      ul {
        margin-top: 0.375rem;
        margin-bottom: 0;
        list-style-type: none;
        padding: 0;

        li {
          margin-bottom: 0.0625rem;
          color: rgb(76, 86, 104);
        }
      }

      .setName {
        color: $genshin_green;
      }

      .setBonusDetail {
        color: rgb(113, 119, 130);
        padding-left: 0.875rem;

        span {
          position: relative;
          display: block;
          line-height: 1rem;
          margin-top: 0.25rem;
          z-index: 2;
        }

        .setInactivated {
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0.0625rem;
            left: -0.875rem;
            color: rgb(113, 119, 130);
            background-image: url(../assets/svg/ban.svg);
            background-size: cover;
            height: 0.75rem;
            width: 0.75rem;
          }
        }

        .setActived {
          color: $genshin_green;

          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0.0625rem;
            left: -0.875rem;
            color: $genshin_green;
            background-image: url(../assets/svg/correct.svg);
            background-size: cover;
            height: 0.75rem;
            width: 0.75rem;
          }
        }
      }

      .bottomBg {
        position: absolute;
        inset: auto 0 0 0;
        height: 3.5rem;
        width: 100%;
        background-image: url(../assets/svg/star_2.svg);
        background-size: 1.75rem;
      }

      .unlock,
      .islock {
        position: relative;
        top: -0.125rem;
        float: right;
        padding-top: 0.0625rem;
        height: 1.5rem;
        width: 1.5rem;
        text-align: center;
        border-radius: 0.25rem;
      }

      .unlock {
        background-color: #f3efea;
        border: solid 0.0625rem #9ea1a8;

        &:active {
          opacity: 0.8;
        }
      }

      .islock {
        background-color: $genshin_dark;
        border: solid 0.0625rem #fff;

        &:active {
          opacity: 0.8;
        }
      }
    }

    .aEquipped {
      position: relative;
      width: 100%;
      font-size: 0.875rem;
      line-height: 0.9375rem;
      color: $genshin_dark;
      background-color: rgb(255, 231, 187);
      padding: 0.5rem 0 0.5rem 2.75rem;

      img {
        position: absolute;
        z-index: 2;
        left: 0.25rem;
        bottom: 0.25rem;
        height: 2.5rem;
      }
    }

    .aButtonBox {
      color: rgb(147, 128, 106);

      .firstLine {
        display: flex;
        flex-wrap: nowrap;
        align-content: flex-start;
        justify-content: space-between;
      }

      h4 {
        font-size: 0.9375rem;
        color: rgb(165, 88, 67);

        &::after {
          content: "";
          display: block;
          width: 100%;
          height: 0.125rem;
          background-color: rgb(209, 192, 175);
          margin-top: 0.1875rem;
        }
      }

      button {
        font-size: 0.9375rem;
        line-height: 0.9375rem;
        background-color: #dea752;
        color: #303030;
        width: 4.375rem;
        border-left: solid 0.0625rem rgb(243, 239, 225);
        border-right: solid 0.0625rem rgb(243, 239, 225);
      }

      .entryUp {
        display: flex;
        flex-wrap: nowrap;
        align-content: flex-start;
        justify-content: space-between;
        height: 1.5rem;
        line-height: 1.5rem;
        margin-bottom: 0.75rem;

        span {
          font-size: 0.875rem;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .mobileShow {
        position: absolute;
        inset: 0 0 0 0;
      }
    }

    .actionBox {
      padding: 0 0.25rem;
      width: 100%;
      position: relative;

      .btn-genshin,
      .btn-toupgrade {
        width: 45%;
      }
    }
  }
</style>
