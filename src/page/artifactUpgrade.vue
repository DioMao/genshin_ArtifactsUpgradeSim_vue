<template>
    <div class="containerUp">
        <div class="fog ani-fogMove"></div>
        <demo-alert :state="alertFunc.alertState" :show="alertFunc.alertShow">{{ alertFunc.alertMsg }}</demo-alert>
        <div class="starBox">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        </div>
        <button @click="$router.go(-1)" class="btn btn-genshin btn-back">
            <svg t="1631673905462" class="icon" viewBox="0 0 1024 1024" version="1.1" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg" p-id="633" width="1rem" height="1rem">
                <path
                    d="M482.7 249.9V106.1c0-37.4-45.3-56.2-71.7-29.7L140.3 347c-16.4 16.4-16.4 43 0 59.4L410.9 677c26.5 26.5 71.7 7.7 71.7-29.7v-155c96.1-0.3 271.5-10.7 271.5 227.7 0 118.1-92.8 216.8-216 239.6 198.1-24.4 326-236 326-361.9 0.1-292.6-309.4-346.3-381.4-347.8z"
                    fill="" p-id="634"></path>
            </svg>
            {{ $t('handle.back') }}
        </button>
        <div class="entryBox">
            <div class="mb-3 ps-2">+{{ Artifact.level }}<span class="maxBadge ani-badgeFlash"
                    v-show="Artifact.level==20">MAX</span></div>
            <div class="mb-1 mainEntry">
                <span class="iconBox">✦</span>
                <span class="ms-1"> {{  $t('term_sp.'+Artifact.mainEntry) }} </span>
                <span class="float-end"> {{ mainEntryValue(Artifact.mainEntry,Artifact.mainEntryValue) }} </span></div>
            <div class="entryLine"></div>
            <div class="entryList mb-1" v-for="entry in Artifact.entry" :key="entry">
                <div class="">
                    <span class="iconBox">•</span>
                    <span class="ms-1"
                        :style="{fontSize:($store.state.attr_sm_en.indexOf(entry[0])!==-1&&$i18n.locale==='en')?'0.6rem':'inherit'}">{{ $t('term_sp.'+entry[0]) }}</span>
                    <span class="float-end">{{ showEntryList(entry[0],entry[1]) }}</span>
                </div>
            </div>
        </div>
        <div class="upArtifactBox">
            <div class="artiImgBox">
                <img :src="setUrl" draggable="false">
            </div>
            <div class="flashingCircle ani-rotate1"></div>
            <div class="flashingCircle flashingCircle2 ani-rotate2"></div>
        </div>
        <div class="upFloodlight"></div>
        <div class="upgrade-button-box">
            <button @click="upgrade('max')" class="btn btn-genshin me-3" v-show="Artifact.level<20"><span
                    class="squareinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('handle.toMaxLv') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            <button @click="upgrade" class="btn btn-genshin" v-show="Artifact.level<20"><span
                    class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('handle.upgrade') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div class="upgradeMax" v-show="Artifact.level>=20">{{ $t('handle.maxLv') }}<br><button
                class="btn btn-genshin-dark" @click="initArtifact"><span
                    class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('handle.reset') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div class="myMask" v-show="showUpdate">
            <div class="upgradeAlert ani-AlertBoxUp">
                <div class="UpAlertHead">
                    <div class="upgradeSuccess ani-upSuccess">{{ $t('handle.upSuccess') }}</div>
                    <div class="upgradeImgBox ani-ArtifactShow">
                        <div class="upgradeImg">
                            <img :src="setUrl" :alt="Artifact.part" draggable="false">
                        </div>
                        <div class="UpLevelStar">
                            <span v-for="i in 5" :key="i" style="margin-right: 2px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32"
                                    class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </span>
                        </div>
                        <div class="upLevel">
                            +{{ Artifact.level }}
                        </div>
                    </div>
                    <div class="upgradeMsg">{{ $t('handle.LVup') }}</div>
                </div>
                <div class="UpAlertBody ani-showAlertBody">
                    <div class="entryBox UpAlertEntry">
                        <div class="mb-1 mainEntry">
                            <span class="iconBox">✦</span>
                            <span class="ms-1"
                                :style="{fontSize:($store.state.attr_sm_en.indexOf(Artifact.mainEntry)!==-1&&$i18n.locale==='en')?'0.8rem':'inherit'}">
                                {{ $t('term_sp.'+ Artifact.mainEntry) }} </span>
                            <span class="centerEntry"> {{ mainEntryValue(Artifact.mainEntry,mainValueBefore) }} </span>
                            <span class="upgradeArrow"></span>
                            <span class="float-end upColor">
                                {{ mainEntryValue(Artifact.mainEntry,Artifact.mainEntryValue) }} </span>
                            <span class="upgradeArrowUp"></span>
                        </div>
                        <div class="entryList mb-1" v-for="(entry,index) in newEntry" :key="index">
                            <div class="upEntry">
                                <span class="iconBox">•</span>
                                <span class="ms-1"
                                    :style="{fontSize:($store.state.attr_sm_en.indexOf(entry)!==-1&&$i18n.locale==='en')?'0.6rem':'inherit'}">
                                    {{ $t('term_sp.'+ entry) }} </span>
                                <span class="centerEntry" v-show="(!isNewAttr)||index!=newEntry.length-1">
                                    {{ showEntryList(entry,oldEntryValue[index]) }} </span>
                                <span class="upgradeArrow" v-show="(!isNewAttr)||index!=newEntry.length-1"></span>
                                <span class="float-end upColor">{{ showEntryList(entry,newEntryValue[index]) }}</span>
                                <span class="upgradeArrowUp"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upAlertBtn ani-AlertBtnShow">
                <button class="btn btn-genshin" @click="showUpdate=false"><span
                        class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('handle.confirm') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            </div>
        </div>
    </div>
</template>

<script>
    import demoAlert from '@/components/demo-alert'
    import '@/style/stars.css'

    export default {
        components: {
            demoAlert
        },
        props: ["index"],
        data() {
            return {
                state: this.$store.state,
                showUpdate: false, // 显示升级结果
                ArtifactsList: [],
                Artifact: {
                    symbol: "",
                    level: 0,
                    set: "none",
                    part: "none",
                    mainEntry: "none",
                    mainEntryValue: 0,
                    entry: [],
                    initEntry: '',
                    upgradeHistory: [],
                    lock: false,
                    equipped: 0
                },
                mainValueBefore: 0, // 升级前的主属性
                isNewAttr: false, // 是否是新词条
                newEntry: ["none"],
                newEntryValue: [0],
                oldEntryValue: [0], // 旧词条数值
                alertFunc: {
                    alertShow: false, // 是否显示提示框
                    alertMsg: String, // 提示框内容
                    alertClose: Function, // 定时关闭提示框
                    alertState: "success" // 提示框类型
                }
            }
        },
        computed: {
            setUrl() {
                let item = this.$artifact.AUSList[this.index];
                if (item === undefined) {
                    return "";
                } else {
                    let src = require('../assets/images/Artifacts/' + item.set.replace(/\s+/g, "") + "/" + item.part +
                        ".png");
                    return src;
                }
            }
        },
        mounted() {
            // 验证圣遗物是否存在，否则跳转回列表（防止url直接访问出错）
            if (this.$artifact.AUSList.length < (parseInt(this.index) + 1)) {
                this.$router.replace("/");
            } else {
                this.Artifact = this.$artifact.AUSList[this.index];
            }
            // 读取语言设置
            if (!window.localStorage) {
                alert("浏览器不支持localstorage");
                return false;
            } else if (localStorage.userSetting !== '') {
                this.$i18n.locale = JSON.parse(localStorage.userSetting).language;
            }
            // 初始化时列表数据保持一致
            if (this.ArtifactsList.length == 0 && this.$artifact.AUSList.length != 0) {
                this.ArtifactsList = [...this.$artifact.AUSList];
            }
        },
        updated() {
            // 验证圣遗物是否存在，否则跳转回列表（防止url直接访问出错）
            if (this.$artifact.AUSList.length < (parseInt(this.index) + 1)) {
                this.$router.replace("/");
            } else {
                this.Artifact = this.$artifact.AUSList[this.index];
            }
        },
        methods: {
            // 升级圣遗物
            upgrade(type = "default") {
                let ArtiEntry = this.Artifact.entry;
                // 升级前的数据
                let oldEntryList = JSON.parse(JSON.stringify(ArtiEntry));
                let res;
                this.mainValueBefore = this.Artifact.mainEntryValue;
                // 是否升到满级
                if (type == "max") {
                    while (this.Artifact.level < 20) {
                        res = this.$artifact.upgrade(this.index, this.upEntry, this.upgradeLv);
                    }
                } else {
                    res = this.$artifact.upgrade(this.index, this.upEntry, this.upgradeLv);
                }
                this.ArtifactsList = [...this.$artifact.AUSList];
                // 清空数据
                this.newEntry = JSON.parse("[\"none\"]");
                this.newEntryValue = JSON.parse("[0]");
                this.oldEntryValue = JSON.parse("[0]");
                if (res == true) {
                    // 写入新旧词条的数据
                    let newIndex = 0;
                    for (let i = 0; i < oldEntryList.length; i++) {
                        if (oldEntryList[i][1] != ArtiEntry[i][1]) {
                            this.newEntry[newIndex] = ArtiEntry[i][0];
                            this.newEntryValue[newIndex] = ArtiEntry[i][1];
                            this.oldEntryValue[newIndex] = oldEntryList[i][1];
                            newIndex++;
                        }
                    }
                    // 判断是否有新词条
                    if (oldEntryList.length < ArtiEntry.length) {
                        this.isNewAttr = true;
                        if (this.newEntry[0] != "none") {
                            this.newEntry.push(ArtiEntry[ArtiEntry.length - 1][0]);
                            this.newEntryValue.push(ArtiEntry[ArtiEntry.length - 1][1]);
                        } else {
                            this.newEntry[0] = ArtiEntry[ArtiEntry.length - 1][0];
                            this.newEntryValue[0] = ArtiEntry[ArtiEntry.length - 1][1];
                        }
                    } else {
                        this.isNewAttr = false;
                    }
                    this.showUpdate = true;
                } else {
                    this.alertControl("当前圣遗物已满级~", 1500, "warning");
                }
            },
            // 初始化圣遗物
            initArtifact() {
                let res = this.$artifact.reset(this.index);
                if (res) {
                    this.alertControl("重置圣遗物成功~再试试手气吧", 1500);
                } else {
                    this.alertControl("该圣遗物已锁定！", 1500, "warning");
                }
            },
            // 主词条展示优化
            mainEntryValue(mainEntry, val) {
                return this.$artifact.entryValFormat(mainEntry, val, "main");
            },
            // 词条优化
            showEntryList(entry, value) {
                return this.$artifact.entryValFormat(entry, value);
            },
            toChinese(word, type) {
                return this.$artifact.toChinese(word, type);
            },
            // 提示框
            alertControl(msg, time = 2000, state = "success") {
                this.alertFunc.alertMsg = msg;
                this.alertFunc.alertState = state;
                this.alertFunc.alertShow = true;
                clearTimeout(this.alertFunc.alertClose);
                this.alertFunc.alertClose = setTimeout(() => {
                    this.alertFunc.alertShow = false;
                }, time)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .upColor {
        color: rgb(254, 203, 49);
    }

    .maxBadge {
        margin-left: 2rem;
        background-color: rgb(255, 57, 0);
        padding: 0.05rem 0.2rem;
        border-radius: 2rem;
        font-size: 0.8rem;
    }

    .btn-back {
        position: fixed;
        top: .5rem;
        right: .9375rem;
        z-index: 20;
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

    .upgradeMax {
        position: absolute;
        width: 12.5rem;
        z-index: 2;
        bottom: 2rem;
        right: 5rem;
        color: #fff;
        font-size: 0.9rem;
        text-align: center;
        line-height: 4;
    }

    .containerUp {
        position: fixed;
        background-image: linear-gradient(180deg, rgb(112, 53, 25), rgb(125, 83, 38));
        top: 3.5rem;
        width: 100%;
        height: calc(100% - 3.5rem);
        user-select: none;
        overflow: hidden;

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
    }

    .starBox {
        position: relative;
        z-index: 1;
    }

    .entryBox {
        position: relative;
        z-index: 2;
        top: .9375rem;
        color: #fff;
        width: 25rem;
        float: right;

        .mainEntry {
            padding: .125rem .3125rem;
            background-image: linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
            background-image: -webkit-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
            background-image: -moz-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
            font-size: 1.1rem;
        }

        .entryLine {
            margin: .3rem 0;
            overflow: hidden;
            border-top: 0.0625rem solid rgba(255, 255, 255, 0.15);
        }

        .entryList {
            &:nth-child(2n) {
                padding: .125rem .3125rem;
                background-image: linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.12), #fff00000);
                background-image: -webkit-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.12), #fff00000);
                background-image: -moz-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.12), #fff00000);
                font-size: 0.9rem;
            }

            &:nth-child(2n-1) {
                padding: .125rem .3125rem;
                background-image: linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
                background-image: -webkit-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
                background-image: -moz-linear-gradient(90deg, #ffffff00, rgba(0, 0, 0, 0.2), #fff00000);
                font-size: 0.9rem;
            }
        }
    }

    .upgrade-button-box {
        position: absolute;
        z-index: 2;
        bottom: 1.875rem;
        right: 3.125rem;
    }

    .upgradeArrow {
        position: absolute;
        top: 0.8rem;
        left: 50%;
        margin-left: 3.5rem;
        display: inline-block;
        width: 1rem;
        height: 0.3rem;
        margin-bottom: 0.2rem;
        background-image: linear-gradient(270deg, #ffffff90, rgba(0, 0, 0, 0.2));
        background-image: -webkit-linear-gradient(270deg, #ffffff90, rgba(0, 0, 0, 0.2));
        background-image: -moz-linear-gradient(270deg, #ffffff90, rgba(0, 0, 0, 0.2));

        &::after {
            content: "";
            position: absolute;
            top: -0.15rem;
            right: -0.4rem;
            width: 0;
            height: 0;
            border-top: 0.3rem solid transparent;
            border-left: 0.4rem solid #ffffff90;
            border-bottom: 0.3rem solid transparent;
        }
    }

    .upgradeArrowUp {
        position: absolute;
        top: 1.0625rem;
        right: -0.4375rem;
        display: inline-block;
        width: .4375rem;
        height: .3125rem;
        margin-bottom: 0rem;
        background-image: linear-gradient(270deg, rgb(144, 232, 0.9) 65%, rgba(0, 0, 0, 0) 20%);
        background-image: -webkit-linear-gradient(270deg, rgb(144, 232, 0.9) 65%, rgba(0, 0, 0, 0) 20%);
        background-image: -moz-linear-gradient(270deg, rgb(144, 232, 0.9) 65%, rgba(0, 0, 0, 0) 20%);
        transform: rotate(270deg);

        &::after {
            content: "";
            position: absolute;
            top: -0.15rem;
            right: -0.4rem;
            width: 0;
            height: 0;
            border-top: 0.3rem solid transparent;
            border-left: 0.4rem solid rgb(144, 232, 0.9);
            border-bottom: 0.3rem solid transparent;
        }
    }

    .centerEntry {
        position: absolute;
        text-align: center;
        width: 3rem;
        left: 50%;
        margin-left: -1.875rem;
    }

    .iconBox {
        display: inline-block;
        color: rgb(172, 160, 148);
        width: 1rem;
        text-align: center;
    }

    .upArtifactBox {
        position: relative;
        z-index: 2;
        bottom: -45%;
        left: 20%;

        .artiImgBox {
            position: absolute;
            z-index: 2;
            top: 1.875rem;
            left: 1.875rem;
            width: 8.75rem;
            height: 8.75rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .flashingCircle {
            position: absolute;
            top: 1.25rem;
            left: 1.25rem;
            width: 10rem;
            height: 10rem;
            background-color: rgba(211, 169, 0, 0.2);
            border-top-left-radius: 4.5625rem;
            border-top-right-radius: 5.15rem;
            border-bottom-left-radius: 4.0625rem;
            border-bottom-right-radius: 3.875rem;
            border: solid .125rem #ffffff;
            box-shadow: 0 0 0.25rem 0.125rem rgb(255, 255, 153);
        }

        .flashingCircle2 {
            border-top-left-radius: 5.4625rem;
            border-top-right-radius: 3.1875rem;
            border-bottom-left-radius: 5.7rem;
            border-bottom-right-radius: 4.6875rem;
        }
    }

    .myMask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .upgradeAlert {
            position: relative;
            width: 100%;
            bottom: -40%;
            margin-top: 0;
        }

        .upAlertBtn {
            position: relative;
            top: 20rem;
            text-align: center;
        }

        .upgradeAlert {
            .UpAlertHead {
                position: relative;
                width: 100%;
                height: 5rem;
                background-color: #BC6832E0;

                .upgradeSuccess {
                    position: absolute;
                    top: -6.5rem;
                    left: 50%;
                    margin-left: -16rem;
                    width: 32rem;
                    text-align: center;
                    font-size: 1.3rem;
                    color: #fff;
                }

                .upgradeMsg {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 1.375rem;
                    color: #fff;
                }

                .upgradeImgBox {
                    overflow: hidden;
                    position: absolute;
                    z-index: 2;
                    top: -3.375rem;
                    left: 50%;
                    margin-left: -2.5rem;
                    background: #fff;
                    width: 5rem;
                    height: 6.125rem;
                    border: solid .125rem #fff;
                    border-radius: .3125rem;
                    box-sizing: border-box;
                    box-shadow: yellow 0rem 0rem 1.25rem .125rem;

                    .upgradeImg {
                        height: 5rem;
                        width: 100%;
                        background-color: rgb(195, 133, 66);
                        border-bottom-right-radius: .9375rem;

                        img {
                            height: 100%;
                            width: 100%;
                        }
                    }

                    .UpLevelStar {
                        position: absolute;
                        top: 4.0625rem;
                        left: -0.375rem;
                        height: .625rem;
                        white-space: nowrap;
                        transform: scale(0.7);
                    }

                    .upLevel {
                        text-align: center;
                        font-size: .625rem;
                    }
                }
            }

            .UpAlertBody {
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 0rem;
                background: rgba(63, 71, 87, 0.9);

                .UpAlertEntry {
                    float: none;
                    margin: 0 auto;
                    width: 50%;

                    .upEntry {
                        position: relative;

                        .upgradeArrow {
                            top: 0.55rem;
                        }

                        .upgradeArrowUp {
                            top: .8125rem;
                            right: -0.75rem;
                        }
                    }
                }
            }
        }
    }
</style>