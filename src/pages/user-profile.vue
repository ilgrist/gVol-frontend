<template>
  <section class="vol-profile main-layout">
    <img
      class="loading-img"
      v-if="!user"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <div v-else class="vol-det">
      <userDetails :user="user" />
      <userSideBar :user="user" @openModal="openModal" />
    </div>
    <add-edit-vol v-if="isEditing" @closeModal="closeModal" />
  </section>
</template>

<script>
import userSideBar from "@/cmps/user-profile-cmps/user-sideBar.vue";
import userDetails from "@/cmps/user-profile-cmps/user-details.vue";
import addEditVol from "@/cmps/add-edit-vol.vue";
import { showMsg } from "../services/event-bus.service.js";

export default {
  components: {
    userSideBar,
    userDetails,
    addEditVol,
  },
  data() {
    return {
      user: null,
      isEditing: false,
    };
  },
  methods: {
    openModal() {
      this.$store.commit({ type: "setVolToUpdate", vol: null });
      this.isEditing = !this.isEditing;
    },
    closeModal() {
      this.vol = this.$store.getters.volToUpdate;
      this.isEditing = false;
    },
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
