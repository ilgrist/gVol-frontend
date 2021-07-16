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
      <router-link to="/">Home</router-link> |
      <router-link to="/volApp">Explore</router-link>
      <!-- <router-link to="/user/:_id">Login/Loutout</router-link> -->
      <!-- <p v-if="!isLoggedIn">Hello Guest</p> -->
      <!-- <router-link :to="/user/" +loggedinUser._id>
        | Profile/Logout</router-link
      > -->
      <router-link to="/login"> | Welcome Guest</router-link>
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
    // loggedinUser() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
};
</script>