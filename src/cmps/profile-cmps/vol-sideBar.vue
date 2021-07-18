<template>
  <section class="sidebar-container">
    <div class="details-sidebar">
      <h3 class="title-sidebar">Action Bar</h3>
      <div class="btn-container">
        <button @click="onVol" class="details-btn">Volunteer</button>
        <button @click="onShare" class="details-btn">Share</button>
      </div>
      <h4 v-if="vol.members">Participating Members</h4>
      <div v-if="vol.members" class="sidebar-users">
        <!-- <p class="users-avatar" v-for="member in vol.members" :key="member"> </p>-->
        <img
          v-for="member in vol.members"
          :key="member._id"
          class="img-profile"
          :src="member.imgURL"
          alt="imgProfile"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from "../../services/event-bus.service.js";
export default {
  props: {
    vol: {
      type: Object,
    },
  },
  data() {
    return {
      msg: "",
      loggedinUser: null
    };
  },
  computed:{
    setUser(){
      this.loggedinUser = this.$store.getters.loggedinUser
    }
  },
  methods: {
    onVol() {
      if(this.loggedinUser){
        this.msg = "Your request has been sent !";
        showMsg(this.msg, "success");
        this.msg = "";
      }else{
        this.$router.push("/login");
      }
    },
    onShare() {
      console.log("shared!");
      this.msg = "Volunteering shared !";
      showMsg(this.msg, "success");
      this.msg = "";
    },
  },
  created(){
    this.setUser()
  }
};
</script>

