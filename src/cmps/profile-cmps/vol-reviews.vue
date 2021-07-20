<template>
  <div class="details-reviews">
    <header class="rating-header">
      <h3>⭐{{ avgRating }}</h3>
    </header>
    <header class="review-header">
      <h3>{{ reviews.length }} Review(s):</h3>
      <button v-if="!isNewReview" class="review-btn" @click="addReview">
        Add a Review
      </button>
    </header>
    <add-review v-if="isNewReview" @sendReview="sendReview"></add-review>
    <ul v-for="(review, idx) in reviews" :key="idx">
      <li>
        <button @click.prevent.stop="removeReview(idx)" class="reviews-btn">
          X
        </button>
        <span class="review-user"> {{ review.createdBy }} </span> "{{
          review.txt
        }}" - {{ review.rating }} Stars
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
      isLoggedinUser: false,
    };
  },

  computed: {
    avgRating() {
      // TODO: TURN TO REDUCE
      let ratingSum = 0;
      let ratingLength = 0;

      this.reviews.forEach((review) => {
        if (!review.rating) return;
        ratingLength++;
        ratingSum += review.rating;
      });
      if (!this.reviews.length) return "None";
      return (ratingSum / ratingLength).toFixed(2);
    },
  },
  methods: {
    addReview() {
      if (this.isLoggedinUser) {
        this.isNewReview = true;
      } else {
        this.$router.push("/login");
      }
    },
    async sendReview(newReview) {
      this.isNewReview = false;
      // newReview.volId = this.volId;
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