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
  </section>
</template>

<script>

import { uploadImg } from "../../services/img-upload.service.js";

export default {

    data(){
        return{
             newUser: {
                fullname: "",
                username: "",
                password: "",
                skills: "",
                imgUrl: "",
                },
                skills: ["-", "teaching", "translating", "designing"],
        }
    },
    methods: {
        signup() {
          const newUserCopy =JSON.parse(JSON.stringify(this.newUser))
            this.$emit('signup', newUserCopy)
        },
        async handleFile(ev) {
        const file = ev.target.files[0];
        const res = await uploadImg(ev);
        console.log("res:", res);
        this.newUser.imgUrl = res.url;
        },
        back() {
        this.$emit('back')
        },
        }
}
</script>
