<template>
  <!-- loading -->
  <div id="loading" :class="isLoad ? 'hide' : ''">
    <div class="loading-box">
      <div class="loading-progress" :style="{ width: loadProgress + '%' }"></div>
    </div>
  </div>
  <!-- /loading -->
  <!-- nav -->
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container-fluid">
      <div class="siteTitle position-relative">
        <a data-bs-toggle="offcanvas" href="#offcanMenu" aria-controls="offcanMenu">{{ title }}</a>
      </div>
    </div>
  </nav>
  <!-- /nav -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanMenu" aria-labelledby="offcanvasMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">模拟器说明</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="genshin-notice">
        <h3>仅供娱乐，请勿作为实际游戏参考</h3>
        <div class="msg-box">
          <h4>◆ 数据存储</h4>
          <p>
            这是一个仅前端的项目。<br />
            本模拟器采用本地存储，使用localStorage、indexedDb保存设置和数据。<br />
            遇到bug就清理一下缓存，或者看看git上更新没有。<del>都不行就只能辱骂作者了。</del>><a href="https://github.com/DioMao" target="_blank">DioMao</a>
          </p>
        </div>
        <p>本模拟器采用本地存储，不上传任何数据。</p>
        <h4>1. 自选圣遗物说明</h4>
        <p>
          自选圣遗物时，依次选择套装、位置、主词条和副词条。未选择的属性会随机生成。
        </p>
        <p>
          自选圣遗物时，副词条可以留空，这种情况会生成主属性符合且随机副词条的圣遗物。自选了副词条但不足3条时，模拟器会随机选择符合条件的副词条补至3条，且不会生成第四副词条。
        </p>
        <h4>2. 圣遗物评分说明</h4>
        <p>1) 预设模式</p>
        <p>预设模式是根据已有的设定来进行分数估算。<del>目前还没有完善，实际是选什么算什么。</del></p>
        <p>2) 自选模式</p>
        <p>顾名思义，选中哪几个就算哪几个的总分。</p>
        <p>3) 高分圣遗物标准</p>
        <p>自定高分圣遗物标准，可选区间为20到50分。</p>
        <h4>3. 删除和清空列表</h4>
        <p>
          单独删除圣遗物是可以撤销的。清空列表比较大力，生效了就不能找回了。
        </p>
        <h4>4. 列表模式【已废弃】</h4>
        <p>
          出于性能和界面美观考虑，已移除详细列表模式。
        </p>
        <h4>5. 副词条提升幅度</h4>
        <p>
          副词条一共分四个档位，每次升级时会随机选择，设置里可以自选提升幅度。比如选择4，则每次强化提升数值的都是最大值。
        </p>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
  import 'bootstrap/js/dist/offcanvas';
  // import {getCurrentInstance} from "vue";

  export default {
    data() {
      return {
        title: '',
        loadProgress: 0,
        isLoad: false, // 加载界面显示（isLoad表示页面加载是否完成）
        // 预载图片列表
        imgList: [require('@/assets/images/genshin-symbol.png'), require('@/assets/images/fog.png'), require('@/assets/images/item_bg.png')]
      };
    },
    mounted() {
      this.title = this.$t('title');
      this.loading();
    },
    computed: {
      language() {
        // @ts-ignore
        return this.$store.state.language;
      }
    },
    watch: {
      language() {
        this.title = this.$t('title');
      },
      loadProgress(val) {
        let that = this;
        if (val == 100) {
          setTimeout(function() {
            // that.loadProgress = 100;
            that.isLoad = true;
          }, 500);
        }
      }
    },
    methods: {
      loading() {
        let that = this;
        // 确认字体加载状态
        document.fonts.ready.then(function() {
          that.loadProgress += 25;
        });
        for (let src of this.imgList) {
          let img = new Image();
          img.src = src;
          img.onload = () => {
            this.loadProgress += 25;
          };
          img.onerror = () => {
            this.loadProgress += 25;
          };
        }
      }
    }
  };
</script>

<style lang="scss">
  #app {
    width: 100%;
    user-select: none;
  }

  .navbar {
    position: fixed !important;
  }

  #loading {
    position: absolute;
    inset: 0;
    z-index: 2000;
    background-color: #fff;
    transition: 0.5s all linear;

    .loading-box {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 2rem;
      width: 13.6rem;
      margin-top: -1rem;
      margin-left: -6.8rem;
      background-color: rgb(245, 245, 245);
      mask: url(./assets/images/elements_logo.png);
      mask-image: url(./assets/images/elements_logo.png);
      -webkit-mask-image: url(./assets/images/elements_logo.png);
      mask-size: contain;
      -webkit-mask-size: contain;

      .loading-progress {
        height: 100%;
        width: 0;
        background-color: rgb(102, 102, 102);
        transition: all 0.5s ease;
      }
    }
  }

  .genshin-notice {
    color: rgb(147, 128, 106);

    h3 {
      background-color: $genshin_brown_red;
      font-size: 1.125rem;
      color: rgb(244, 216, 168);
      border-radius: 0.25rem;
      line-height: 2.125rem;
      height: 2rem;
      padding: 0 0.5rem;
    }

    h4 {
      font-size: 0.9375rem;
      color: rgb(165, 88, 67);

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 0.125rem;
        background-color: rgb(209, 192, 175);
        margin-top: 0.1875rem;
      }
    }
  }
</style>
