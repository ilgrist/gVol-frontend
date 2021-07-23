<template>
  <div class="details-reviews">
    <header class="rating-header">
      <h3>⭐{{ avgRating }}</h3>
    </header>
    <header class="review-header">
      <h1>{{ reviews.length }} Review(s):</h1>
      <button v-if="!isNewReview" class="review-btn" @click="addReview">
        Add a Review
      </button>
    </header>
    <add-review v-if="isNewReview" @sendReview="sendReview"></add-review>

    <ul v-for="(review, idx) in reviews" :key="idx">
      <li class="review-container">
        <button @click.prevent.stop="removeReview(idx)" class="reviews-btn">
          X
        </button>
        <span class="review-user">
          {{ review.createdBy }} :
        </span>
        <span class="review-text">"{{ review.txt }}"</span> 
        <span class="review-stars">({{ starsDisplay(review.rating) }})</span>
        <span class="date">{{revDate(review.createdAt)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import addReview from "./add-review.vue";
const moment = require("moment")

export default {
  props: {
    volId: {
      type: String,
    },
  },
  data() {
    return {
      volRatingStars:'',
      msg: '',
      isNewReview: false,
      isLoggedinUser: false,
    };
  },

  computed: {
    reviews() {
      return this.$store.getters.currVol.reviews;
    },
    avgRating() {
      let ratingLength = 0;
      let ratingSum = this.reviews.reduce((acc, review) => {
        if (!review.rating) return acc;
        ratingLength++;
        return acc + review.rating;
      }, 0);

      if (!ratingLength) return "None";
      this.volRatingStars ="⭐".repeat((ratingSum / ratingLength).toFixed(1))
      this.$emit('stars', this.volRatingStars )
      return (ratingSum / ratingLength).toFixed(2);
    },
  },
  methods: {
    revDate(date){
      moment.locale('en-il')
      return moment(date).format('LLL');
    },
    starsDisplay(rating) {
      return "⭐".repeat(rating);
    },
    addReview() {
      if (this.isLoggedinUser) {
        this.isNewReview = true;
      } else {
        this.$router.push("/login");
      }
    },
    sendReview(newReview) {
      this.isNewReview = false;
      this.$emit("sendReview", newReview);
    },

    removeReview(revIdx) {
      this.$emit("removeReview", revIdx);
    },
  },

  created() {
    this.isLoggedinUser = this.$store.getters.loggedinUser;
  },
  components: {
    addReview,
  },
};
</script>

<style>
</style>