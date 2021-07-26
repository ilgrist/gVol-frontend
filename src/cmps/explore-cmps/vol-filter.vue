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
        <img src="/img/icons/online_y28koq.svg" alt="online-img" />
      </label>
      <label class="onsite" for="onsite" title="Volunteer Onsite">
        Onsite
        <input
          id="onsite"
          type="checkbox"
          v-model="filterBy.isOnSite"
          @change="filter"
        />
        <img src="/img/icons/onsite_ufyohr.svg" alt="onsite-img" />
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
        <el-select
          id="category"
          v-model="filterBy.category"
          placeholder="Category"
        >
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select id="skills" v-model="filterBy.skills" placeholder="Skills">
          <el-option
            v-for="skill in skills"
            :key="skill.value"
            :label="skill.label"
            :value="skill.value"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        <!-- <label for="available">Availability</label> -->
        <el-select
          id="available"
          v-model="filterBy.availability"
          placeholder="Availability"
        >
          <el-option
            v-for="availability in availabilities"
            :key="availability.value"
            :label="availability.label"
            :value="availability.value"
          >
          </el-option>
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

      availabilities: [
        {
          value: "all",
          label: "All",
        },
        {
          value: "available",
          label: "Available",
        },
      ],

      skills: [
        {
          value: "all",
          label: "All",
        },
        {
          value: "teaching",
          label: "Teaching",
        },
        {
          value: "designing",
          label: "Designing",
        },
        {
          value: "translating",
          label: "Translating",
        },
        {
          value: "building",
          label: "Building",
        },
        {
          value: "dreaming",
          label: "Dreaming",
        },
        {
          value: "typing",
          label: "Typing",
        },
      ],
      categories: [
        {
          value: "all",
          label: "All",
        },
        {
          value: "animals",
          label: "Animals",
        },
        {
          value: "children",
          label: "Children",
        },
        {
          value: "elderly",
          label: "Elderly",
        },
      ],
      value: "",
    };
  },
  methods: {
    clearFilter() {
      this.filterBy.txt = "";
      this.filterBy.category = "";
      this.filterBy.skills = "";
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
  destroyed() {
    this.filterBy = {
      txt: "",
      category: "",
      skills: "",
      isOnSite: false,
      isOnLine: false,
      availability: "all",
    };
    this.filter();
  },
};
</script>
