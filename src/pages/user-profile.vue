<template>
  <section class="vol-profile main-layout">
    <img
      class="loading-img"
      v-if="!user"
      src="/img/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <div v-else class="vol-det user-det">
      <div class="user-profile">
        <userDetails v-if="userVols" :vols="userVols" :user="user" />
        <user-vol-list
          v-if="userVols && userVols.length"
          :vols="userVols"
          :name="'Volunteering in'"
          :isLoggedSameAsCurr="isLoggedSameAsCurr"
          class="user-vol-list"
          @filterBy="filterBy"
          @leaveVol="leaveVol"
        />
        <div class="empty-state" v-if="userVols && !userVols.length">
          <h3 class="empty-state-title">
            <router-link class="explore-link" to="/volApp"
              ><h2>Explore Volunteering Opportunities:</h2></router-link
            >
          </h3>
          <short-list
            class="main-layout"
            name="Most Popular"
            :vols="popularVols"
            @filterBy="filterBy"
          />
        </div>
      </div>

      <userSideBar
        :user="user"
        :isLoggedSameAsCurr="isLoggedSameAsCurr"
        @openModal="openModal"
      />
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
import shortList from "../cmps/homepage-cmps/short-vol-list.vue";

export default {
  components: {
    userSideBar,
    userDetails,
    addEditVol,
    userVolList,
    shortList,
  },
  data() {
    return {
      user: null,
      isEditing: false,
      userVols: null,
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isLoggedSameAsCurr() {
      // const loggedUser = this.$store.getters.loggedinUser;
      if (this.loggedinUser) return this.user._id === this.loggedinUser._id;
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
  },
  methods: {
    openModal() {
      this.$store.commit({ type: "setCurrVol", vol: null });
      this.isEditing = !this.isEditing;
    },
    closeModal() {
      this.vol = this.$store.getters.currVol;
      this.isEditing = false;
      this.loadUserVols();
    },
    async setUser() {
      const { _id } = this.$route.params;
      console.log("_id:", _id);
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
    filterBy(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$router.push("/volApp");
    },
    async leaveVol(vol) {
      console.log("user ", this.user.username, " is leavingVol", vol);
      const volToLeave = JSON.parse(JSON.stringify(vol));
      const memberIdx = volToLeave.members.findIndex(
        (member) => member._id === this.user._id
      );
      volToLeave.members.splice(memberIdx, 1);
      await this.$store.dispatch({ type: "saveVol", vol: volToLeave });
      this.msg = "You left the Vol Successfully";
      showMsg(this.msg, "success");
      this.loadUserVols();
    },
  },
  async created() {
    await this.setUser();
    this.loadUserVols();
  },
};
</script>
