<template>
    <div class="score_container">
        <div>{{ $t('msg.entryScore') }}(beta)：{{ ArtifactRate(index) }}</div>
        <div class="splitLine"></div>
        <div class="scoreSheetBox">
            <div class="SheetItem" v-for="(entry,index) in currentEntry" :key="'entry'+index">
                <div>{{ $t('term.' +entry[0]) }}</div>
                <div class="progress_genshin">
                    <div class="progress_bar_genshin" :style="{width:entryProgess(entry[0],entry[1])+ '%'}">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "artifact-score",
        data() {
            return {
                score: 0,
                language: 'zh',
                currentEntry: []
            }
        },
        props: {
            index: {
                type: Number,
                default: -1
            },
            rule: {
                type: [String, Array],
                default: "default"
            },
            artifact: {
                default: ""
            }
        },
        mounted() {
            // 读取语言设置
            if (!window.localStorage) {
                alert("浏览器不支持localstorage");
                return false;
            } else if (localStorage.userSetting !== '') {
                this.language = JSON.parse(localStorage.userSetting).language;
                this.$i18n.locale = JSON.parse(localStorage.userSetting).language;
            } else {
                this.language = this.$store.state.language;
                this.$i18n.locale = this.$store.state.language;
            }
        },
        watch: {
            // 监听属性变化
            artifact(val) {
                if (val !== "" && val !== undefined) this.currentEntry = JSON.parse(val).entry;
            }
        },
        methods: {
            // 圣遗物评分
            ArtifactRate(index) {
                return this.$artifact.ArtifactScore(index, this.rule).toFixed(2);
            },
            // 进度条
            entryProgess(entry, value) {
                let entryValueList = this.$artiConst.val.entryValue[entry];
                if(entryValueList !== undefined){
                    return Math.floor(value / (entryValueList[entryValueList.length - 1] * 6) * 100);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .score_container {
        padding: 0.5rem 1rem;
        background-color: $genshin_white;
        border-radius: .25rem;
        color: $genshin_dark;
    }

    .splitLine {
        width: 100%;
        margin: .25rem 0;
        border-top: solid 0.125rem transparentize($genshin_gray, 0.5);
    }

    .scoreSheetBox {
        font-size: .875rem;

        .SheetItem {
            margin-bottom: 0.25rem;

            .progress_genshin {
                display: flex;
                height: .5rem;
                overflow: hidden;
                font-size: .75rem;
                background-color: $genshin_gray;
                border-radius: 1.5rem;

                .progress_bar_genshin {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    background-color: #FFF;
                    transition: width .6s ease;
                }
            }
        }
    }
</style>