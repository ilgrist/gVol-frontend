<template>
  <section class="explore-filter">
    <label for="search"
      >Search:
      <input
        id="search"
        type="text"
        placeholder="Search..."
        v-model="filterBy.txt"
        @input="filter"
      />
      |
    </label>
    <label for="category"
      >Category:
      <select id="category" v-model="filterBy.category" @change="filter">
        <option value="all">All</option>
        <option value="animals">Animals</option>
        <option value="children">Children</option>
        <option value="Elderly">Elderly</option>
      </select>
      |
    </label>
    <label for="skills"
      >Skills:
      <select id="skills" v-model="filterBy.skills" @change="filter">
        <option value="all">All</option>
        <option value="teaching">Teaching</option>
        <option value="designing">Designing</option>
        <option value="translating">Translating</option>
        <option value="building">Building</option>
        <option value="dreaming">Dreaming</option>
      </select>
    </label>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        category: "all",
        skills: "all",
      },
    };
  },
  methods: {
    filter() {
      const copyFilterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filter", copyFilterBy);
    },
  },
};
</script>
