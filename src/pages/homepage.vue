<template>
  <div class="home main-layout">
    <hero />
    <h1>Welcome to gVol!</h1>
    <short-list />
    <categories-grid />
  </div>
</template>

<script>
import hero from "../cmps/homepage-cmps/hero.vue";
import categoriesGrid from "../cmps/homepage-cmps/categories-grid.vue";
import shortList from "../cmps/homepage-cmps/short-vol-list.vue";

export default {
  name: "Home",
  components: {
    hero,
    categoriesGrid,
    shortList,
  },
};
</script>
