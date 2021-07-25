<template>
  <header
    class="main-header"
    :class="{ transparent: isTransparent && !isMobileMenuOpen }"
  >
    <section class="content main-layout">
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
        :class="{ open: isMobileMenuOpen }"
        @click.stop="closeMobileMenu"
      >
        <router-link to="/volApp" @click.native="closeMobileMenu"
          >Explore</router-link
        >
        <router-link
          :to="userImgLink"
          class="welcomeUser"
          @click.native="toggleMobileMenu"
        >
          <img class="nav-user-img" :src="loggedinUser.imgUrl"
        /></router-link>
      </nav>
    </section>
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
    userImgLink() {
      return this.isLoggedIn ? "/user/" + this.currUser._id : "/login";
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
        return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1627146447/volApp/icons/mobileMenuClose_lyusl2.svg";
      return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1627146447/volApp/icons/mobileMenuOpen_hpmpyq.svg";
    },
  },
};
</script>