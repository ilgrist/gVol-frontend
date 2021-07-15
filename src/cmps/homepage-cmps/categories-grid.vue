<template>
  <section class="category-grid">
    <div v-for="category in categories" :key="category.loc">
      <category-card :category="category" />
    </div>
  </section>
</template>

<script>
import categoryCard from "./category-card.vue";
export default {
  data() {
    return {
      categories: [
        { name: "Korea", url: "../../assets/img/grid-imgs/grid1.jpg" },
        { name: "Africa", url: "../../assets/img/grid-imgs/grid2.jpg" },
        { name: "Europe", url: "../../assets/img/grid-imgs/grid3.jpg" },
      ],
    };
  },
  components: {
    categoryCard,
  },
};
</script>