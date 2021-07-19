<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{ name }}:</h1>
      <p @click="filter()">See all</p>
    </div>
    <section v-if="randVols" class="cards-cont">
      <shortVolListCard
        v-for="(vol, idx) in randVols"
        :vol="vol"
        :key="idx"
        @cardClicked="goToProfile"
        @filterBySkill="filter"
      />
    </section>
  </section>
</template>

<script>
import shortVolListCard from "./short-vol-list-card.vue";
export default {
  props: {
    name: String,
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
  computed: {
    randVols() {
      return this.$store.getters.shortListRandVols;
    },
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
  created() {
    // this.$store.dispatch({ type: "loadVols" });
  },
  components: {
    shortVolListCard,
  },
};
</script>
