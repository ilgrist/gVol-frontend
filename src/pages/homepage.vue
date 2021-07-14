<template>
  <div class="home">
    <hero />
    <h1>Welcome to gVol!</h1>
  </div>
</template>

<script>
import hero from "../cmps/homepage-cmps/hero.vue";
export default {
  name: "Home",
  components: {
    hero,
  },
};
</script>
