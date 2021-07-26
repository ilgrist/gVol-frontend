<template>
  <section class="hero-image">
    <div class="hero-container main-layout">
      <h1 class="hero-title">Volunteering. Globally.</h1>
      <div class="hero-filter-container">
        <form class="filter-form" @submit.prevent="filter">
          <input
            class="hero-input"
            type="text"
            v-model="filterBy.txt"
            @keydown.enter.prevent="filter"
            placeholder="Make a difference in..."
            ref="search"
          />
        </form>
        <button class="homepage-btn" @click="filter">
          <img
            class="hero-filter-img"
            src="/img/icons/search_z9wby8.svg"
            alt="search"
          />
        </button>
      </div>
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
        category: "all",
        skills: "all",
        isOnSite: false,
        isOnLine: false,
      },
    };
  },
  methods: {
    filter() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterBy);
    },
  },
  mounted() {
    this.$refs.search.focus();
  },
};
</script>

 