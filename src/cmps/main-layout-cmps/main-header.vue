<template>
  <header class="main-header" :class="{ transparent: isTransparent }">
    <img
      @click="goToHome"
      class="logo"
      src="../../assets/img/logo4.png"
      alt="logo"
    />
    <!-- src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626281313/volApp/logo3_wuazzc.png" -->
    <nav id="nav">
      <router-link to="/volApp">Explore</router-link> |
      <router-link to="/user/60f69d281863063fc020ea9f">User</router-link> |
      <router-link to="/login"> Welcome {{ loggedinUser.username }} <img class="nav-user-img" :src="loggedinUser.imgUrl"></router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    goToHome() {
      const path = "/";
      if (this.$route.path !== path) this.$router.push("/");
    },
  },
  computed: {
    isTransparent() {
      return this.$store.getters.isTransHeader;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      if (user) return user;
      return "Guest";
    },
  },
};
</script>