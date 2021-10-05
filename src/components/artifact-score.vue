<template>
    <div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: "artifact-score",
        data() {
            return {
                score = 0,
            }
        },
        props: {
            index: {
                type: Number,
                default: -1
            },
            symbol: {
                type: String,
                default: ""
            },
            rule: {
                type: [String, Array],
                default: "default"
            }
        },
        methods: {
            // 圣遗物评分
            ArtifactRate(index) {
                return this.$artifact.ArtifactScore(index, this.rule).toFixed(2);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>