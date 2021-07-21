<template>
  <header class="main-header" :class="{ transparent: isTransparent }">
    <img
      @click="goToHome"
      class="logo"
      src="../../assets/img/logo4.png"
      alt="logo"
    />
    <nav id="nav">
      <router-link to="/volApp">Explore</router-link> |
      <!-- <router-link to="/user/60f69d281863063fc020ea9f">User</router-link> | -->
      <router-link v-if="isLoggedIn" :to="'/user/' +currUser._id">My profile | </router-link> 
      <router-link to="/login"> Welcome {{ loggedinUser.username }} <img class="nav-user-img" :src="loggedinUser.imgUrl"></router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      currUser: null,
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
      if (user){
        this.isLoggedIn =true
        this.currUser = user
        return user;
      } else{
        this.isLoggedIn =false
      }
      return {username:"Guest", imgUrl:"https://res.cloudinary.com/dzuqvua7k/image/upload/v1626419180/volApp/icons/account_circle_black_24dp_meg4mh.svg"};
    },
  },
};
</script>