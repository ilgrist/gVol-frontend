<template>
  <div class="home">
    <h1>Welcome to gVol!</h1>
    <short-list />
  </div>
</template>

<script>
import shortList from '@/cmps/homepage-cmps/short-volOp-list.vue'
export default {
  name: "Home",
  components: {
    shortList,
  },
};
</script>
