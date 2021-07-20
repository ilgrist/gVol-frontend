<template>
  <section class="login-page-cont main-layout">
    <h1>Welcome to gVol</h1>
    <button @click="logout" v-if="loggedinUser">Logout</button>
    <login
      class="login"
      @login="login"
      v-if="isRegistered && !loggedinUser"
    ></login>
    <div class="login-signup-area" v-if="isRegistered && !loggedinUser">
      <h1>Not registered ?</h1>
      <button @click="register">Sign-up Now</button>
    </div>
    <signup
      v-if="isNewUser"
      class="signup"
      @back="back"
      @signup="signup"
    ></signup>
  </section>
</template>

<script>
import { uploadImg } from "../services/img-upload.service.js";
import { showMsg } from "../services/event-bus.service.js";
import signup from "../cmps/login-page.cmps/signup.vue";
import login from "../cmps/login-page.cmps/login.vue";

export default {
  data() {
    return {
      isRegistered: true,
      isNewUser: false,
      msg: "",
      currUserName: "user1",
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    register() {
      this.isNewUser = true;
      this.isRegistered = false;
    },
    back() {
      this.isNewUser = false;
      this.isRegistered = true;
    },
    async login(userCred) {
      try {
        const user = await this.$store.dispatch({
          type: "login",
          userCred,
        });
        this.currUserName = user.username;
        this.msg = `Welcome back - ${user.username} !`;
        showMsg(this.msg, "success");
        this.msg = "";
        this.$router.go(-1)
      } catch {
        this.msg = `Wrong credentials, try again!`;
        showMsg(this.msg, "danger");
      }
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.msg = `Goodbye, - ${this.currUserName} !`;
      showMsg(this.msg, "danger");
    },
    async signup(newUser) {
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          newUser,
        });
        this.msg = `Welcome to the gVol family, ${user.username} !`;
        showMsg(this.msg, "success");
        this.msg = "";
        this.$router.go(-1)
      } catch {
        this.msg = `Can't sign up, try again!`;
        showMsg(this.msg, "danger");
      }
    },
    async handleFile(ev) {
      const file = ev.target.files[0];
      const res = await uploadImg(ev);
      console.log("res:", res);
      this.newUser.imgUrl = res.url;
    },
  },
  components: {
    signup,
    login,
  },
};
</script>
