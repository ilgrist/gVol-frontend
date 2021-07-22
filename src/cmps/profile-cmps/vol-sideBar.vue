<template>
  <section class="vol-sidebar-container">
    <div class="vol-details-sidebar">
      <div class="vol-sidebar-users">
        <div class="vol-users-header">
          <h4 v-if="!vol.maxMembers">Volunteers</h4>
          <h4 v-else>
            {{ vol.members.length }} out of {{ vol.maxMembers }} Volunteers
          </h4>
        </div>

        <img
          v-for="(member, idx) in members"
          :key="idx"
          class="vol-img-profile"
          :src="member.imgUrl"
          alt="imgProfile"
          @click="goToUserProfile(member._id)"
        />
      </div>
      <!-- <img
        class="vol-sidebar-map"
        src="https://www.zyrgon.com/wp-content/uploads/2019/06/googlemaps-Zyrgon.jpg"
      /> -->
      <vol-map
        v-if="this.vol.loc.isOnsite"
        class="vol-sidebar-map"
        :vol="vol"
      />
      <section class="vol-sidebar-btn-container">
        <button @click="onVol" class="vol-sidebar-btn volunteer-btn">
          Volunteer
        </button>
        <div class="share-section">
          <ShareNetwork
            :popup="{ width: 500, height: 500 }"
            network="facebook"
            :url="url"
            :title="vol.title"
            :description="vol.desc"
            class="share-link"
          >
            <img
              class="share-btn facebook"
              src="../../assets/img/facebook.svg"
              alt="facebookImg"
            />
          </ShareNetwork>

          <ShareNetwork
            :popup="{ width: 500, height: 500 }"
            network="whatsapp"
            :url="url"
            :title="vol.title"
            :description="vol.desc"
          >
            <img
              class="share-btn whataspp"
              src="../../assets/img/whatsapp.svg"
              alt="whatsappImg"
            />
          </ShareNetwork>

          <ShareNetwork
            :popup="{ width: 500, height: 500 }"
            network="twitter"
            :url="url"
            :title="vol.title"
            :description="vol.desc"
          >
            <img
              class="share-btn twitter"
              src="../../assets/img/twitter.svg"
              alt="twitterImg"
            />
          </ShareNetwork>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { showMsg } from "@/services/event-bus.service.js";
import volMap from "@/cmps/profile-cmps/vol-map.vue";
export default {
  components: {
    volMap,
  },
  props: {
    vol: {
      type: Object,
    },
  },
  data() {
    return {
      msg: "",
      members: this.$store.getters.getMembers,
      url: window.location.href,
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
      if (this.members.length >= +this.vol.maxMembers) {
        showMsg("This volunteering is fully booked", "success");
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