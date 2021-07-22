<template>
  <section class="sidebar-container">
    <div class="details-sidebar">
      <div class="sidebar-users">
        <div class="users-header">
          <h4 v-if="!vol.maxMembers">Volunteers</h4>
          <h4 v-else>
            {{ vol.members.length }} out of {{ vol.maxMembers }} Volunteers
          </h4>
        </div>
        <!-- <template v-if="members.length > 0"> -->
        <img
          v-for="(member, idx) in members"
          :key="idx"
          class="sidebar-img-profile"
          :src="member.imgUrl"
          alt="imgProfile"
          @click="goToUserProfile(member._id)"
        />
      </div>
      <!-- </template> -->
      <button @click="onVol" class="sidebar-btn volunteer-btn">
        Volunteer
      </button>
    </div>
  </section>
</template>

<script>
import { showMsg } from "../../services/event-bus.service.js";
export default {
  props: {
    vol: {
      type: Object,
    },
  },
  data() {
    return {
      msg: "",
      members: this.$store.getters.getMembers,
    };
  },
  methods: {
    goToUserProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
    async onVol() {
      if (this.members.find((member) => member._id === this.loggedinUser._id)) {
        this.msg = "Member Already Registered ";
        showMsg(this.msg, "success");
        this.msg = "";
        return;
      }
      if (this.loggedinUser) {
        const vol = this.$store.getters.currVol;
        const member = {
          _id: this.loggedinUser._id,
          imgUrl: this.loggedinUser.imgUrl,
        };
        vol.members.push(member);
        await this.$store.dispatch({ type: "saveVol", vol });
        this.msg = "Your request has been sent!";
        showMsg(this.msg, "success");
        this.msg = "";
      } else {
        this.$router.push("/login");
      }
    },
    onShare() {
      console.log("shared!");
      this.msg = "Volunteering shared!";
      showMsg(this.msg, "success");
      this.msg = "";
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>



<!-- Comment  

BACKUP


<template>
  <section class="sidebar-container">
    <div class="details-sidebar">
      <h3 class="title-sidebar">Action Bar</h3>
      <div class="btn-container">
        <button @click="onVol" class="details-btn focus">Volunteer</button>
        <button @click="onShare" class="details-btn">Share</button>
      </div>
      <template v-if="members.length > 0">
        <h4>Participating Members</h4>
        <div class="sidebar-users">
          <img
            v-for="(member, idx) in members"
            :key="idx"
            class="img-profile"
            :src="member.imgUrl"
            alt="imgProfile"
            @click="goToUserProfile(member._id)"
          />
        </div>
      </template>
    </div>
  </section>
</template>
 Comment -->