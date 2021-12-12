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
    <div class="scroll-container" :style="{ minHeight: totalHeight + 'px' }">
      <div class="item-container" ref="itemContainer" :style="{ transform: 'translateY(' + transY + 'px)' }">
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
              borderRadius: '.25rem .25rem 1.5625rem',
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
            <div class="levelStar"></div>
            <div class="card-text" style="color:rgb(223,185,170);white-space:nowrap" :style="{ fontSize: $i18n.locale === 'en' ? '0.75rem' : 'inherit' }">
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
        </div>
        <!-- flex填充 -->
        <div class="ArtifactsBox card rounded" v-for="i in fillCount" :key="i" style="visibility:hidden;"></div>
      </div>
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
        totalHeight: 0,
        fillCount: 0,
        transY: 0,
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
    },
    mounted() {
      // 先记录scrollTop，调用vmList后会重置scrollTop值
      let scroll = this.$store.state.scrollTop;
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
            this.vmList();
          }
          this.vmList();
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
  src = new URL(`../assets/images/Artifacts/${item.set.replace(/\s+/g, "")}/${item.part}.png`, import.meta.url).href;

            // src = require(`../assets/images/Artifacts/${item.set.replace(/\s+/g, "")}/${item.part}.png`);
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
  src = new URL(`../assets/images/avatars_side/${equipped.replace(/\s+/g, "_")}_side.png`, import.meta.url).href;
            
            // src = require(`../assets/images/avatars_side/${equipped.replace(/\s+/g, "_")}_side.png`);
            return src;
          } catch {
  src = new URL("../assets/images/genshin_emoji/Icon_Emoji_003_Paimon_Hehe.png", import.meta.url).href;

            // src = require("../assets/images/genshin_emoji/Icon_Emoji_003_Paimon_Hehe.png");
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
            }, 200);
          }
        };
      },
      // 虚拟列表
      vmList() {
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
            itemH = 8 * rem;
          }
          // 计算渲染列表行数
          renderRow = Math.ceil(viewH / itemH) * 3;
          // 计算列表总高度
          totalHeight = Math.ceil(this.rawdata.length / this.itemMax) * itemH;
          this.totalHeight = totalHeight;
          // 滚动高度到达一定值时刷新列表
          if (Math.abs(this.anchor - scroll.scrollTop) > viewH) {
            this.anchor = scroll.scrollTop;
          }
          // 列表不够直接返回
          if (this.rawdata.length < renderRow * this.itemMax) {
            this.transY = 0;
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
              // 当滚动距离超出总高度时，重置偏移
              if (scroll.scrollTop > totalHeight) {
                scroll.scrollTop = 0;
                this.transY = 0;
              } else {
                // 偏移高度
                this.transY = topHideRow * itemH;
              }
              this.changeFillCount();
              // 调试信息：
              // console.log("itemMax: " + this.itemMax + "\nitemOffsetTop: " + item.offsetTop +
              //     "\ntotalH: " + totalHeight + "\ntopHideRow: " + topHideRow +
              //     "\nrenderLength: " + this.ArtifactsRenderList.length + "\nScroll: " + scroll
              //     .scrollTop)
            } else {
              this.transY = 0;
              // 确定渲染列表
              this.ArtifactsRenderList = this.rawdata.slice(0, renderRow * this.itemMax);
              this.changeFillCount();
            }
          }
        } else {
          // 清空列表
          this.ArtifactsRenderList.length = 0;
          this.totalHeight = 0;
          this.transY = 0;
          this.changeFillCount();
          // 默认高度
          itemH = 8 * rem;
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

      .levelStar {
        height: 1rem;
        width: 5rem;
        background-image: url(../assets/svg/star.svg);
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

    ul li {
      color: $genshin_dark;
      background-color: $genshin_white;
      font-size: 0.75rem;
      white-space: nowrap;
    }
  }
</style>
