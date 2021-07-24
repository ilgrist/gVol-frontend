<template>
  <section class="explore-filter">
    <div class="online-onsite">
      <label class="online" for="online" title="Volunteer Online">
        Online
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
        Onsite
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
    <div class="selects">
      <div>
        <label for="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder=""
          v-model="filterBy.txt"
          @input="filter"
        />
      </div>
      <div>
        <label for="category">Category</label>
        <select id="category" v-model="filterBy.category" @change="filter">
          <option value="all">All</option>
          <option value="animals">Animals</option>
          <option value="children">Children</option>
          <option value="elderly">Elderly</option>
        </select>
      </div>
      <div>
        <label for="skills">Skills</label>
        <select id="skills" v-model="filterBy.skills" @change="filter">
          <option value="all">All</option>
          <option value="teaching">Teaching</option>
          <option value="designing">Designing</option>
          <option value="translating">Translating</option>
          <option value="building">Building</option>
          <option value="dreaming">Dreaming</option>
          <option value="typing">Typing</option>
        </select>
      </div>

      <div>
        <label for="available">Availability</label>
        <select id="available" v-model="filterBy.availability" @change="filter">
          <option value="all">All</option>
          <option value="available">Available Only</option>
        </select>
      </div>
    </div>
    <button class="filter-btn" @click="clearFilter">Clear Selection</button>
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
    clearFilter() {
      this.filterBy.txt = "";
      this.filterBy.category = "all";
      this.filterBy.skills = "all";
      this.filterBy.isOnSite = false;
      this.filterBy.isOnLine = false;
      this.filterBy.availability = "all";
      this.filter();
    },

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
