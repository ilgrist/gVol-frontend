<template>
  <section class="hero-image">
    <div class="hero-filter-container">
      <form @submit.prevent="filter">
        <img
          class="hero-filter-img"
          src="../../assets/img/search.svg"
          alt="search"
        />
        <input
          class="hero-input"
          type="text"
          v-model="filterBy.txt"
          @keydown.enter.prevent="filter"
          placeholder="Try 'Teaching'"
        />
        <button class="homepage-btn">Search</button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
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

 