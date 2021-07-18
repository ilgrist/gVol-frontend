<template>
  <section class="vol-profile main-layout">
    <img
      class="loading-img"
      v-if="!vol"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <!-- <div v-if="vol" class="vol-det"> -->
    <div v-else class="vol-det">
      <volDetails @sendRev="sendReview" :vol="vol" />
      <volSideBar :vol="vol" />
    </div>
  </section>
</template>

<script>
import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/profile-cmps/vol-details.vue";
import { volService } from "@/services/vol.service.js";
import { showMsg } from "../services/event-bus.service.js";

export default {
  components: {
    volSideBar,
    volDetails,
  },
  data() {
    return {
      vol: null,
    };
  },
  methods:{
    async sendReview(newReview) {
      console.log("send review");
      this.isNewReview = false
      newReview.volId = this.vol._id
      try{
        await this.$store.dispatch({type: "addReview", newReview })
        this.msg = "Review added !";
        showMsg(this.msg, "success");
      }
      catch{
        this.msg = "Cannot add review, Try again later..";
        showMsg(this.msg, "danger");

      }
      this.msg = "";
    },
    async setVol(){
      const { _id } = this.$route.params;
      if (_id)
      try {
        this.vol = await this.$store.dispatch({type:'getVol', _id})
      } catch (err) {
        console.log("Vol not available", err);
        throw err;
      }
    }
  },
  async created() {
    this.setVol()
  },
};
</script>
