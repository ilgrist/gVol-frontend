<template>
  <div class="explore-page main-layout">
    <vol-filter @filter="filter"></vol-filter>
    <div class="loading-container" v-if="isLoading">
      <img src="/img/icons/loading_dmwaqp.gif" alt="loading" />
    </div>
    <vol-list v-else :vols="vols" />
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
  data() {
    return {
      isLoading: false,
    };
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
  async created() {
    this.isLoading = true;
    this.isLoading = false;
    this.$store.dispatch({ type: "loadVols" });
  },
};
</script>
