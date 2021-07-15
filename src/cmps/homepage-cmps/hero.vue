<template>
  <section class="hero-image">
    <!-- <main-header /> -->
    <h1 class="hero-title">Volunteering globally</h1>
    <div class="hero-filter-container">
      <form @submit.prevent="filter">
        <img
          class="hero-filter-img"
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626286701/volApp/icons/search_z9wby8.svg"
          alt="search"
        />

        <input
          class="hero-input"
          type="text"
          v-model="filterBy.txt"
          @keydown.enter.prevent="filter"
          placeholder="Try 'Teaching'"
        />
        <!-- <button class="homepage-btn">Search</button> -->
      </form>
      <button class="homepage-btn">Volunteer</button>
    </div>
  </section>
</template>
<script>
import mainHeader from "@/cmps/main-layout-cmps/main-header.vue";
export default {
  components: {
    mainHeader,
  },
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
  },
  methods: {
    filter() {
      console.log(this.filterBy);
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>

 