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
        <span class="review-user">
          {{ review.createdBy }}
          <!-- <span> {{ review.createdAt }}</span> -->
        </span>
        "{{ review.txt }}" ({{ starsDisplay(review.rating) }})
        <!-- - {{ review.rating }} Stars -->
      </li>
    </ul>
  </div>
</template>

<script>
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
      let ratingLength = 0;
      let ratingSum = this.reviews.reduce((acc, review) => {
        if (!review.rating) return acc;
        ratingLength++;
        return acc + review.rating;
      }, 0);

      if (!ratingLength) return "None";
      return (ratingSum / ratingLength).toFixed(2);
    },
  },
  methods: {
    starsDisplay(rating) {
      return "★".repeat(rating);
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