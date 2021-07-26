<template>
  <div class="details-reviews">
    <header class="rating-header"></header>
    <header class="review-header">
      <h1>{{ reviews.length }} Review(s): {{ volRatingStars }}</h1>
      <button v-if="!isNewReview" class="review-btn" @click="addReview">
        Add a Review
      </button>
    </header>
    <add-review v-if="isNewReview" @sendReview="sendReview"></add-review>

    <ul v-for="(review, idx) in reviews" :key="idx">
      <li class="review-container">
        <button
          v-if="loggedinUser && loggedinUser.username === review.createdBy"
          @click.prevent.stop="removeReview(idx)"
          class="reviews-btn el-icon-delete"
        >
          Delete Review
        </button>

        <div class="review-user">
          <img
            class="img-profile"
            :src="review.imgUrl"
            alt="reviewImg"
            @click="goToUserProfile(review.userId)"
          />
          <div class="review-user-header">
            <div>
              {{ review.createdBy }}
              <span
                v-for="num in review.rating"
                :key="num"
                class="review-stars"
              >
                <img
                  src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1627220320/star_rwjmbm.png"
                />
              </span>
            </div>
            <span class="date">{{ revDate(review.createdAt) }}</span>
          </div>
        </div>
        <div class="review-text">{{ review.txt }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import addReview from "./add-review.vue";
const moment = require("moment");

export default {
  props: {
    volId: {
      type: String,
    },
  },
  data() {
    return {
      volRatingStars: "",
      msg: "",
      isNewReview: false,
      loggedinUser: false,
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
      this.volRatingStars = (ratingSum / ratingLength).toFixed(1);
      this.$emit("stars", this.volRatingStars);
      return (ratingSum / ratingLength).toFixed(1);
    },
  },
  methods: {
    goToUserProfile(userId) {
      console.log("file: vol-reviews.vue ~ line 90 ~ userId", userId);
      if (userId) {
        this.$router.push(`/user/${userId}`);
      }
    },
    revDate(date) {
      moment.locale("en-il");
      return moment(date).format("LLL");
    },
    starsDisplay(rating) {
      return "⭐".repeat(rating);
    },
    addReview() {
      if (this.loggedinUser) {
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
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  components: {
    addReview,
  },
};
</script>

<style>
</style>