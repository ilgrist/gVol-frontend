<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{ name }}:</h1>
      <p @click="goExplore">See all</p>
    </div>
    <section v-if="randVols" class="cards-cont">
      <shortVolListCard
        :vol="vol"
        v-for="(vol, idx) in randVols"
        :key="idx"
        @cardClicked="goToProfile"
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
    return {};
  },
  computed: {
    randVols() {
      return this.$store.getters.shortListRandVols;
    },
  },
  methods: {
    goExplore() {
      this.$router.push("/volApp");
    },
    goToProfile(volId) {
      this.$router.push(`volApp/${volId}`);
    },
  },
  created() {
    this.$store.dispatch({ type: "loadVols" });
  },
  components: {
    shortVolListCard,
  },
};
</script>
