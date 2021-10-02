<template>
    <div class="ArtifactShow">
        <div class="aTitle"> {{ artifactName }} </div>
        <div class="titleLine">
            <img class="leftArrow" src="../assets/images/artifact_arrow.png" alt="artifactArrow">
            <img class="rightArrow" src="../assets/images/artifact_arrow.png" alt="artifactArrow">
        </div>
        <div class="aHead">
            {{ showdetail.part }}
            <div class="mainEntry"> {{ showdetail.mainEntry }} </div>
            <div class="mainEntryValue">{{ showdetail.mainEntryValue }}</div>
            <div class="aImg">
                <img :src="suitUrl" :alt="showdetail.part">
                <img :src="this.$store.state.symbolSrc" alt="genshin-symbol">
            </div>
            <div class="levelStar">
                <span v-for="i in 5" :key="i" style="margin-right: 3px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </span>
            </div>
        </div>
        <div class="blurLine"></div>
        <div class="aContent">
            <span class="badge">+{{ showdetail.level }}</span>
            <span class="unlock" v-if="!showdetail.lock" @click="lockChange">
                <svg t="1631860853969" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4021" width="1rem" height="1rem" fill="rgb(158,161,168)">
                    <path
                        d="M825 384H268.6c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C445.6 78.6 478.5 72 512.5 72s66.9 6.6 97.8 19.7c19.4 8.2 37.5 18.7 54.2 31.4 14.4 11 34.6 9.8 47.5-3 15.4-15.4 13.7-40.9-3.7-54.1C653.9 24.6 586.1 0 512.5 0 334 0 189.2 144.7 189.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM544.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4z"
                        p-id="4022"></path>
                </svg>
            </span>
            <span class="islock" v-else @click="lockChange">
                <svg t="1631861008451" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4168" width="1rem" height="1rem" fill="rgb(255,138,117)">
                    <path
                        d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z"
                        p-id="4169"></path>
                </svg>
            </span>
            <ul>
                <li v-for="entry in showdetail.entry" :key="entry">·{{ entry[0] + "+" + entry[1] }}</li>
            </ul>
            <div class="suitName">{{ showdetail.suit }}</div>
        </div>
        <div class="aButtonBox">
            <button class="btn btn-genshin btn-sm float-start" @click="upgrade" :disable="showdetail.level>=20">
                {{ $t('msg.upgrade') }}
            </button>
            <button class="btn btn-genshin btn-sm" @click="init" v-show="showdetail.level>0"> {{ $t('msg.reset') }}
            </button>
            <button class="btn btn-genshin btn-sm float-end del" @click="del"> {{ $t('msg.delete') }} </button>
        </div>
        <router-link :to="{path:'/artifact-'+index}" class="btn btn-toupgrade">
            <span class="circleinbox"></span>{{ $t('msg.toUpgradePage') }}
        </router-link>
        <!-- <div class="suitBox mt-2 mb-2">
            <button class="btn">Test button</button>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "artifact-show",
        data() {
            return {

            }
        },
        props: {
            showdetail: {
                type: Object,
                default () {
                    return {
                        symbol: "",
                        level: 0,
                        suit: "none",
                        part: "none",
                        mainEntry: "none",
                        mainEntryValue: 0,
                        entry: [],
                        initEntry: '',
                        upgradeHistory: [],
                        creationDate: Date.now(),
                        lock: false
                    }
                }
            },
            index: {
                type: Number,
                default: -1
            },
            language: {
                type: String,
                default: "origin"
            }
        },
        computed: {
            artifactName() {
                let artifact = this.$artifact.AUSList,
                    suitList = this.$artiConst.val.suitList,
                    suitList_zh = this.$artiConst.val.suitList_zh,
                    suit = this.$artiConst.val.artifactSuit,
                    suit_zh = this.$artiConst.val.artifactSuit_zh;
                if (this.language === "en" && suitList.indexOf(this.showdetail.suit) !== -1) {
                    return suit[this.showdetail.suit][artifact[this.index].part];
                } else if (this.language === "zh" && suitList_zh.indexOf(this.showdetail.suit) !== -1) {
                    return suit_zh[this.showdetail.suit][this.$artifact.toChinese(artifact[this.index].part, "parts")];
                }
                return "none";
            },
            suitUrl() {
                let item = this.$artifact.AUSList[this.index],
                    src = require('../assets/images' + "/" + item.suit.replace(/\s+/g, "") + "/" + item.part + ".png");
                return src;
            }
        },
        methods: {
            upgrade() {
                this.$emit("upgrade", this.index);
            },
            init() {
                this.$emit("init", this.index);
            },
            del() {
                this.$emit("del", this.index);
            },
            lockChange() {
                this.$emit("lock", this.index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ArtifactShow {
        position: relative;
        margin: 0 auto;
        width: 18.75rem;
        overflow: hidden;

        .aTitle {
            height: 1.875rem;
            color: #fff;
            line-height: 2.0625rem;
            padding-left: 1.125rem;
            background-color: #BC6832;
        }

        .titleLine {
            position: absolute;
            z-index: 2;
            top: .125rem;
            right: .125rem;
            bottom: .125rem;
            left: .125rem;
            width: 18.5rem;
            height: 1.625rem;
            border: solid 0.125rem rgba(144, 82, 41, 0.7);

            .leftArrow {
                position: absolute;
                z-index: 4;
                top: .3125rem;
                left: -0.25rem;
                height: .75rem;
                width: .75rem;
                background-color: #BC6832;
            }

            .rightArrow {
                position: absolute;
                z-index: 4;
                top: .3125rem;
                right: -0.25rem;
                height: .75rem;
                width: .75rem;
                background-color: #BC6832;
                transform: rotate(180deg);
            }
        }

        .aHead {
            position: relative;
            color: #fff;
            overflow: hidden;
            font-size: .8125rem;
            height: 8.4375rem;
            padding: .5625rem 1.125rem;
            background-image: linear-gradient(to bottom right, #6A5453, #E4AB52);
            background-image: -webkit-linear-gradient(to bottom right, #6A5453, #E4AB52);
            background-image: -moz-linear-gradient(to bottom right, #6A5453, #E4AB52);
            ;

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
                right: 1.125rem;
                top: .3125rem;
                width: 7.8125rem;
                height: 7.8125rem;

                img {
                    &:first-child {
                        position: relative;
                        z-index: 2;
                        width: inherit;
                        height: inherit;
                    }

                    &:last-child {
                        position: absolute;
                        opacity: 0.1;
                        z-index: 1;
                        width: 12.5rem;
                        height: 12.5rem;
                        top: -2.1875rem;
                        right: -2.1875rem;
                    }
                }
            }

            .levelStar {
                position: absolute;
                z-index: 2;
                left: 1.125rem;
                bottom: .5625rem;
            }
        }

        .blurLine {
            position: absolute;
            top: 10.0625rem;
            height: .25rem;
            width: 100%;
            background-color: #000;
            opacity: 0.2;
        }

        .aContent {
            height: 10.375rem;
            font-size: .875rem;
            padding: .9375rem 1.125rem;
            background-color: #ECE5D8;

            .badge {
                font-weight: 400;
                font-size: .875rem;
                padding: .125rem .25rem 0;
                background-color: rgb(57, 68, 79) !important;
            }

            ul {
                margin-top: .625rem;
                margin-bottom: 0;
                list-style-type: none;
                padding: 0;

                li {
                    margin-bottom: .0625rem;
                    color: rgb(76, 86, 104);
                }
            }

            .suitName {
                color: $genshin_green;
            }

            .unlock,
            .islock {
                position: relative;
                top: -0.125rem;
                float: right;
                padding-top: .0625rem;
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
                border: solid .0625rem #FFF;

                &:active {
                    opacity: 0.8;
                }
            }
        }

        .aButtonBox {
            height: 2.5rem;
            background-color: #a87940;
            text-align: center;
            padding: .4375rem 1.875rem;
            overflow: hidden;

            button {
                font-size: .9375rem;
                line-height: .9375rem;
                background-color: #dea752;
                color: #303030;
                width: 4.375rem;
                border-left: solid 0.0625rem rgb(243, 239, 225);
                border-right: solid 0.0625rem rgb(243, 239, 225);
            }
        }

        .btn-toupgrade {
            width: 100%;
            background-color: #ffd673;
            border-radius: 0;
        }

        .suitBox {
            width: 100%;
            position: relative;

            button {
                background-color: $genshin-white;
                width: 100%;
                border-radius: 0.25rem !important;

                &::before {
                    content: "";
                    position: absolute;
                    top: -0.125rem;
                    left: -0.125rem;
                    display: block;
                    width: calc(100% + .25rem);
                    height: calc(100% + .25rem);
                    border-radius: .25rem;
                }

                &:hover::before {
                    border: solid 0.1875rem rgb(255, 255, 255);
                }

                &:active {
                    opacity: 0.8;
                }
            }
        }
    }
</style>