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
        { name: "Children", url: "grid1.jpg" },
        { name: "Elderly", url: "grid2.jpg" },
        { name: "Animals", url: "grid3.jpg" },
      ],
      filterBy: {
        txt: "",
        category: "all",
        skills: "all",
        isOnSite: false,
        isOnLine: false,
      },
    };
  },
  methods: {
    cardClicked(categoryName) {
      this.filterBy.category = categoryName.toLowerCase();
      let filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterBy);
    },
  },
  components: {
    categoryCard,
  },
};
</script>