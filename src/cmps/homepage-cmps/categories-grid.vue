<template>
  <section class="category-grid">
    <div class="homepage-grid-card card1">
      <img src="../../assets/img/grid-imgs/grid1.jpg" />
      <p>Korea</p>
    </div>
    <div class="homepage-grid-card card2">
      <img src="../../assets/img/grid-imgs/grid2.jpg" />
      <p>Indonesia</p>
    </div>
    <div class="homepage-grid-card card3">
      <img src="../../assets/img/grid-imgs/grid3.jpg" />
      <p>Africa</p>
    </div>
    <!-- <div v-for="category in categories" :key="category.loc">
      <category-card :category="category" />
    </div> -->
  </section>
</template>

<script>
import categoryCard from "./category-card.vue";

export default {
  data() {
    return {
      categories: [
        { name: "Korea", url: "grid1.jpg" },
        { name: "Africa", url: "grid2.jpg" },
        { name: "Europe", url: "grid3.jpg" },
        { name: "Africa", url: "grid2.jpg" },
        { name: "Europe", url: "grid3.jpg" },
      ],
    };
  },
  components: {
    categoryCard,
  },
};
</script>