<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{ name }}:</h1>
    </div>
    <section v-if="vols" class="cards-cont">
      <userVolListCard
        v-for="(vol, idx) in vols"
        :vol="vol"
        :key="idx"
        @cardClicked="goToProfile"
        @filterBySkill="filter"
        @leaveVol="leaveVol"
      />
    </section>
  </section>
</template>

<script>
import userVolListCard from "./user-vol-list-card.vue";
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
    goToProfile(vol) {
      this.$store.commit({ type: "setCurrVol", vol });
      this.$router.push(`/volApp/${vol._id}`);
    },
    leaveVol(vol) {
      this.$emit("leaveVol", vol);
    },
  },
  created() {},
  components: {
    userVolListCard,
  },
};
</script>
