<template>
  <section class="sidebar-container">
    <div class="details-sidebar">
      <h3 class="title-sidebar">Action Bar</h3>
      <div class="btn-container">
        <button @click="openModal" class="details-btn focus">
          Add volunteering
        </button>
        <button @click="onExplore" class="details-btn">Explore</button>
        <button @click="onShare" class="details-btn">Share</button>
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
  },
  data() {
    return {
      msg: "",
      loggedinUser: null,
    };
  },
  methods: {
    openModal() {
      this.$emit("openModal");
    },
    onExplore() {},
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

