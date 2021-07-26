<template>
  <section class="category-grid-cont main-layout">
    <div class="short-header">
      <h1>Volunteer with:</h1>
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
        {
          name: "Children",
          imgUrl:
            "https://res.cloudinary.com/dsdhfmggx/image/upload/v1627316772/category-children_qsh3xy.jpg",
        },
        {
          name: "Elderly",
          imgUrl:
            "https://res.cloudinary.com/dsdhfmggx/image/upload/v1627316775/category-elderly_ykw98b.jpg",
        },
        {
          name: "Animals",
          imgUrl:
            "https://res.cloudinary.com/dsdhfmggx/image/upload/v1627316774/category-animals_e7jo9w.jpg",
        },
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