<template>
  <div class="explore-page">
    <vol-filter @filter="filter"></vol-filter>
    <vol-list :vols="vols" />
  </div>
</template>

<script>
import volList from "../cmps/explore-cmps/vol-list.vue";
import volFilter from "../cmps/explore-cmps/vol-filter.vue";
export default {
  name: "Home",
  components: {
    volList,
    volFilter,
  },
  computed: {
    vols() {
      return this.$store.getters.volsToShow;
    },
  },
  methods: {
    filter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "loadVols" });
    },
  },
  created() {
    this.$store.dispatch({ type: "loadVols" });
  },
};
</script>
