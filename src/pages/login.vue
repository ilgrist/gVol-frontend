<template>
  <div class="login">
    <h1>Welcome to gVol</h1>
    <!-- <h2>{{ title }}</h2> -->
    <!-- <<label v-if="!loggedInUser"> -->
    <input v-model="user.username" type="text" />
    <input v-mdel="user.password" type="password" />
    <label for="skills"></label>
    <select name="" id=""></select>
    <!-- </label> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
        skills,
      },
    };
  },
};
</script>

