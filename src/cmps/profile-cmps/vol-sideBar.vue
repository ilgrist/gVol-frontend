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
          class="img-profile"
          :src="member.imgUrl"
          alt="imgProfile"
          @click="goToUserProfile(member._id)"
        />
      </div>
      <!-- </template> -->
      <button @click="onVol" class="sidebar-btn volunteer-btn">
        Volunteer
      </button>
      <!-- <ShareNetwork
      network="facebook"
      :url="url"
      :title="vol.title"
      :description="vol.desc">
    Facebook
  </ShareNetwork>
      <ShareNetwork
      network="twitter"
      :url="url"
      :title="vol.title"
      :description="vol.desc">
    Twitter
  </ShareNetwork>
      <ShareNetwork
      network="whatsapp"
      :url="url"
      :title="vol.title"
      :description="vol.desc">
    WhatsApp
  </ShareNetwork> -->
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
      url: window.location.href
    };
  },
  methods: {
    goToUserProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
    async onVol() {
      if (this.members.find((member) => member._id === this.loggedinUser._id)) {
        showMsg("Member Already Registered ", "success");
        return;
      }
      if(this.members.length >= +this.vol.maxMembers) {
        showMsg("This volunteering is fully booked", "success");
        return
      }
      if (this.loggedinUser) {
        const vol = this.$store.getters.currVol;
        const member = {
          _id: this.loggedinUser._id,
          imgUrl: this.loggedinUser.imgUrl,
        };
        vol.members.push(member);
        await this.$store.dispatch({ type: "saveVol", vol });
        showMsg("Your request has been sent!", "success");
      } else {
        this.$router.push("/login");
      }
    },
    facebook() {
      showMsg("Volunteering shared on Facebook!", "success");
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