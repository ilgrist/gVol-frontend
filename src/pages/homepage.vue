<template>
  <div class="home">
    <h1>Welcome to gVol!</h1>
    <categories-grid />
  </div>
</template>

<script>
import categoriesGrid from "../cmps/homepage-cmps/categories-grid.vue";
export default {
  name: "Home",
  components: {
    categoriesGrid,
  },
};
</script>
