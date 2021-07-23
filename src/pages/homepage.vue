<template>
  <div>
    <hero @filterBy="goExplore" />
    <!-- <img
      class="loading-img"
      v-if="isLoading"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <template v-else> -->
    <homepage-map :volsLocs="volsLocs" />
    <short-list
      class="main-layout"
      v-if="isload"
      name="Most Popular"
      :vols="popularVols"
      @filterBy="goExplore"
    />
    <short-list
      class="main-layout"
      v-if="isload"
      :vols="mostReviewedVols"
      name="Most Reviewed"
      @filterBy="goExplore"
    />
    <categories-grid class="main-layout" @filterBy="goExplore" />
    <!-- </template> -->
  </div>
</template>
<script>
import hero from "../cmps/homepage-cmps/hero.vue";
import categoriesGrid from "../cmps/homepage-cmps/categories-grid.vue";
import shortList from "../cmps/homepage-cmps/short-vol-list.vue";
import homepageMap from "../cmps/homepage-cmps/homepage-map.vue";

export default {
  name: "Home",
  components: {
    hero,
    categoriesGrid,
    shortList,
    homepageMap,
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
    volsLocs() {
      let vols = JSON.parse(JSON.stringify(this.$store.getters.volsToShow));
      let volsLocs = vols
        .filter((vol) => vol.loc.lat && vol.loc.lng)
        .map((vol) => {
          return Object.assign({ id: vol._id, title: vol.title }, vol.loc);
        });

      return volsLocs;
    },

    popularVols() {
      let popularVols = JSON.parse(
        JSON.stringify(this.$store.getters.volsToShow)
      );

      popularVols.sort((volA, volB) => {
        return volB.members.length - volA.members.length;
      });
      return popularVols.slice(0, 4);
    },

    mostReviewedVols() {
      let mostReviewedVols = JSON.parse(
        JSON.stringify(this.$store.getters.volsToShow)
      );
      mostReviewedVols.sort((volA, volB) => {
        return volB.reviews.length - volA.reviews.length;
      });
      return mostReviewedVols.slice(0, 4);
    },
    // vols() {
    //   return this.$store.getters.volsToShow;
    // },
  },
  methods: {
    goExplore(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$router.push("/volApp");
    },
    handleScrollY() {
      this.scrollY = window.scrollY;
      this.isTransHeader = this.scrollY ? false : true;
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

