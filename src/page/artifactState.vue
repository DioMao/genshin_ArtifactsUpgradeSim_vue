<template>
  <div></div>
  <div></div>
</template>

<script>
  import { useStore } from "vuex";
  export default {
    setup() {
      const store = useStore();
      console.log(store);
    },
  };
</script>

<style lang="scss" scoped>

</style>