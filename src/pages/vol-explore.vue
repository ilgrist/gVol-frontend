<template>
  <div class="explore-page main-layout">
    <img
      v-if="isLoading"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <template v-else>
      <div class="explore-page">
        <vol-filter @filter="filter"></vol-filter>
        <vol-list :vols="vols" />
      </div>
    </template>
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
  created() {
    this.isLoading = true;
    this.$store.dispatch({ type: "loadVols" });
    this.isLoading = false;
  },
};
</script>
