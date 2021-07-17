<template>
  <section class="login-page-cont main-layout">
    <h1>Welcome to gVol</h1>
    <div class="login" v-if="isRegistered">
      <h2>Login</h2>
      <label for="username">
        Username:
        <input v-model="user.username" id="username" type="text" />
      </label>
      <label for="password"
        >Password:
        <input v-model="user.password" id="password" type="password" />
      </label>
      <button @click="login">Login</button>
    </div>
    <div class="login-signup-area" v-if="isRegistered">
      <h1>Not registered ?</h1>
      <button @click="register">Sign-up Now</button>
    </div>
    <div class="signup" v-if="isNewUser">
      <h2>Sign-up</h2>
      <div class="label-input">
        <label for="fullnme">
          <p>Fullname:</p>
          <input v-model="newUser.fullname" id="fullnme" type="text" />
        </label>
        <label for="username">
          <p>Username:</p>
          <input v-model="newUser.username" id="username" type="text" />
        </label>
        <label for="password">
          <p>Password:</p>
          <input v-model="newUser.password" id="password" type="password" />
        </label>
        <label class="skills" for="skills">
          <p>Skills:</p>
          <select name="" v-model="newUser.skills" id="skills">
            <option v-for="skill in skills" :key="skill" :value="skill">
              {{ skill }}
            </option>
          </select>
        </label>
        <label class="profile-img" for="img"
          >Profile img:
          <img
            src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626419180/volApp/icons/account_circle_black_24dp_meg4mh.svg"
          />
          <input id="img" type="file" @change="handleFile" />
        </label>
      </div>
      <div class="signup-btn">
        <button @click="signup">Sign-up</button>
        <button @click="back">Back</button>
      </div>
    </div>
  </section>
</template>

<script>
import { uploadImg } from "../services/img-upload.service.js";
import { showMsg } from "../services/event-bus.service.js";

export default {
  data() {
    return {
      isRegistered: true,
      isNewUser: false,
      user: {
        username: "",
        password: "",
      },
      newUser: {
        fullname: "",
        username: "",
        password: "",
        skills: "",
        imgUrl: "",
      },
      skills: ["-", "teaching", "translating", "designing"],
      msg: "",
    };
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
    login() {
      const userCopy = JSON.parse(JSON.stringify(this.user));
      console.log("userCopy:", userCopy);
      this.msg = `Welcome Back - ${userCopy.username} !`;
      showMsg(this.msg, "success");
      this.msg = "";
    },
    signup() {
      const userCopy = JSON.parse(JSON.stringify(this.newUser));
      console.log("userCopy:", userCopy);
      this.msg = `Welcome to the gVol family!`;
      showMsg(this.msg, "success");
      this.msg = "";
    },
    async handleFile(ev) {
      const file = ev.target.files[0];
      const res = await uploadImg(ev);
      console.log("res:", res);
      this.newUser.imgUrl = res.url;
    },
  },
  created() {
    this.$store.dispatch.loadUsers;
  },
};
</script>
