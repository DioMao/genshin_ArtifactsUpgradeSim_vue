<template>
  <!-- 横幅模式 -->
  <div class="character-banner-container banner-wrapper" v-if="mode === 'banner'">
    <div class="character-banner">
      <div
        class="character-banner-show"
        v-for="character in characterList"
        :key="character"
        :class="{bannerSelect: character.name === selectCharacter, bannerHover: character.name !== selectCharacter}"
        @click="selectCharacter = character.name"
      >
        <img :src="avatarSideSrc(character.name)" :alt="character.name" draggable="false" />
        <div class="character-banner-select" v-if="character.name === selectCharacter"></div>
      </div>
    </div>
  </div>
  <!-- 列表模式 -->
  <div class="character-container" v-else>
    <!-- 角色筛选器 -->
    <div class="filterBox">
      <button type="button" class="btn btn-genshin dropdown-genshin-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {{ filterShow }}
      </button>
      <ul class="dropdown-menu dropdown-menu-lg-end">
        <li @click="filterCharacter = 'default'">
          <a class="dropdown-item" :class="{itemSelected: filterCharacter === 'default'}">{{ $t('msg.default') }}</a>
        </li>
        <!-- 属性筛选 -->
        <li class="filterLable">{{ $t('element.element') }}</li>
        <li v-for="element in artiConst.elementType" :key="element" @click="filterCharacter = element">
          <a class="dropdown-item" :class="{itemSelected: filterCharacter === element}">{{ $t('element.' + element) }}</a>
        </li>
        <!-- 武器筛选 -->
        <li class="filterLable">{{ $t('weaponType.weapon') }}</li>
        <li v-for="weapon in artiConst.weaponType" :key="weapon" @click="filterCharacter = weapon">
          <a class="dropdown-item" :class="{itemSelected: filterCharacter === weapon}">{{ $t('weaponType.' + weapon) }}</a>
        </li>
        <!-- 地区筛选 -->
        <li class="filterLable">{{ $t('nation.nation') }}</li>
        <li v-for="nation in artiConst.nation" :key="nation" @click="filterCharacter = nation">
          <a class="dropdown-item" :class="{itemSelected: filterCharacter === nation}">{{ $t('nation.' + nation) }}</a>
        </li>
      </ul>
    </div>
    <!-- 角色列表 -->
    <div class="list-wrapper">
      <div class="characterBox" ref="characterBox">
        <div
          class="characterShow"
          v-for="character in characterList"
          :key="character"
          :class="{isSelect: selectCharacter === character.name}"
          @click="selectCharacter = character.name"
          @mousedown="clickMethod($event, true)"
          @mouseup="clickMethod($event, false)"
          @mouseleave="clickMethod($event, false)"
        >
          <div class="avatarBox" :class="{star_5: character.rarity === 5, star_4: character.rarity === 4, star_sp: character.name === 'Aloy'}">
            <img src="@/assets/images/Background_Symbol.png" alt="symbol" draggable="false" />
            <img :src="avatarSrc(character.name)" :alt="character.name" draggable="false" />
          </div>
          <img class="elementImg" :src="elementSrc(character.element[0])" :alt="character.element[0]" draggable="false" />
          <div class="lvBox">Lv. 90</div>
        </div>
        <div class="fillItem" v-for="i in fillCount" :key="'fill_' + i"></div>
      </div>
      <!-- 自定义滚动条 -->
      <div class="genshin-vertical-scrollbar" id="vertical">
        <div class="genshin-vertical-indicator"></div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="buttonBox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {getCurrentInstance, ref, computed, watch, onMounted, nextTick} from 'vue';
  import BScroll from '@better-scroll/core';
  import MouseWheel from '@better-scroll/mouse-wheel';
  import ScrollBar from '@better-scroll/scroll-bar';
  BScroll.use(MouseWheel).use(ScrollBar);

  export default {
    name: 'character-list',
    props: {
      characterprop: {
        type: String,
        default: '',
      },
      mode: {
        type: String,
        default: 'list',
      },
    },
    emits: ['character'],
    setup(props, context) {
      // 获取全局函数
      const globalProperties = getCurrentInstance().proxy;
      // const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      const trans = globalProperties.$t;

      // 人物列表
      const characterList = ref([]);
      const selectCharacter = ref(props.characterprop || '');
      watch(selectCharacter, val => {
        context.emit('character', val);
      });
      watch(
        () => props.characterprop,
        val => {
          selectCharacter.value = val;
        }
      );
      // 人物筛选条件
      const filterCharacter = ref('default');
      watch(filterCharacter, val => {
        let filter = val;
        if (filter === 'default') {
          characterList.value = artiConst.character;
        } else {
          let res = [],
            type;
          if (artiConst.elementType.indexOf(filter) > -1) {
            type = 'element';
          } else if (artiConst.weaponType.indexOf(filter) > -1) {
            type = 'weapon';
          } else if (artiConst.nation.indexOf(filter) > -1) {
            type = 'nation';
          }
          artiConst.character.forEach(el => {
            if (type === 'element' && el['element'].indexOf(filter) > -1) {
              res.push(el);
            } else if (el[type] === filter) res.push(el);
          });
          characterList.value = res;
        }
        selectCharacter.value = '';
      });
      // 填充（flex）
      const fillCount = ref(0);
      const itemMax = ref(0);
      // better scroll
      const bannerScroll = ref({});
      const listScroll = ref({});

      onMounted(() => {
        // const vertical = document.getElementById(".vertical");
        // 初始化人物列表
        characterList.value = artiConst.character;
        // better scroll初始化
        nextTick(() => {
          // banner模式
          if (props.mode === 'banner') {
            bannerScroll.value = new BScroll(document.querySelector('.banner-wrapper'), {
              probeType: 3,
              scrollX: true,
              scrollY: false,
              click: true,
              bounceTime: 500,
              mouseWheel: true,
              // 兼容touch与鼠标事件（针对平板等设备）
              disableMouse: false,
              disableTouch: false,
            });
          } else {
            // 列表模式
            listScroll.value = new BScroll(document.querySelector('.list-wrapper'), {
              probeType: 3,
              scrollX: false,
              click: true,
              bounceTime: 500,
              mouseWheel: true,
              scrollbar: {
                customElements: [document.getElementById('vertical')],
                fade: false,
              },
              // 兼容touch与鼠标事件（针对平板等设备）
              disableMouse: false,
              disableTouch: false,
            });
          }
        });
      });

      const filterShow = computed(() => {
        if (filterCharacter.value === 'default') {
          return trans('msg.default');
        } else if (artiConst.elementType.indexOf(filterCharacter.value) > -1) {
          return trans('element.' + filterCharacter.value);
        } else if (artiConst.weaponType.indexOf(filterCharacter.value) > -1) {
          return trans('weaponType.' + filterCharacter.value);
        } else if (artiConst.nation.indexOf(filterCharacter.value) > -1) {
          return trans('nation.' + filterCharacter.value);
        }
        return '-NOT FOUND THIS STRING-';
      });

      // 点击效果
      const clickMethod = (event, type) => {
        if (type) {
          event.currentTarget.classList.add('isClick');
        } else {
          event.currentTarget.classList.remove('isClick');
        }
      };
      // 人物头像链接处理
      const avatarSrc = name => {
        try {
          let src = require(`@/assets/images/character/Character_${name.replace(/\s+/g, '_')}_Thumb.png`);
          return src;
        } catch (error) {
          return '';
        }
      };
      // 人物侧面头像链接
      const avatarSideSrc = name => {
        let src;
        try {
          src = require(`@/assets/images/avatars_side/${name.replace(/\s+/g, '_')}_side.png`);
          return src;
        } catch {
          src = require('@/assets/images/genshin_emoji/Icon_Emoji_003_Paimon_Hehe.png');
          return src;
        }
      };
      // 元素图片链接处理
      const elementSrc = name => {
        try {
          let src = require(`@/assets/images/elements/Element_${name}.png`);
          return src;
        } catch (error) {
          return '';
        }
      };

      return {
        artiConst,
        characterList,
        filterCharacter,
        selectCharacter,
        filterShow,
        clickMethod,
        avatarSrc,
        avatarSideSrc,
        elementSrc,
        fillCount,
        itemMax,
        bannerScroll,
      };
    },
    watch: {
      characterList() {
        if (this.mode !== 'banner') this.fillFunc();
      },
    },
    methods: {
      // 计算填充
      fillFunc() {
        let boxWidth = this.$refs.characterBox.offsetWidth;
        const rem = Number.parseFloat(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.slice(0, -2));
        this.itemMax = Math.floor(boxWidth / (4.5 * rem));
        this.fillCount = this.itemMax - (this.characterList.length % this.itemMax);
        if (this.fillCount === this.itemMax) this.fillCount = 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  // 横幅模式
  .character-banner-container {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    white-space: nowrap;
    overflow: hidden;

    .character-banner {
      display: inline-block;
      // display: flex;
      // flex-wrap: nowrap;
      white-space: nowrap;

      .character-banner-show {
        display: inline-block;
        position: relative;
        margin: 0.75rem 0.5rem;
        border: solid 0.1875rem transparentize($genshin_gray_light, 0.5);
        border-radius: 4rem;
        background-color: rgba(0, 0, 0, 0.35);
        text-align: center;

        &::before {
          content: '';
          display: block;
          height: 3rem;
          width: 3rem;
        }

        .character-banner-select {
          position: absolute;
          inset: auto -0.5rem -0.75rem -0.5rem;
          height: 0.125rem;
          background-color: $genshin_cyan_blue;
          animation: banner-select ease-in-out 0.2s forwards;
        }

        img {
          position: absolute;
          top: -0.9375rem;
          left: -0.5rem;
          width: 4rem;
          transition: all 0.2s ease-in-out;
        }
      }

      .bannerHover {
        &:hover {
          animation: banner-hover 0.6s linear forwards;
        }
      }

      .bannerSelect {
        background-color: transparentize($genshin_cyan_blue, 0.25);
        border: solid 0.1875rem transparentize($genshin_cyan_blue, 0.25);

        img {
          transform: scale(1.1) translateY(-5%);
        }
      }
    }
  }
  // 列表模式
  .character-container {
    position: fixed;
    z-index: 5;
    width: 24rem;
    background-color: rgba(53, 57, 61, 0.9);
    background-image: linear-gradient(180deg, rgb(39, 50, 63), rgb(57, 56, 54));
    height: 100%;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .list-wrapper {
    position: relative;
    overflow: hidden;
    height: calc(100% - 10rem);

    .genshin-vertical-scrollbar {
      position: absolute;
      inset: 1rem 0.25rem 1rem auto;
      width: 0.25rem;
      background-color: transparentize($genshin_gray, 0.7);

      .genshin-vertical-indicator {
        width: 110%;
        height: 70%;
        border-radius: 6px;
        background-color: transparentize($genshin_white, 0.3);
      }
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

    .characterShow {
      position: relative;
      z-index: 3;
      background-color: $genshin_white;
      border-radius: 0.25rem;
      margin: 0.25rem;
      width: 4rem;
      transition: all 0.2s ease;

      .avatarBox {
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

          &:first-child {
            opacity: 0.2;
          }
        }
      }

      .elementImg {
        position: absolute;
        top: 0.0625rem;
        left: 0.0625rem;
        width: 1rem;
        height: 1rem;
      }

      .star_5 {
        background-image: linear-gradient(135deg, rgb(165, 95, 30), rgb(200, 115, 15));
      }

      .star_4 {
        background-image: linear-gradient(135deg, rgb(87, 83, 129), rgb(156, 114, 177));
      }

      .star_sp {
        background-image: linear-gradient(135deg, rgb(148, 86, 96), rgb(181, 78, 88));
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
        content: '';
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
            content: '✔';
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
  }

  @keyframes banner-select {
    0% {
      inset: auto 0.75rem -0.75rem 0.75rem;
    }
    100% {
      inset: auto -0.5rem -0.75rem -0.5rem;
    }
  }

  @keyframes banner-hover {
    0% {
      border: solid 0.1875rem transparentize($genshin_gray_light, 0.5);
      background-color: rgba(0, 0, 0, 0.35);
    }
    50% {
      border: solid 0.1875rem transparentize(rgb(206, 206, 206), 0.5);
      background-color: rgba(78, 78, 78, 0.25);
    }
    100% {
      border: solid 0.1875rem transparentize($genshin_gray_light, 0.5);
      background-color: rgba(0, 0, 0, 0.35);
    }
  }
</style>
