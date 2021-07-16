<template>
  <section class="main-layout vol-profile">
    <ul v-if="vol" class="vol-det">
      <volDetails :vol="vol" />
      <volSideBar :vol="vol" />
    </ul>
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

