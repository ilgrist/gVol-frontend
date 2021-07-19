<template>
  <div>
    <hero @filterBy="goExplore"/>
    <!-- <img
      class="loading-img"
      v-if="isLoading"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <template v-else> -->
    <short-list
      class="main-layout"
      v-if="isload"
      :name="'Popular'"
      @filterBy="goExplore"
    />
    <short-list
      class="main-layout"
      v-if="isload"
      :name="'Newest'"
      @filterBy="goExplore"
    />
    <categories-grid class="main-layout" />
    <!-- </template> -->
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
      // isLoading: false,
    };
  },
  computed: {
    vols() {
      return this.$store.getters.volsToShow;
    },
  },
  methods: {
    goExplore(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$router.push("/volApp");
    },
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
    // this.isLoading = true;
    await this.$store.dispatch({ type: "loadVols" });
    // this.isLoading = false;
    this.isload = true;
  },
  destroyed() {
    this.$store.commit({ type: "setTransHeader", isTransHeader: false });
    document.removeEventListener("scroll", this.handleScrollY);
  },
};
</script>

