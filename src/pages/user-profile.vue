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
      <userSideBar
        :user="user"
        :isLoggedSameAsCurr="isLoggedSameAsCurr"
        @openModal="openModal"
      />
      <user-vol-list
        v-if="userVols"
        :vols="userVols"
        :name="'Volunteering in'"
        class="user-vol-list"
      />
      <h3 class="empty-state" v-if="!userVols.length">
        Nowhere yet!
        <router-link class="explore-link" to="/volApp"
          >Explore Opportunities...</router-link
        >
      </h3>
    </div>
    <add-edit-vol v-if="isEditing" @closeModal="closeModal" />
  </section>
</template>

<script>
import userSideBar from "@/cmps/user-profile-cmps/user-sideBar.vue";
import userDetails from "@/cmps/user-profile-cmps/user-details.vue";
import userVolList from "@/cmps/user-profile-cmps/user-vol-list.vue";
import addEditVol from "@/cmps/add-edit-vol.vue";
import { showMsg } from "../services/event-bus.service.js";

export default {
  components: {
    userSideBar,
    userDetails,
    addEditVol,
    userVolList,
  },
  data() {
    return {
      user: null,
      isEditing: false,
      userVols: [],
    };
  },
  computed: {
    isLoggedSameAsCurr() {
      const loggedUser = this.$store.getters.loggedinUser;
      return this.user._id === loggedUser._id;
    },
  },
  methods: {
    openModal() {
      this.$store.commit({ type: "setVolToUpdate", vol: null });
      this.isEditing = !this.isEditing;
    },
    closeModal() {
      this.vol = this.$store.getters.volToUpdate;
      this.isEditing = false;
      this.loadUserVols();
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
    async loadUserVols() {
      const vols = await this.$store.dispatch({
        type: "userVols",
        userId: this.user._id,
      });
      this.userVols = vols;
      return vols;
    },
  },
  async created() {
    await this.setUser();
    this.loadUserVols();
  },
};
</script>
