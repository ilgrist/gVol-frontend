<template>
  <section>
    <ul v-if="vol" class="vol-details">
      <!-- {{
        vol
      }} -->
      <volDetails :vol="vol" />
    </ul>
  </section>
</template>

<script>
import volReviews from "@/cmps/details-cmps/vol-reviews.vue";
import volSideBar from "@/cmps/details-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/details-cmps/vol-details.vue";
import { volService } from "@/services/vol.service.js";
export default {
  components: {
    volReviews,
    volSideBar,
    volDetails,
  },
  data() {
    return {
      vol: null,
    };
  },
  async created() {
    const { _id } = this.$route.params;
    console.log("file: vol-profile.vue ~ line 27 ~ _id", _id);
    console.log(
      "file: vol-profile.vue ~ line 27 ~ this.$route.params",
      this.$route.params
    );

    if (_id)
      try {
        this.vol = await volService.getById(_id);
      } catch (err) {
        console.log("Vol not available", err);
        throw err;
      }
  },
};
</script>

