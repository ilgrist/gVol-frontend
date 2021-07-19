<template>
  <section class="category-grid-cont main-layout">
    <div class="short-header">
      <h1>Volunteer in:</h1>
      <p @click="cardClicked">See all</p>
    </div>
    <div class="category-grid">
      <category-card
        :category="category"
        @cardClicked="cardClicked"
        v-for="category in categories"
        :key="category.loc"
      />
    </div>
  </section>
</template>

<script>
import categoryCard from "./category-card.vue";

export default {
  data() {
    return {
      categories: [
        { name: "Israel", url: "grid1.jpg" },
        { name: "Kenya", url: "grid2.jpg" },
        { name: "Nevada", url: "grid3.jpg" },
        { name: "Africa", url: "grid2.jpg" },
        { name: "Kenya", url: "grid3.jpg" },
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