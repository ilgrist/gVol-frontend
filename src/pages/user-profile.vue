<template>
  <section class="vol-profile main-layout">
    <img
      class="loading-img"
      v-if="!user"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <div v-else class="user-det">
      <userDetails :user="user" />
      <!-- <volSideBar :vol="vol" /> -->
    </div>
  </section>
</template>

<script>
// import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import userDetails from "@/cmps/user-profile-cmps/user-details.vue";
import { showMsg } from "../services/event-bus.service.js";

export default {
  components: {
    // volSideBar,
    userDetails,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async setUser() {
      const { _id } = this.$route.params;
      if (_id)
        try {
          this.user = await this.$store.dispatch({
            type: "loadAndWatchUser",
            userId: _id,
          });
        } catch (err) {
          console.log("User not available", err);
          throw err;
        }
    },
  },
  async created() {
    this.setUser();
  },
};
</script>
