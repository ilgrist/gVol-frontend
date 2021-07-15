<template>
  <div class="home main-layout">
    <hero />
    <short-list class="homepage-layout" v-if="isload" :name="'Popular'" />
    <short-list class="homepage-layout" v-if="isload" :name="'Newest'" />
    <categories-grid class="homepage-layout" />
  </div>
</template>
<script>
import hero from "../cmps/homepage-cmps/hero.vue";
import categoriesGrid from "../cmps/homepage-cmps/categories-grid.vue";
import shortList from "../cmps/homepage-cmps/short-vol-list.vue";

export default {
  name: "Home",
  components: {
    hero,
    categoriesGrid,
    shortList,
  },
  data() {
    return {
      isload: false,
    };
  },
  computed: {
    vols() {
      return this.$store.getters.volsToShow;
    },
  },
  async created() {
    await this.$store.dispatch({ type: "loadVols" });
    this.isload = true;
  },
};
</script>
