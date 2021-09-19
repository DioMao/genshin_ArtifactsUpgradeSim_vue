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
            返回
        </button>
        <div class="entryBox">
            <div class="mb-3 ps-2">+{{ Artifact.level }}<span class="maxBadge ani-badgeFlash"
                    v-show="Artifact.level==20">MAX</span></div>
            <div class="mb-1 mainEntry"><span class="iconBox">✦</span> {{ toChinese(Artifact.mainEntry,"mainEntry") }}
                <span class="float-end"> {{ mainEntryValue(Artifact.mainEntry,Artifact.mainEntryValue) }} </span></div>
            <div class="entryLine"></div>
            <div class="entryList mb-1" v-for="entry in Artifact.entry" :key="entry">
                <div class=""><span class="iconBox">•</span> {{ toChinese(entry[0],"entry") }} <span
                        class="float-end">{{ showEntryList(entry[0],entry[1]) }}</span></div>
            </div>
        </div>
        <div class="upArtifactBox">
            <div class="artiImgBox">
                <img :src="'img/A-'+Artifact.part+'.png'" :alt="Artifact.part">
            </div>
            <div class="flashingCircle ani-rotate1"></div>
            <div class="flashingCircle flashingCircle2 ani-rotate2"></div>
        </div>
        <div class="upFloodlight"></div>
        <div class="upgrade-button-box">
            <button @click="upgrade('max')" class="btn btn-genshin me-3" v-show="Artifact.level<20"><span
                    class="squareinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;升到满级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            <button @click="upgrade" class="btn btn-genshin" v-show="Artifact.level<20"><span
                    class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;强化&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div class="upgradeMax" v-show="Artifact.level>=20">已达到当前等级上限<br><button class="btn btn-genshin-dark"
                @click="initArtifact"><span
                    class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div class="myMask" v-show="showUpdate">
            <div class="upgradeAlert ani-AlertBoxUp">
                <div class="UpAlertHead">
                    <div class="upgradeSuccess ani-upSuccess">强化完成</div>
                    <div class="upgradeImgBox ani-ArtifactShow">
                        <div class="upgradeImg">
                            <img :src="'img/A-'+Artifact.part+'.png'" :alt="Artifact.part">
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
                    <div class="upgradeMsg">升级</div>
                </div>
                <div class="UpAlertBody ani-showAlertBody">
                    <div class="entryBox UpAlertEntry">
                        <div class="mb-1 mainEntry">
                            <span class="iconBox">✦</span>
                            {{ toChinese(Artifact.mainEntry,"mainEntry") }}
                            <span class="centerEntry"> {{ mainEntryValue(Artifact.mainEntry,mainValueBefore) }} </span>
                            <span class="upgradeArrow"></span>
                            <span class="float-end upColor">
                                {{ mainEntryValue(Artifact.mainEntry,Artifact.mainEntryValue) }} </span>
                            <span class="upgradeArrowUp"></span>
                        </div>
                        <div class="entryList mb-1" v-for="(entry,index) in newEntry" :key="index">
                            <div class="upEntry">
                                <span class="iconBox">•</span> {{ toChinese(entry,"entry") }}
                                <span class="centerEntry" v-show="(!isNew)||index!=newEntry.length-1">
                                    {{ showEntryList(entry,oldEntryValue[index]) }} </span>
                                <span class="upgradeArrow" v-show="(!isNew)||index!=newEntry.length-1"></span>
                                <span class="float-end upColor">{{ showEntryList(entry,newEntryValue[index]) }}</span>
                                <span class="upgradeArrowUp"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upAlertBtn ani-AlertBtnShow">
                <button class="btn btn-genshin" @click="showUpdate=false"><span
                        class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ArtifactsSim
    } from '@/utils/ArtifactsUpradeSim_module@0.1.9'
    import demoAlert from '@/components/demo-alert'

    export default {
        components: {
            demoAlert
        },
        props: ["index"],
        data() {
            return {
                showUpdate: false, // 显示升级结果
                ArtifactsList: [],
                Artifact: {
                    level: 0,
                    part: "feather",
                    mainEntry: "none",
                    mainEntryValue: 0,
                    entry: [],
                    initEntry: '',
                    upgradeHistory: [],
                    creationDate: Date.now()
                },
                mainValueBefore: 0, // 升级前的主属性
                isNew: false, // 是否是新词条
                newEntry: ["none"],
                newEntryValue: [0],
                oldEntryValue: [0], // 旧词条数值
                alertFunc: {
                    alertShow: false, // 是否显示提示框
                    alertMsg: String, // 提示框内容
                    alertClose: Function, // 定时关闭提示框
                    alertState: "success" // 提示框类型
                },
            }
        },
        mounted() {
            // 初始化时列表数据保持一致
            if (this.ArtifactsList.length == 0 && ArtifactsSim.AUSList.length != 0) {
                this.ArtifactsList = [...ArtifactsSim.AUSList];
            }
            // 验证圣遗物是否存在，否则跳转回列表（防止url直接访问出错）
            if (ArtifactsSim.AUSList.length < (parseInt(this.index) + 1)) {
                this.$router.replace("/");
            } else {
                this.Artifact = ArtifactsSim.AUSList[this.index];
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
                        res = ArtifactsSim.upgrade(this.index, this.upEntry, this.upgradeLv);
                    }
                } else {
                    res = ArtifactsSim.upgrade(this.index, this.upEntry, this.upgradeLv);
                }
                this.ArtifactsList = [...ArtifactsSim.AUSList];
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
                        this.isNew = true;
                        if (this.newEntry[0] != "none") {
                            this.newEntry.push(ArtiEntry[ArtiEntry.length - 1][0]);
                            this.newEntryValue.push(ArtiEntry[ArtiEntry.length - 1][1]);
                        } else {
                            this.newEntry[0] = ArtiEntry[ArtiEntry.length - 1][0];
                            this.newEntryValue[0] = ArtiEntry[ArtiEntry.length - 1][1];
                        }
                    } else {
                        this.isNew = false;
                    }
                    this.showUpdate = true;
                } else {
                    this.alertControl("当前圣遗物已满级~", 1500, "warning");
                }
            },
            // 初始化圣遗物
            initArtifact() {
                let res = ArtifactsSim.reset(this.index);
                if (res) {
                    this.alertControl("重置圣遗物成功~再试试手气吧", 1500);
                } else {
                    this.alertControl("该圣遗物已锁定！", 1500, "warning");
                }
            },
            // 主词条展示优化
            mainEntryValue(mainEntry, val) {
                return ArtifactsSim.entryValFormat(mainEntry, val, "main");
            },
            // 词条优化
            showEntryList(entry, value) {
                return ArtifactsSim.entryValFormat(entry, value);
            },
            toChinese(word, type) {
                return ArtifactsSim.toChinese(word, type);
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

</style>