<template>
  <header
    class="main-header"
    :class="{ transparent: isTransparent && isMobileMenuOpen }"
  >
    <img
      @click="
        goToHome();
        closeMobileMenu();
      "
      class="logo"
      src="../../assets/img/logo4.png"
      alt="logo"
    />
    <img :src="mobileMenuIcon" class="btn-menu" @click="toggleMobileMenu" />
    <nav
      id="nav"
      :class="{ open: !isMobileMenuOpen }"
      @click="toggleMobileMenu"
    >
      <router-link to="/volApp" @click.native="toggleMobileMenu"
        >Explore</router-link
      >
      <router-link
        v-if="isLoggedIn"
        :to="'/user/' + currUser._id"
        @click.native="toggleMobileMenu"
        >My profile</router-link
      >

      <router-link
        to="/login"
        class="welcomeUser"
        @click.native="toggleMobileMenu"
      >
        Welcome {{ loggedinUser.username }}
        <img class="nav-user-img" :src="loggedinUser.imgUrl"
      /></router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      currUser: null,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    goToHome() {
      const path = "/";
      if (this.$route.path !== path) this.$router.push("/");
    },
    toggleMobileMenu() {
      console.log("toggling");
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
  },
  computed: {
    isTransparent() {
      return this.$store.getters.isTransHeader;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      if (user) {
        this.isLoggedIn = true;
        this.currUser = user;
        return user;
      } else {
        this.isLoggedIn = false;
      }
      return {
        username: "Guest",
        imgUrl:
          "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626419180/volApp/icons/account_circle_black_24dp_meg4mh.svg",
      };
    },
    mobileMenuIcon() {
      if (this.isMobileMenuOpen)
        return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1627146447/volApp/icons/mobileMenuOpen_hpmpyq.svg";
      return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1627146447/volApp/icons/mobileMenuClose_lyusl2.svg";
    },
  },
};
</script>