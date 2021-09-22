<template>
    <div id="app">
        <!-- loading -->
        <div id="loading" :class="isLoad ? 'hide' : ''">
            <div class="loading-box">
                <div class="loading-progress" :style="{ width: loadProgress + '%' }"></div>
            </div>
        </div>
        <!-- /loading -->
        <!-- nav -->
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
            <div class="container-fluid">
                <div class="siteTitle position-relative">
                    <a data-bs-toggle="offcanvas" href="#offcanMenu" aria-controls="offcanMenu">{{ $t('title') }}</a>
                </div>
            </div>
        </nav>
        <!-- /nav -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanMenu" aria-labelledby="offcanvasMenu">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">模拟器说明</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <p style="color: red">——仅供娱乐，请勿作为实际游戏参考——</p>
                    <p>本模拟器采用本地存储，脱机可用，不上传任何数据。</p>
                    <p>
                        遇到bug就清理一下缓存，或者看看git上更新没有。<del>都不行就只能辱骂作者了。</del>><a href="https://github.com/DioMao"
                            target="_blank">DioMao</a>
                    </p>
                    <p style="color: red">1. 自选圣遗物说明</p>
                    <p>
                        自选圣遗物时，依次选择位置、主词条和副词条。未选择的属性会随机生成。
                    </p>
                    <p>
                        自选圣遗物时，副词条可以留空，这种情况会生成主属性符合且随机副词条的圣遗物。自选了副词条但不足3条时，模拟器会随机选择符合条件的副词条补至3条，且不会生成第四副词条。
                    </p>
                    <p style="color: red">2. 圣遗物评分说明</p>
                    <p>1) 预设模式</p>
                    <p>
                        预设模式是根据已有的设定来进行分数估算。<del>目前还没有完善，实际是选什么算什么。</del>得分35以上的会在圣遗物列表中用红色字体标注。
                    </p>
                    <p>2) 自选模式</p>
                    <p>顾名思义，选中哪几个就算哪几个的总分。</p>
                    <p>3) 高分圣遗物标准</p>
                    <p>自定高分圣遗物标准，可选区间为20到50分。</p>
                    <p style="color: red">3. 删除和清空列表</p>
                    <p>
                        单独删除圣遗物是可以撤销的。清空列表比较大力，生效了就不能找回了。
                    </p>
                    <p style="color: red">4. 列表模式</p>
                    <p>
                        为了新功能的设计，现在圣遗物列表的默认模式改成了简洁模式。如果需要详细列表的话，可以去设置里关掉简洁模式。
                    </p>
                    <p style="color: red">5. 副词条提升幅度</p>
                    <p>
                        副词条一共分四个档位，每次升级时会随机选择，设置里可以自选提升幅度。比如选择4，则每次强化提升数值的都是最大值。
                    </p>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import 'bootstrap/js/dist/offcanvas'
    // import {getCurrentInstance} from "vue";

    export default {
        data() {
            return {
                loadProgress: 0,
                isLoad: false, // 加载界面显示（isLoad表示页面加载是否完成）
            }
        },
        mounted() {
            // 预加载图片(同时控制进度条)
            this.$axios.all([this.preLoadImg()])
                .then(this.$axios.spread(() => {

                })).catch((err => {
                    console.log(err);
                }))
        },
        watch: {
            loadProgress(val) {
                let that = this;
                if (val == 90) {
                    setTimeout(function () {
                        that.loadProgress = 100;
                        that.isLoad = true;
                    }, 500)
                }
            }
        },
        methods: {
            preLoadImg() {
                const that = this;
                let errtime = 0,
                    request = this.$axios.get(that.$store.state.symbolSrc)
                    .then(() => {
                        that.loadProgress += 90;
                        return true;
                    }).catch(err => {
                        console.log(err);
                        (errtime < 3) ? (request, errtime++) : (that.loadProgress += 15);
                    })
            }
        }
    };
</script>

<style lang="scss">
    @font-face {
        font-family: "genshin-font";
        src: url(./style/genshin_mini_artifact.ttf);
    }

    #app {
        font-family: "genshin-font";
        width: 100%;
        user-select: none;
    }

    #loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        background-color: #fff;

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

    .hide {
        display: none !important;
    }
</style>