<template>
  <section></section>
</template>

<script>
import volReviews from "../details-cmps/vol-reviews.vue";
import volSideBar from "../details-cmps/vol-sideBar.vue";
import { volService } from "../../services/vol.service.js";
export default {
  components: {
    volReviews,
    volSideBar,
  },
  data() {
    return {
      vol: null,
    };
  },
  async created() {
    const { volId } = this.$route.params;
    if (volId)
      try {
        this.vol = await volService.getById(volId);
      } catch (err) {
        console.log("Vol not available", err);
        throw err;
      }
  },
};
</script>

