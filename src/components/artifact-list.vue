<template>
  <!-- 列表容器 -->
  <div class="list-container" ref="listContainer">
    <div class="tips" v-if="$artifact.AUSList.length === 0 && state.language === 'zh'">
      列表里还没有圣遗物。<br /><span @click="createArtifact">创建</span>一个吧！<br /><span @click="changeLanguage('en')">Use English?</span>
    </div>
    <div class="tips" v-if="$artifact.AUSList.length === 0 && state.language === 'en'">
      There's no artifact here.<br /><span @click="createArtifact">Random?</span><br /><span @click="changeLanguage('zh')">使用中文</span>
    </div>
    <!-- 渲染容器 -->
    <div class="item-container" ref="itemContainer" :style="{ paddingTop: filltop + 'px', paddingBottom: fillbottom + 'px' }">
      <div
        v-for="(Artifacts, index) in ArtifactsRenderList"
        :id="'artifact-' + index"
        class="ArtifactsBox card rounded shawdow-sm"
        :class="{ isSelect: Artifacts.symbol === showsymbol }"
        :key="index"
        @click="changeShowSymbol(Artifacts.symbol, Artifacts.isNew)"
        @mousedown="clickMethod($event, true)"
        @mouseup="clickMethod($event, false)"
        @mouseleave="clickMethod($event, false)"
      >
        <div
          class="card-body ArtifactsTitle"
          :style="{
            backgroundImage: 'url(' + imgUrl(Artifacts.symbol) + '),linear-gradient(135deg,rgb(159,96,42),rgb(207,122,38))',
            borderRadius: briefmode ? '.25rem .25rem 1.5625rem' : '',
          }"
        >
          <div class="islock" v-if="Artifacts.lock">
            <svg
              t="1631861008451"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4168"
              width="0.625rem"
              height="0.625rem"
              fill="rgb(255,138,117)"
            >
              <path
                d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z"
                p-id="4169"
              ></path>
            </svg>
          </div>
          <div class="card-text" :style="{ fontSize: $i18n.locale === 'zh' ? '0.9rem' : '0.75rem', whiteSpace: 'nowrap' }">
            {{ Artifacts.part }}
          </div>
          <div class="levelStar">
            <span v-for="i in 5" :key="i" style="margin-right: 2px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </span>
          </div>
          <div class="card-text" style="color:rgb(223,185,170);white-space:nowrap" :style="{ fontSize: $i18n.locale === 'en' ? '0.5rem' : 'inherit' }">
            {{ Artifacts.mainEntry }}
          </div>
          <div>
            {{ Artifacts.mainEntryValue }} <span class="badge float-end fw-normal">+{{ Artifacts.level }}</span>
          </div>
          <!-- 移动端点击显示offcan窗口 -->
          <a class="mobileShow" @click="mobileShow()"> </a>
          <!-- 新圣遗物标识 -->
          <div class="isNew" v-if="Artifacts.isNew">{{ $t("tips.new") }}</div>
          <!-- 已被装备标识 -->
          <div class="equipped" v-if="Artifacts.equipped">
            <img :src="sideUrl(Artifacts.equipped)" alt="equipped" draggable="false" />
          </div>
        </div>
        <ul class="list-group list-group-flush" v-if="!briefmode">
          <li v-for="(entry, index2) in Artifacts.entry" :key="index2" class="list-group-item" @click="upgrade(Artifacts.symbol, index2)">
            {{ entry[0] + "+" + entry[1] }}
            <span class="badge bg-primary upgradeCheat" v-show="Artifacts.level < 20">+</span>
          </li>
          <li class="list-group-item" v-if="Artifacts.entry.length === 3">——</li>
        </ul>
        <!-- 操作框 -->
        <div class="card-body buttonBox" style="text-align:center;" v-if="!briefmode">
          <button id="upgrade" @click="upgrade(Artifacts.symbol)" class="btn btn-sm float-start" :disabled="Artifacts.level >= 20">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#257ad7" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
              <path
                d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"
              />
            </svg>
          </button>
          <button id="initArtifact" @click="init(Artifacts.symbol)" :class="'btn btn-sm ' + (Artifacts.level === 0 ? 'hide' : '')">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#037728" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </button>
          <button id="deleteArtifact" @click.stop="deleteArtifact(Artifacts.symbol)" class="btn btn-sm float-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#c90000" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- flex填充 -->
      <div class="ArtifactsBox card rounded" v-for="i in fillCount" :key="i" style="visibility:hidden;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "artifact-list",
    data() {
      return {
        state: this.$store.state,
        // 当前渲染列表
        ArtifactsRenderList: [],
        // 填充
        anchor: 0,
        fillCount: 0,
        filltop: 0,
        fillbottom: 0,
        itemMax: 0,
        waiting: null,
      };
    },
    props: {
      // 传入列表
      rawdata: {
        type: Object,
        default() {
          return {};
        },
      },
      // 当前圣遗物symbol
      showsymbol: {
        type: String,
        default: "",
      },
      // 列表模式
      briefmode: {
        type: Boolean,
        default: true,
      },
      // 圣遗物强化质量
      entryquality: {
        type: [String, Number],
        default: -1,
      },
    },
    mounted() {
      // 先记录scrollTop，调用vmList后会重置scrollTop值
      let scroll = this.$store.state.scrollTop;
      // 读取语言
      this.$i18n.locale = this.state.language;
      // 滚动监听
      this.$refs.listContainer.addEventListener("scroll", this.throttle(this.vmList));
      // 监听窗口大小
      window.addEventListener("resize", this.vmList);
      // 返回界面时回到记录位置
      this.$nextTick(() => {
        this.vmList();
        this.$refs.listContainer.scrollTop = scroll;
      });
    },
    beforeUnmount() {
      // 移除监听器
      this.$refs.listContainer.removeEventListener("scroll", this.throttle(this.vmList));
      window.removeEventListener("resize", this.vmList);
      // 卸载前记录列表滚动条位置
      this.$store.commit("saveScroll", this.$refs.listContainer.scrollTop);
    },
    watch: {
      rawdata: {
        handler(val, old) {
          // 列表数量变化时才调用vmList计算渲染列表
          if (val.length !== old.length) {
            this.vmList(false);
          }
          this.vmList(false);
        },
        deep: true,
      },
      ArtifactsRenderList: {
        handler(val, old) {
          if (val.length !== old.length) {
            this.changeFillCount();
          }
        },
        deep: true,
      },
      briefmode() {
        this.$refs.listContainer.scrollTop = 0;
      },
    },
    methods: {
      changeShowSymbol(symbol, isNew) {
        // 此时并未同步数据，需要自己处理掉isNew状态（如果有）
        if (isNew) {
          // 点击后移除新遗物状态
          this.$artifact.notNew(symbol);
          for (let item of this.ArtifactsRenderList) {
            if (item.symbol === symbol) {
              item.isNew = false;
            }
          }
        }
        this.$emit("changeshowsymbol", symbol);
      },
      createArtifact() {
        this.$emit("create");
      },
      upgrade(symbol, entry = "") {
        if (this.$artifact.upgrade(symbol, entry, this.entryquality)) {
          this.$emit("alert", this.$t("handle.upSuccess"));
        } else {
          this.$emit("alert", this.$t("handle.maxLv"));
        }
        this.syncListData();
      },
      init(symbol) {
        this.$artifact.reset(symbol);
        this.syncListData();
      },
      deleteArtifact(symbol) {
        this.$artifact.deleteOne(symbol);
        this.$emit("changeshowsymbol", "");
        this.syncListData();
      },
      mobileShow() {
        this.$emit("mobileshow");
      },
      // 选择语言
      changeLanguage(language) {
        this.$store.commit("language", language);
        this.$i18n.locale = language;
        this.syncListData();
      },
      // 数据同步
      syncListData() {
        this.$emit("sync");
      },
      // 图片动态路径
      imgUrl(symbol) {
        try {
          let item = this.$artifact.getArtifact(symbol),
            src = require("../assets/images/Artifacts/" + item.set.replace(/\s+/g, "") + "/" + item.part + ".png");
          return src;
        } catch (error) {
          console.log(error);
          return "";
        }
      },
      // 图片动态路径-侧面头像
      sideUrl(equipped) {
        if (equipped) {
          let src;
          try {
            src = require("../assets/images/avatars_side/" + equipped.replace(/\s+/g, "_") + "_side.png");
            return src;
          } catch {
            src = require("../assets/images/genshin_emoji/Icon_Emoji_003_Paimon_Hehe.png");
            return src;
          }
        }
        return "";
      },
      // 点击效果
      clickMethod(event, type) {
        if (type) {
          event.currentTarget.classList.add("isClick");
        } else {
          event.currentTarget.classList.remove("isClick");
        }
      },
      // 填充（flex）
      changeFillCount() {
        this.fillCount = this.itemMax - (this.ArtifactsRenderList.length % this.itemMax);
        if (this.fillCount === this.itemMax) this.fillCount = 0;
      },
      // 节流函数
      throttle(fn) {
        this.waiting = null;
        return function() {
          if (!this.waiting) {
            this.waiting = setTimeout(() => {
              fn.apply(this, arguments);
              this.waiting = null;
            }, 100);
          }
        };
      },
      // 虚拟列表
      vmList(unchange = true) {
        // console.log("vmlist");
        const scroll = this.$refs.listContainer;
        const rem = Number.parseFloat(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.slice(0, -2));
        // 计算渲染数量
        let viewH = scroll.offsetHeight;
        // 获取1rem
        let itemContainerWidth = this.$refs.itemContainer.offsetWidth;
        let itemH = 0;
        let renderRow = 0;
        // 计算每行最大数量 ***合并***
        if (itemContainerWidth < 540) {
          this.itemMax = 2;
        } else {
          this.itemMax = Math.floor(itemContainerWidth / (11.25 * rem));
        }
        // 计算单个item高度
        if (this.rawdata.length > 0) {
          let item = document.getElementsByClassName("ArtifactsBox")[0];
          let totalHeight = 0;
          // 获取item高度
          try {
            itemH = item.getBoundingClientRect().height + 1.5 * rem;
          } catch (error) {
            this.briefmode ? (itemH = 8 * rem) : (itemH = 19 * rem);
          }
          // 计算渲染列表行数
          renderRow = Math.ceil(viewH / itemH) * 3;
          // 计算列表总高度
          totalHeight = Math.ceil(this.rawdata.length / this.itemMax) * itemH;
          // 滚动高度到达一定值时刷新列表
          if (Math.abs(this.anchor - scroll.scrollTop) > viewH) {
            this.anchor = scroll.scrollTop;
          } else {
            if (unchange) {
              this.changeFillCount();
              return;
            }
          }
          // 列表不够直接返回
          if (this.rawdata.length < renderRow * this.itemMax) {
            this.filltop = 0;
            if (this.rawdata.length - renderRow * this.itemMax >= 0) {
              this.fillbottom = totalHeight - (this.ArtifactsRenderList.length / this.itemMax) * itemH;
            } else {
              this.fillbottom = 0;
            }
            this.ArtifactsRenderList = this.rawdata;
            this.changeFillCount();
            return;
          } else {
            // 当滚动到位置时更新渲染列表
            if (scroll.scrollTop > viewH) {
              // 该被隐藏的item数量
              let topHideRow = Math.floor((scroll.scrollTop - viewH) / itemH),
                renderList = [],
                renderIndex = 0;
              // 浅拷贝renderList:
              for (let index in this.rawdata) {
                if (index >= topHideRow * this.itemMax && index < topHideRow * this.itemMax + renderRow * this.itemMax) {
                  renderList[renderIndex] = this.rawdata[index];
                  renderIndex++;
                }
              }
              // 更新渲染列表
              this.ArtifactsRenderList = renderList;
              // 当滚动距离超出总高度时，重置上半填充
              if (scroll.scrollTop > totalHeight) {
                scroll.scrollTop = 0;
                this.filltop = 0;
              } else {
                // 上半填充高度
                this.filltop = topHideRow * itemH;
              }
              // 下半填充高度
              this.fillbottom = totalHeight - this.filltop - Math.ceil(renderList.length / this.itemMax) * itemH;
              this.changeFillCount();
              // 调试信息：
              // console.log("itemMax: " + this.itemMax + "\nitemOffsetTop: " + item.offsetTop +
              //     "\ntotalH: " + totalHeight + "\ntopHideRow: " + topHideRow +
              //     "\nrenderLength: " + this.ArtifactsRenderList.length + "\nScroll: " + scroll
              //     .scrollTop)
            } else {
              this.filltop = 0;
              // 确定渲染列表
              this.ArtifactsRenderList = this.rawdata.slice(0, renderRow * this.itemMax);
              // 计算下方填充，列表数量大于渲染数量时计算，否则为0
              if (this.rawdata.length - renderRow * this.itemMax >= 0) {
                this.fillbottom = totalHeight - (this.ArtifactsRenderList.length / this.itemMax) * itemH;
              } else {
                this.fillbottom = 0;
              }
              this.changeFillCount();
            }
          }
        } else {
          // 清空列表
          this.ArtifactsRenderList.length = 0;
          this.filltop = 0;
          this.fillbottom = 0;
          this.changeFillCount();
          // 默认高度
          this.briefmode === true ? (itemH = 8 * rem) : (itemH = 19 * rem);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .list-container {
    position: relative;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.2);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0;
    height: 100%;
    width: 100%;

    .item-container {
      user-select: none;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: center;
    }

    .tips {
      position: absolute;
      top: 45%;
      left: 0;
      width: 100%;
      color: $genshin_gray;
      font-size: 1.5rem;
      text-align: center;
      opacity: 0.5;

      span {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    &::-webkit-scrollbar {
      width: 0.4rem;
      transition: ease 0.2s all;
      background: transparentize($genshin_gray, 0.6);
    }

    &::-webkit-scrollbar-thumb {
      // 滚动条里面小方块
      border-radius: 0.625rem;
      background: rgb(246, 244, 243);
    }

    &::-webkit-scrollbar-track {
      // 滚动条里面轨道
      // box-shadow: inset 0 0 0.3125rem rgba(0, 0, 0, 0.2);
      border-radius: 0.1875rem;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  // ArtifactsBox

  .ArtifactsBox {
    position: relative;
    z-index: 1;
    margin: 0.75rem 0.625rem;
    width: 10rem;
    font-size: 0.8rem;
    transition: ease 0.2s all;
    // overflow: hidden;
    border: none !important;
    background-color: $genshin_white !important;

    &:hover::after {
      content: "";
      pointer-events: none;
      position: absolute;
      z-index: -1;
      inset: -0.125rem;
      border-radius: 0.25rem;
      border: 0.125rem #fff solid;
    }

    .ArtifactsTitle {
      position: relative;
      background-position: 4.5rem 0.6rem, center;
      background-size: 5rem, 100%;
      background-repeat: no-repeat;
      background-blend-mode: normal, color-burn;

      &:hover {
        filter: brightness(1.1);
      }

      .islock {
        position: absolute;
        left: 0.0625rem;
        top: 0.0625rem;
        background-color: transparentize($genshin_dark, 0.3);
        border-radius: 0.25rem;
        padding: 0.0625rem 0.1875rem 0;
        height: 0.9375rem;
        line-height: 0.8rem;
      }

      .equipped {
        pointer-events: none;
        position: absolute;
        z-index: 3;
        top: -0.25rem;
        right: -0.375rem;
        width: 1.75rem;
        height: 1.75rem;
        border: solid 2px $genshin_white;
        background-color: rgb(91, 99, 114);
        border-radius: 3rem;

        img {
          height: 160%;
          width: 160%;
          margin: -0.875rem 0 0 -0.4375rem;
        }
      }

      .mobileShow {
        position: absolute;
        inset: 0 0 0 0;
      }
    }

    .highScoreAward {
      position: absolute;
    }

    .card-body {
      &:first-child {
        // background-color: rgb(195, 133, 66);
        // background-image: linear-gradient(135deg,rgb(148,97,48),rgb(194,122,46));
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 1.5625rem;
        color: #fff;
        padding: 0.625rem 0.9375rem;

        .badge {
          background-color: rgb(57, 68, 79);
          padding: 0.1875rem 0.25rem 0.1875rem;
        }
      }
    }

    .buttonBox {
      background-color: rgb(255, 231, 187);
      padding: 0.3125rem 0.9375rem;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    ul li {
      color: $genshin_dark;
      background-color: $genshin_white;
      font-size: 0.75rem;
      white-space: nowrap;
    }
  }

  .upgradeCheat {
    display: inline-block;
    position: absolute;
    right: 0.3125rem;
  }
</style>
