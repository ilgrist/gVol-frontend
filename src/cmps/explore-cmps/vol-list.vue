<template>
  <section class="explore-list">
    <short-prev
      @cardClicked="goToProfile"
      v-for="(vol, idx) in vols"
      :key="idx"
      :vol="vol"
    ></short-prev>
  </section>
</template>

<script>
import shortPrev from "../homepage-cmps/short-vol-list-card.vue";

export default {
  props: {
    vols: Array,
  },
  components: {
    shortPrev,
  },
  methods: {
    goToProfile(vol) {
      this.$store.commit({ type: "setCurrVol", vol });
      this.$router.push(`/volApp/${vol._id}`);
    },
  },
};
</script>
