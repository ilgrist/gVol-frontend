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
<<<<<<< HEAD
  },
  destroyed() {
    this.$store.commit({ type: "setTransHeader", isTransHeader: false });
    document.removeEventListener("scroll", this.handleScrollY);
=======
>>>>>>> b5e4092b2fa69cf7c0461f5d58fe233e02d328de
  },
};
</script>
