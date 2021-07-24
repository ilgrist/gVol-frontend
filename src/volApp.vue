<template>
  <div id="app">
    <main-header />
    <user-msg />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import mainHeader from "@/cmps/main-layout-cmps/main-header.vue";
import mainFooter from "@/cmps/main-layout-cmps/main-footer.vue";
import userMsg from "./cmps/user-msg.vue";
import { socketService } from "./services/socket.service.js";

export default {
  components: {
    mainHeader,
    mainFooter,
    userMsg,
  },
  created() {
    this.$store.dispatch({ type: "loadUsers" });
    this.$store.dispatch({ type: "loadVols" });
    this.$store.dispatch({ type: "setLoggedInUser" });
  },
};
</script>
