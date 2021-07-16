<template>
  <div class="home main-layout">
    <hero />
    <short-list v-if="isload" :name="'Popular'" />
    <categories-grid />
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
      scrollY: 0,
      isHeaderTrans: true,
    };
  },
  computed: {
    vols() {
      return this.$store.getters.volsToShow;
    },
  },
  methods: {
    handleScrollY() {
      this.scrollY = window.scrollY;
      this.scrollY ? (this.isTransHeader = false) : (this.isTransHeader = true);
      this.$store.commit({
        type: "setTransHeader",
        isTransHeader: this.isTransHeader,
      });
    },
  },
  async created() {
    this.$store.commit({ type: "setTransHeader", isTransHeader: true });
    document.addEventListener("scroll", this.handleScrollY);
    await this.$store.dispatch({ type: "loadVols" });
    this.isload = true;
  },
  destroyed() {
    this.$store.commit({ type: "setTransHeader", isTransHeader: false });
    document.removeEventListener("scroll", this.handleScrollY);
  },
};
</script>
