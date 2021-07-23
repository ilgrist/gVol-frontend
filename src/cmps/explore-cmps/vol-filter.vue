<template>
  <section class="explore-filter">
    <div class="online-onsite">
      <label class="online" for="online" title="Volunteer Online">
        <input
          id="online"
          type="checkbox"
          v-model="filterBy.isOnLine"
          @change="filter"
        />
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626424950/volApp/icons/online_y28koq.svg"
          alt="online-img"
        />
      </label>
      <label class="onsite" for="onsite" title="Volunteer Onsite">
        <input
          id="onsite"
          type="checkbox"
          v-model="filterBy.isOnSite"
          @change="filter"
        />
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626424950/volApp/icons/onsite_ufyohr.svg"
          alt="onsite-img"
        />
      </label>
    </div>
    <label for="search"
      >Search:
      <input
        id="search"
        type="text"
        placeholder=""
        v-model="filterBy.txt"
        @input="filter"
      />
    </label>
    <div>
      <label for="category">
        Category:
        <select id="category" v-model="filterBy.category" @change="filter">
          <option value="all">All</option>
          <option value="animals">Animals</option>
          <option value="children">Children</option>
          <option value="elderly">Elderly</option>
        </select>
      </label>
      <label for="skills">
        Skills:
        <select id="skills" v-model="filterBy.skills" @change="filter">
          <option value="all">All</option>
          <option value="teaching">Teaching</option>
          <option value="designing">Designing</option>
          <option value="translating">Translating</option>
          <option value="building">Building</option>
          <option value="dreaming">Dreaming</option>
          <option value="typing">Typing</option>
        </select>
      </label>
      <label for="available">
        Availability:
        <select id="available" v-model="filterBy.availability" @change="filter">
          <option value="all">All</option>
          <option value="available">Available only</option>
        </select>
      </label>
    </div>
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
        isOnSite: false,
        isOnLine: false,
        availability: "all",
      },
    };
  },
  methods: {
    filter() {
      const copyFilterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filter", copyFilterBy);
    },
  },
  created() {
    this.filterBy = this.$store.getters.filterBy;
  },
};
</script>
