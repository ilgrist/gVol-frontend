<template>
  <section class="vol-profile main-layout">
    <img
      class="loading-img"
      v-if="!vol"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <!-- <div v-if="vol" class="vol-det"> -->
    <div v-else class="vol-det">
      <volDetails :vol="vol" />
      <volSideBar :vol="vol" />
    </div>
  </section>
</template>

<script>
import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/profile-cmps/vol-details.vue";
import { volService } from "@/services/vol.service.js";
export default {
  components: {
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

