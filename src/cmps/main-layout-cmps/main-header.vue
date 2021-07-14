<template>
  <header class="main-header">
    <!-- <img class="logo" src="../../assets/img/logo.png" alt="logo" /> -->
    <h4>Logo</h4>
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/volApp">Explore</router-link>
      <!-- <router-link to="/user/:_id">Login/Loutout</router-link> -->

      <p v-if="!isLoggedIn">Hello Guest</p>
      <router-link v-else :to="/user/" +loggedinUser._id>
        | Profile/Loutout</router-link
      >
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

  computed: {
    // loggedinUser() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
};
</script>