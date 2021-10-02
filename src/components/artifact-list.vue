<template>
    <!-- 列表容器 -->
    <div class="list-container" ref="listContainer">
        <div class="tips" v-if="$artifact.AUSList.length===0 && state.language==='zh'">列表里还没有圣遗物。<br><span
                @click="createArtifact">创建</span>一个吧！<br><span @click="changeLanguage('en')">Use English?</span></div>
        <div class="tips" v-if="$artifact.AUSList.length===0 && state.language==='en'">There's no artifact
            here.<br><span @click="createArtifact">Random?</span><br><span @click="changeLanguage('zh')">使用中文</span>
        </div>
        <!-- 渲染容器 -->
        <div class="item-container" ref="itemContainer"
            :style="{paddingTop:filltop+'px',paddingBottom:fillbottom+'px'}">
            <div v-for="(Artifacts,index) in ArtifactsRenderList" :id="'artifact-'+index"
                class="ArtifactsBox card rounded shawdow-sm" :class="(Artifacts.symbol===showsymbol?'isSelect':'')"
                :key="index" @click="changeShowSymbol(Artifacts.symbol)">
                <div class="card-body ArtifactsTitle"
                    :style="{backgroundImage:'url('+ imgUrl(Artifacts.symbol) + ')'+(Artifacts.symbol===showsymbol?',url('+ state.symbolSrc +')':''),borderRadius:briefmode?'.25rem .25rem 1.5625rem':''}">
                    <div class="islock" v-if="Artifacts.lock">
                        <svg t="1631861008451" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4168" width="0.5rem" height="0.5rem"
                            fill="rgb(255,138,117)">
                            <path
                                d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z"
                                p-id="4169"></path>
                        </svg>
                    </div>
                    <div class="card-text"
                        :style="{fontSize:$i18n.locale==='zh'?'0.9rem':'0.75rem',whiteSpace:'nowrap'}">
                        {{ Artifacts.part }}</div>
                    <div class="levelStar">
                        <span v-for="i in 5" :key="i" style="margin-right: 2px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32"
                                class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                    </div>
                    <div class="card-text" style="color:rgb(223,185,170);white-space:nowrap"
                        :style="{fontSize:$i18n.locale==='en'?'0.5rem':'inherit'}">
                        {{ Artifacts.mainEntry }} </div>
                    <div>{{ Artifacts.mainEntryValue }} <span
                            class="badge float-end fw-normal">+{{ Artifacts.level }}</span></div>
                    <a id="mobileShow" data-bs-toggle="offcanvas" href="#offcanArtifactShow"
                        aria-controls="offcanArtifactShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"
                            class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                    </a>
                    <div class="isNew" v-if="Artifacts.isNew">{{ $t('tips.new') }}</div>
                    <div class="equipped" v-if="Artifacts.equipped>0">
                        Use
                    </div>
                </div>
                <ul class="list-group list-group-flush" v-if="!briefmode">
                    <li v-for="(entry,index2) in Artifacts.entry" :key="index2" class="list-group-item"
                        @click="upgrade(Artifacts.symbol,index2)">{{ entry[0]+"+"+entry[1] }}
                        <span class="badge bg-primary upgradeCheat" v-show="Artifacts.level<20">+</span>
                    </li>
                    <li class="list-group-item" v-if="Artifacts.entry.length === 3">——</li>
                </ul>
                <!-- 操作框 -->
                <div class="card-body buttonBox" style="text-align:center;" v-if="!briefmode">
                    <button id="upgrade" @click="upgrade(Artifacts.symbol)" class="btn btn-sm float-start"
                        :disabled="Artifacts.level >= 20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#257ad7"
                            class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path
                                d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                        </svg>
                    </button>
                    <button id="initArtifact" @click="init(Artifacts.symbol)"
                        :class="'btn btn-sm ' + (Artifacts.level===0?'hide':'')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#037728"
                            class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path
                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                            <path fill-rule="evenodd"
                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                        </svg>
                    </button>
                    <button id="deleteArtifact" @click.stop="deleteArtifact(Artifacts.symbol)"
                        class="btn btn-sm float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#c90000"
                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- flex填充 -->
            <div class="ArtifactsBox card rounded" v-for="i in fillCount" :key="i" style="visibility:hidden;">
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
                fillCount: 0,
                filltop: 0,
                fillbottom: 0,
                itemMax: 0
            }
        },
        props: {
            // 传入列表
            rawdata: {
                type: Object,
                default () {
                    return {}
                }
            },
            // 当前圣遗物symbol
            showsymbol: {
                type: String,
                default: ''
            },
            // 列表模式
            briefmode: {
                type: Boolean,
                default: true
            },
            // 圣遗物强化质量
            entryquality: {
                type: [String, Number],
                default: -1
            }
        },
        mounted() {
            // 先记录scrollTop，调用vmList后会重置scrollTop值
            let scroll = this.$store.state.scrollTop;
            // 读取语言
            this.$i18n.locale = this.state.language;
            // 滚动监听
            this.$refs.listContainer.addEventListener("scroll", this.vmList);
            // 监听窗口大小
            window.addEventListener("resize", this.vmList);
            // 返回界面时回到记录位置
            this.$nextTick(() => {
                this.vmList();
                this.$refs.listContainer.scrollTop = scroll;
            })
        },
        beforeUnmount() {
            // 移除监听器
            this.$refs.listContainer.removeEventListener("scroll", this.vmList);
            window.removeEventListener("resize", this.vmList);
        },
        watch: {
            rawdata: {
                handler() {
                    this.vmList(false);
                },
                deep: true
            },
            ArtifactsRenderList() {
                this.changeFillCount();
            }
        },
        methods: {
            changeShowSymbol(symbol) {
                // 点击后移除新遗物状态
                this.$artifact.notNew(this.$artifact.getIndex(symbol));
                this.$emit("changeshowsymbol", symbol);
            },
            createArtifact() {
                this.$emit("create");
            },
            upgrade(symbol, entry = "") {
                if (this.$artifact.upgrade(this.$artifact.getIndex(symbol), entry, this.entryquality)) {
                    this.$emit("alert", this.$t('handle.upSuccess'));
                } else {
                    this.$emit("alert", this.$t('handle.maxLv'));
                }
                this.syncListData();
            },
            init(symbol) {
                this.$artifact.reset(this.$artifact.getIndex(symbol));
                this.syncListData();
            },
            deleteArtifact(symbol) {
                this.$artifact.deleteOne(this.$artifact.getIndex(symbol));
                this.$emit("changeshowsymbol", "");
                this.syncListData();
            },
            // 选择语言
            changeLanguage(language) {
                this.$store.commit('language', language);
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
                    let index = this.$artifact.getIndex(symbol),
                        item = this.$artifact.AUSList[index],
                        src = require('../assets/images' + "/" + item.suit.replace(/\s+/g, "") + "/" + item.part +
                            ".png");
                    return src;
                } catch (error) {
                    console.log(error);
                    return '';
                }
            },
            // 填充（flex）
            changeFillCount() {
                this.fillCount = this.itemMax - (this.ArtifactsRenderList.length % this.itemMax);
                if (this.fillCount === this.itemMax) this.fillCount = 0;
            },
            // 虚拟列表
            vmList(unchange = true) {
                // 记录相对高度（this.$store.state.scrollTop为全局变量）
                const scroll = this.$refs.listContainer;
                this.$store.commit('saveScroll', scroll.scrollTop);
                // 计算渲染数量
                // 获取1rem
                let html = document.getElementsByTagName("html"),
                    viewH = scroll.offsetHeight,
                    rem = Number.parseFloat(window.getComputedStyle(html[0]).fontSize.slice(0, -2)),
                    itemContainerWidth = this.$refs.itemContainer.offsetWidth,
                    itemH = 0,
                    renderRow = 0;
                // 计算每行最大数量 ***合并***
                if (itemContainerWidth < 540) {
                    this.itemMax = 2;
                } else {
                    this.itemMax = Math.floor(itemContainerWidth / (11.25 * rem));
                }
                // 计算单个item高度
                if (this.rawdata.length > 0) {
                    let item = document.getElementsByClassName("ArtifactsBox")[0],
                        totalHeight = 0;
                    // 获取item高度
                    try {
                        itemH = item.getBoundingClientRect().height + 1.5 * rem;
                    } catch (error) {
                        this.briefmode ? itemH = 8 * rem : itemH = 19 * rem;
                    }
                    // 计算渲染列表行数
                    renderRow = Math.ceil(viewH / itemH) * 3;
                    // 计算列表总高度
                    totalHeight = Math.ceil(this.rawdata.length / this.itemMax) * itemH;
                    // 列表不够直接返回
                    if (this.rawdata.length < renderRow * this.itemMax) {
                        this.filltop = 0;
                        if ((this.rawdata.length - renderRow * this.itemMax) >= 0) {
                            this.fillbottom = totalHeight - ((this.ArtifactsRenderList.length / this.itemMax) *
                                itemH);
                        } else {
                            this.fillbottom = 0;
                        }
                        this.ArtifactsRenderList = this.rawdata;
                        this.changeFillCount();
                        return;
                    } else {
                        // 当滚动到位置时更新渲染列表
                        if (scroll.scrollTop > (itemH + viewH)) {
                            // 该被隐藏的item数量
                            let topHideRow = Math.floor((scroll.scrollTop - viewH) / itemH),
                                renderList = this.rawdata.slice(topHideRow * this.itemMax, topHideRow * this.itemMax +
                                    renderRow * this.itemMax),
                                needUpdate = true;
                            // 判断列表是否需要更新
                            if (this.ArtifactsRenderList.length > 0 && renderList.length >= Math.ceil(viewH / itemH)) {
                                for (let i = 0; i < renderList.length; i++) {
                                    if (i === renderList.length) break;
                                    // 设置在渲染列表中设置前后锚点，若其中一个不在renderList中则刷新列表
                                    let refreshItem = (renderRow / 3) * this.itemMax;
                                    if (renderList.indexOf(this.ArtifactsRenderList[refreshItem]) !== -1 &&
                                        renderList.indexOf(this.ArtifactsRenderList[2 * refreshItem]) !== -1) {
                                        needUpdate = false;
                                        break;
                                    }
                                }
                            }
                            // 列表移动距离不大且原数据未变更则不更新，否则重新计算填充和更新
                            if (!needUpdate && !!unchange) {
                                this.changeFillCount();
                                return;
                            } else {
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
                                this.fillbottom = totalHeight - this.filltop - (Math.ceil(renderList
                                    .length / this.itemMax) * itemH);
                                this.changeFillCount();
                                // 调试信息：
                                // console.log("itemMax: " + this.itemMax + "\nitemOffsetTop: " + item.offsetTop +
                                //     "\ntotalH: " + totalHeight + "\ntopHideRow: " + topHideRow +
                                //     "\nrenderLength: " + this.ArtifactsRenderList.length + "\nScroll: " + scroll
                                //     .scrollTop)
                            }
                        } else {
                            this.filltop = 0;
                            // 确定渲染列表
                            this.ArtifactsRenderList = this.rawdata.slice(0, renderRow * this.itemMax);
                            // 计算下方填充，列表数量大于渲染数量时计算，否则为0
                            if ((this.rawdata.length - renderRow * this.itemMax) >= 0) {
                                this.fillbottom = totalHeight - ((this.ArtifactsRenderList.length / this.itemMax) *
                                    itemH);
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
                    (this.briefmode === true) ? itemH = 8 * rem: itemH = 19 * rem;
                }
            }
        }
    }
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

        .item-container {
            user-select: none;
            overflow-x: hidden;
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
            width: .4rem;
            transition: ease 0.2s all;
            background: rgba(128, 128, 128, 0.5);
        }

        &::-webkit-scrollbar-thumb {
            // 滚动条里面小方块
            border-radius: .625rem;
            background: rgb(246, 244, 243);
        }

        &::-webkit-scrollbar-track {
            // 滚动条里面轨道
            // box-shadow: inset 0 0 0.3125rem rgba(0, 0, 0, 0.2);
            border-radius: .1875rem;
            background: rgba(0, 0, 0, 0.2);
        }
    }

    // ArtifactsBox
    .isSelect {
        &::before {
            content: "";
            position: absolute;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: .0625rem solid #ffffff;
            border-radius: .25rem;
            animation: artifactSelect2 ease 1s forwards;
        }

        &::after {
            content: "";
            position: absolute;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: .0625rem solid #ffffff;
            border-radius: .25rem;
            animation: artifactSelect ease 1s infinite;
        }
    }

    .ArtifactsBox {
        margin: .75rem .625rem;
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
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            border-radius: .25rem;
            border: 2px #fff solid;
        }

        .ArtifactsTitle {
            position: relative;
            background-position: 4.5rem 0.6rem, -4.7rem -7.7rem;
            background-size: 5rem, 19rem;
            background-repeat: no-repeat;
            background-blend-mode: normal, color-burn;

            .islock {
                position: absolute;
                left: 0.25rem;
                top: 0.25rem;
                background-color: rgba(74, 83, 102, 0.7);
                border-radius: 0.25rem;
                padding: 0 0.125rem;
                height: 0.8rem;
                line-height: 0.8rem;
            }

            .equipped {
                color: rgb(102, 34, 46);
                background-color: rgba(102, 34, 46, 0.5);
                border-radius: .25rem;
                border: solid .0625rem rgb(102, 34, 46);
                font-size: .7rem;
                line-height: .7rem;
                padding: .2rem;
                position: absolute;
                z-index: 3;
                bottom: 0.0625rem;
                left: 50%;
            }
        }

        .highScoreAward {
            position: absolute;
        }

        .card-body {
            &:first-child {
                background-color: rgb(195, 133, 66);
                border-top-left-radius: .25rem;
                border-top-right-radius: .25rem;
                border-bottom-right-radius: 1.5625rem;
                color: #fff;
                padding: .625rem .9375rem;

                .badge {
                    background-color: rgb(57, 68, 79);
                    padding: .1875rem .25rem .1875rem;
                }
            }
        }

        .buttonBox {
            background-color: rgb(255, 231, 187);
            padding: .3125rem .9375rem;
            border-bottom-left-radius: .25rem;
            border-bottom-right-radius: .25rem;
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
        right: .3125rem;
    }

    #mobileShow {
        position: absolute;
        top: .625rem;
        right: .625rem;
    }
</style>