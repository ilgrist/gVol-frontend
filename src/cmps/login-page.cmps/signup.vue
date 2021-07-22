<template>
  <section>
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
        <el-select
          placeholder="Existing Skills"
          name=""
          multiple
          v-model="newUser.skills"
          id="skills"
        >
          <el-option
            v-for="skill in skills"
            :key="skill.value"
            :label="skill.label"
            :value="skill.value"
          >
          </el-option>
        </el-select>
      </label>
      <label class="profile-img" for="img"
        >Profile img:
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626419180/volApp/icons/account_circle_black_24dp_meg4mh.svg"
        />
        <input id="img" type="file" @change="handleFile" />
      </label>
        <img v-if="isLoadingImg" class="signup-loader" src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"/>
      <img v-if="isSelectImg" class="img-prev" :src="newUser.imgUrl" />
    </div>
    <div class="signup-btn">
      <button @click="signup">Sign-up</button>
      <button @click="back">Back</button>
    </div>
  </section>
</template>

<script>
import { uploadImg } from "../../services/img-upload.service.js";

export default {
  data() {
    return {
      isLoadingImg: false,
      isSelectImg: false,
      newUser: {
        fullname: "",
        username: "",
        password: "",
        skills: [],
        imgUrl: "",
      },

      skills: [
        {
          value: "dreaming",
          label: "Dreaming",
        },
        {
          value: "building",
          label: "Building",
        },
        {
          value: "translating",
          label: "Translating",
        },
        {
          value: "hugging",
          label: "Hugging",
        },
        {
          value: "saving",
          label: "Saving",
        },
      ],
    };
  },
  methods: {
    pushSkill(skill) {
      console.log("file: signup.vue ~ line 60 ~ skill", skill);
      this.newUser.skills.push(skill);
    },
    signup() {
      const newUserCopy = JSON.parse(JSON.stringify(this.newUser));
      if (!newUserCopy.imgUrl)
        newUserCopy.imgUrl =
          "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626590331/volApp/volImgs/no_avatar_cyv8iq.jpg";
      this.$emit("signup", newUserCopy);
    },

    // TODO: include loading
    async handleFile(ev) {
      this.isLoadingImg = true
      const file = ev.target.files[0];
      const res = await uploadImg(ev);
      this.newUser.imgUrl = res.url;
      this.isLoadingImg = false
      this.isSelectImg = true;
    },
    back() {
      this.$emit("back");
    },
  },
};
</script>
