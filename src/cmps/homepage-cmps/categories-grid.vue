<template>
  <section class="category-grid-cont main-layout">
    <div class="short-header">
      <h1>Volunteer in:</h1>
      <p @click="cardClicked">See all</p>
    </div>
    <div class="category-grid">
      <div v-for="category in categories" :key="category.loc">
        <category-card :category="category" @cardClicked="cardClicked" />
      </div>
    </div>
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
  methods: {
    cardClicked(categoryName) {
      this.$router.push("/volApp");
    },
  },
  components: {
    categoryCard,
  },
};
</script>