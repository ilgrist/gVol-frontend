<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{ name }}:</h1>
    </div>
    <section v-if="vols" class="cards-cont">
      <shortVolListCard
        v-for="(vol, idx) in vols"
        :vol="vol"
        :key="idx"
        @cardClicked="goToProfile"
        @filterBySkill="filter"
      />
    </section>
  </section>
</template>

<script>
import shortVolListCard from "./user-vol-list-card.vue";
export default {
  props: {
    name: String,
    vols: Array,
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
    filter(skill = "all") {
      this.filterBy.skills = skill;
      let filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterBy);
    },
    goToProfile(volId) {
      this.$router.push(`/volApp/${volId}`);
    },
  },
  created() {},
  components: {
    shortVolListCard,
  },
};
</script>
