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
            "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626874522/volApp/categoryImgs/children.jpg",
        },
        {
          name: "Elderly",
          imgUrl:
            "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626874470/volApp/categoryImgs/elderly.jpg",
        },
        {
          name: "Animals",
          imgUrl:
            "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626874460/volApp/categoryImgs/animals.jpg",
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