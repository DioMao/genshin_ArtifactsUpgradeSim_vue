<template>
  <div class="user-container">
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
        <li v-for="element in artiConst.elementType" :key="element" @click="filterCharacter = element">
          <a class="dropdown-item" :class="{ itemSelected: filterCharacter === element }">{{ $t("element." + element) }}</a>
        </li>
        <!-- 武器筛选 -->
        <li class="filterLable">{{ $t("weaponType.weapon") }}</li>
        <li v-for="weapon in artiConst.weaponType" :key="weapon" @click="filterCharacter = weapon">
          <a class="dropdown-item" :class="{ itemSelected: filterCharacter === weapon }">{{ $t("weaponType." + weapon) }}</a>
        </li>
        <!-- 地区筛选 -->
        <li class="filterLable">{{ $t("nation.nation") }}</li>
        <li v-for="nation in artiConst.nation" :key="nation" @click="filterCharacter = nation">
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
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, ref, computed, watch, onMounted } from "vue";

  export default {
    name: "character-list",
    props: ["characterprop"],
    emits: ["character"],
    setup(props, context) {
      // 获取全局函数
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      // const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      const trans = globalProperties.$t;

      // 人物列表
      const characterList = ref([]);
      const selectCharacter = ref(props.characterprop || "");
      watch(selectCharacter, val => {
        context.emit("character", val);
      });
      watch(
        () => props.characterprop,
        val => {
          selectCharacter.value = val;
        }
      );
      // 人物筛选条件
      const filterCharacter = ref("default");
      watch(filterCharacter, val => {
        let filter = val;
        if (filter === "default") {
          characterList.value = artiConst.character;
        } else {
          let res = [],
            type;
          if (artiConst.elementType.indexOf(filter) > -1) {
            type = "element";
          } else if (artiConst.weaponType.indexOf(filter) > -1) {
            type = "weapon";
          } else if (artiConst.nation.indexOf(filter) > -1) {
            type = "nation";
          }
          artiConst.character.forEach(el => {
            if (type === "element" && el["element"].indexOf(filter) > -1) {
              res.push(el);
            } else if (el[type] === filter) res.push(el);
          });
          characterList.value = res;
        }
        selectCharacter.value = "";
      });
      // 填充（flex）
      const fillCount = ref(0);
      const itemMax = ref(0);

      onMounted(() => {
        // 初始化人物列表
        characterList.value = artiConst.character;
      });

      const filterShow = computed(() => {
        if (filterCharacter.value === "default") {
          return trans("msg.default");
        } else if (artiConst.elementType.indexOf(filterCharacter.value) > -1) {
          return trans("element." + filterCharacter.value);
        } else if (artiConst.weaponType.indexOf(filterCharacter.value) > -1) {
          return trans("weaponType." + filterCharacter.value);
        } else if (artiConst.nation.indexOf(filterCharacter.value) > -1) {
          return trans("nation." + filterCharacter.value);
        }
        return "-NOT FOUND THIS STRING-";
      });

      // 点击效果
      const clickMethod = (event, type) => {
        if (type) {
          event.currentTarget.classList.add("isClick");
        } else {
          event.currentTarget.classList.remove("isClick");
        }
      };
      // 人物头像链接处理
      const avatarSrc = name => {
        try {
          let src = require("../assets/images/character/Character_" + name.replace(/\s+/g, "_") + "_Thumb.png");
          return src;
        } catch (error) {
          return "";
        }
      };
      // 元素图片链接处理
      const elementSrc = name => {
        try {
          let src = require("../assets/images/elements/Element_" + name + ".png");
          return src;
        } catch (error) {
          return "";
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
        elementSrc,
        fillCount,
        itemMax,
      };
    },
    watch: {
      // characterprop(val) {
      //   this.selectCharacter = val;
      // },
      characterList() {
        this.fillFunc();
      },
    },
    methods: {
      // 计算填充
      fillFunc() {
        let boxWidth = this.$refs.characterBox.offsetWidth;
        const rem = Number.parseFloat(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.slice(0, -2));
        this.itemMax = Math.floor(boxWidth / (4.5 * rem));
        this.fillCount = this.itemMax - (this.characterList.length % this.itemMax);
        if (this.fillCount === this.itemMax) this.fillCount = 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-container {
    position: fixed;
    z-index: 5;
    width: 24rem;
    background-color: rgba(53, 57, 61, 0.9);
    background-image: linear-gradient(180deg, rgb(39, 50, 63), rgb(57, 56, 54));
    height: 100%;
    overflow: hidden;
    transition: all 0.5s ease;
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
  }
</style>
