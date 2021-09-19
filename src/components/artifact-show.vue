<template>
    <div class="ArtifactShow">
        <div class="aTitle"> {{ artifactName }} </div>
        <div class="titleLine"></div>
        <div class="aHead">
            {{ toChinese(showdetail.part,"parts") }}
            <div class="mainEntry"> {{ toChinese(showdetail.mainEntry,"mainEntry") }} </div>
            <div class="mainEntryValue">{{ mainEntryValue }}</div>
            <div class="aImg">
                <img :src="partSrc[showdetail.part]" :alt="showdetail.part">
                <img :src="symbolSrc" alt="genshin-symbol">
            </div>
            <div class="levelStar">
                <span v-for="i in 5" :key="i" style="margin-right: 3px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                </span>
            </div>
        </div>
        <div class="blurLine"></div>
        <div class="aContent">
            <span class="badge">+{{ showdetail.level }}</span>
            <span class="unlock" v-if="!showdetail.lock" @click="lockChange">
                <svg t="1631860853969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4021" width="1rem" height="1rem" fill="rgb(158,161,168)">
                    <path d="M825 384H268.6c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C445.6 78.6 478.5 72 512.5 72s66.9 6.6 97.8 19.7c19.4 8.2 37.5 18.7 54.2 31.4 14.4 11 34.6 9.8 47.5-3 15.4-15.4 13.7-40.9-3.7-54.1C653.9 24.6 586.1 0 512.5 0 334 0 189.2 144.7 189.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM544.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4z" p-id="4022"></path>
                </svg>
            </span>
            <span class="islock" v-else @click="lockChange">
                <svg t="1631861008451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4168" width="1rem" height="1rem" fill="rgb(255,138,117)">
                    <path d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z" p-id="4169"></path>
                </svg>
            </span>
            <ul>
                <li v-for="entry in showdetail.entry" :key="entry">·{{ showEntryList(entry[0],entry[1]) }}</li>
            </ul>
        </div>
        <div class="aButtonBox">
            <button class="btn btn-genshin btn-sm float-start" @click="upgrade" :disable="showdetail.level>=20"> 强化 </button>
            <button class="btn btn-genshin btn-sm" @click="init" v-show="showdetail.level>0"> 重置 </button>
            <button class="btn btn-genshin btn-sm float-end del" @click="del"> 删除 </button>
        </div>
        <router-link :to="{path:'/artifact-'+index}" class="btn btn-toupgrade"><span class="circleinbox"></span>强化界面</router-link>
    </div>
</template>

<script>
import { ArtifactsSim } from '@/utils/ArtifactsUpradeSim_module@0.1.9'

export default {
    data(){
        return {
            name: {
                feather: "角斗士的归宿",
                flower: "角斗士的留恋",
                cup: "角斗士的酣醉",
                hourglass: "角斗士的希冀",
                hat: "角斗士的凯旋"
            },
            symbolSrc: require("../static/images/genshin-symbol.png"),
            partSrc: {
                feather: require("../static/images/A-feather.png"),
                flower: require("../static/images/A-flower.png"),
                cup: require("../static/images/A-cup.png"),
                hourglass: require("../static/images/A-hourglass.png"),
                hat: require("../static/images/A-hat.png")
            }
        }
    },
    props:{
        showdetail: {
            type: Object,
            default() {
                return{
                    symbol: "",
                    level: 0,
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
        }
    },
    computed:{
        artifactName(){
            return this.name[this.showdetail.part];
        },
        mainEntryValue(){
            return ArtifactsSim.entryValFormat(this.showdetail.mainEntry, this.showdetail.mainEntryValue,"main")
        }
    },
    methods:{
        upgrade(){
            this.$emit("upgrade",this.index);
        },
        init(){
            this.$emit("init",this.index);
        },
        del(){
            this.$emit("del",this.index);
        },
        lockChange(){
            this.$emit("lock",this.index);
        },
        toChinese(word,type){
            return ArtifactsSim.toChinese(word,type);
        },
        showEntryList(entry,value){
            let resEntry = this.toChinese(entry,"entry"),
            resValue = ArtifactsSim.entryValFormat(entry,value);
            return resEntry + "+" + resValue;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>