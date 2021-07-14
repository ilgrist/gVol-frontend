<template>
  <div class="home">
    <hero />
    <h1>Welcome to gVol!</h1>
    <categories-grid />
  </div>
</template>

<script>
import hero from "../cmps/homepage-cmps/hero.vue";
import categoriesGrid from "../cmps/homepage-cmps/categories-grid.vue";
export default {
  name: "Home",
  components: {
    hero,
    categoriesGrid,
  },
};
</script>
