<template>
  <div class="details-reviews">
    <header class="review-header">
      <h3>{{ reviews.length }} Review(s):</h3>
      <button v-if="!isNewReview" class="review-btn" @click="addReview">
        Add a Review
      </button>
    </header>
    <add-review v-if="isNewReview" @sendRev="sendReview"></add-review>
    <ul v-for="review in reviews" :key="review._id">
      <li>
        <span class="review-user"> {{ review.createdBy }} </span>:
        <!-- {{ timeDisplay(review.createdAt) }} -->
        "{{ review.txt }}"
      </li>
    </ul>
  </div>
</template>

<script>
import { showMsg } from "../../services/event-bus.service.js";
import addReview from "./add-review.vue";

export default {
  props: {
    reviews: {
      type: Array,
    },
    volId: {
      type: String,
    },
  },
  data() {
    return {
      msg: "",
      isNewReview: false,
      isLoggedinUser:false
    };
  },

  computed: {},
  methods: {
    addReview() {
      if(this.isLoggedinUser){
        this.isNewReview = true
      }else{
        this.$router.push("/login");
      }
    },
    async sendReview(newReview) {
      this.isNewReview = false;
      newReview.volId = this.volId;
      this.$emit("sendRev", newReview);
    },
    // timeDisplay(time) {
    //   return time.toLocaleTimeString("en-US");
    // },
  },
  created(){
    this.isLoggedinUser = this.$store.getters.loggedinUser
  },
  components:{
    addReview,
  },
};
</script>

<style>
</style>