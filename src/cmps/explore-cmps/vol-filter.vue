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
        <el-input
          id="search"
          type="text"
          prefix-icon="el-icon-search"
          placeholder="Search"
          v-model="filterBy.txt"
          clearable
        />
      </div>
      <div>
        <el-select id="category" v-model="filterBy.category" placeholder="Category">
          <el-option value="all">All</el-option>
          <el-option value="animals">Animals</el-option>
          <el-option value="children">Children</el-option>
          <el-option value="elderly">Elderly</el-option>
        </el-select>
      </div>
      <div>
        <el-select id="skills" v-model="filterBy.skills" placeholder="Skills">
          <el-option value="all">All</el-option>
          <el-option value="teaching">Teaching</el-option>
          <el-option value="designing">Designing</el-option>
          <el-option value="translating">Translating</el-option>
          <el-option value="building">Building</el-option>
          <el-option value="dreaming">Dreaming</el-option>
          <el-option value="typing">Typing</el-option>
        </el-select>
      </div>

      <div>
        <!-- <label for="available">Availability</label> -->
        <el-select id="available" v-model="filterBy.availability" placeholder="Availability">
          <el-option value="all">All</el-option>
          <el-option value="available">Available Only</el-option>
        </el-select>
      </div>
    </div>
    <div>
    <button class="filter-btn search" @click="filter">Search</button>
    <button class="filter-btn clear" @click="clearFilter">Clear</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        category: "",
        skills: "",
        isOnSite: false,
        isOnLine: false,
        availability: "",
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
  destroyed(){
    this.filterBy = {
        txt: "",
        category: "all",
        skills: "all",
        isOnSite: false,
        isOnLine: false,
        availability: "all",
      }
  }
};
</script>
