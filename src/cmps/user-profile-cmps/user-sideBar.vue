<template>
  <section class="sidebar-container">
    <div class="details-sidebar">
      <h3 class="title-sidebar">Action Bar</h3>
      <div class="btn-container">
        <button
          @click="openModal"
          v-if="isLoggedSameAsCurr"
          class="details-btn focus"
        >
          Add volunteering
        </button>
        <button @click="onExplore" class="details-btn">Explore</button>
        <!-- <button @click="onShare" class="details-btn">Share</button> -->
        <div class="share-user-section">
          <ShareNetwork
          :popup="{width: 500, height: 500}"
            network="facebook"
            :url="url"
            title="My gVol Profile"
            class="share-link-facebook"
          >
            <img
              src="../../assets/img/facebook.svg"
              alt="facebookImg"
              title="share on facebook"
            />
          </ShareNetwork>

          <ShareNetwork
          :popup="{width: 500, height: 500}"
            network="whatsapp"
            :url="url"
            title="My gVol Profile"
            class="share-link-whatsapp"
          >
            <img
              src="../../assets/img/whatsapp.svg"
              alt="whatsappImg"
              title="share on whatsapp"
            />
          </ShareNetwork>

          <ShareNetwork
          :popup="{width: 500, height: 500}"
            network="twitter"
            :url="url"
            title="My gVol Profile"
            class="share-link-twitter"
          >
            <img
              src="../../assets/img/twitter.svg"
              alt="twitterImg"
              title="share on twitter"
            />
          </ShareNetwork>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from "../../services/event-bus.service.js";
export default {
  props: {
    user: {
      type: Object,
    },
    isLoggedSameAsCurr: {
      type: Boolean,
    },
  },
  data() {
    return {
      msg: "",
      loggedinUser: null,
      url: window.location.href,
    };
  },
  methods: {
    openModal() {
      this.$emit("openModal");
    },
    onExplore() {
      this.$router.push("/volApp");
    },
    onShare() {
      console.log("shared!");
      this.msg = "User profile shared !";
      showMsg(this.msg, "success");
      this.msg = "";
    },
    setUser() {
      this.loggedinUser = this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.setUser();
  },
};
</script>

