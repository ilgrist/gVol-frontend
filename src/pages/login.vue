<template>
<section class="login-page-cont">
    <h1>Welcome to gVol</h1>
  <div class="login">
    <label for="username"> Username:
      <input v-model="user.username" id="username" type="text" />
    </label>
    <label for="password">Password:
      <input v-model="user.password" id="password" type="password" />
    </label>
    <button @click="login">login</button>
  </div>
  <div class="login-signup-area">
    <h1>Not registered ?</h1>
    <button @click="register">Sign-up Now</button>
  </div>
  <div class="signup" v-if="isNewUser">
    <label for="fullnme"> Fullnme:
      <input v-model="newUser.fullname" id="fullnme" type="text" />
    </label>
    <label for="username"> Username:
      <input v-model="newUser.username" id="username" type="text" />
    </label>
    <label for="password">Password:
      <input v-model="newUser.password" id="password" type="password" />
    </label>
    <label for="skills"> Skills:
      <select name="" v-model="newUser.skills" id="skills">
        <option v-for="skill in skills" :key="skill" :value="skill">{{skill}}</option>
      </select>
    </label>
    <label for="img">Profile img:
      <img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626361907/volApp/icons/image_black_24dp_bisc9a.svg">
      <input id="img" type="file" />
    </label>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isNewUser:false,
      user:{
        username: '',
        password: '',
      },
      newUser: {
        fullname: '',
        username: '',
        password: '',
        skills: '',
        imgurl: '',
      },
      skills:['-','teaching', 'translating','designing']
    };
  },
  methods:{
   register(){
     this.isNewUser =  true
   },
   login(){
     const userCopy = JSON.parse(JSON.stringify(this.user))
     console.log('userCopy:', userCopy)
   }
  }
};
</script>
