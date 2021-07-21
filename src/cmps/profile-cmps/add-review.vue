<template>
  <section class="add-review">
    <label>
      <div class="rating">
        Rate the Vol:
        <span v-for="(star, idx) in 5" :key="idx" @click="saveRate(star)">
          {{ getAStar(idx) }}
        </span>
      </div>
    </label>
    <label for="txt">
      <textarea
        cols="20"
        rows="3"
        placeholder="Type Review Here..."
        id="txt"
        v-model="review.txt"
        type="text"
      />
    </label>
    <button @click="sendReview">Submit Review</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        txt: "",
        createdBy: "",
        rating: "",
      },
    };
  },
  methods: {
    sendReview() {
      const copyReview = JSON.parse(JSON.stringify(this.review));
      this.$emit("sendReview", copyReview);
    },
    setUser() {
      const loggedinUser = this.$store.getters.loggedinUser;
      this.review.createdBy = loggedinUser.username;
    },
    getAStar(idx) {
      if (this.review.rating <= idx) return "☆";
      return "★";
    },
    saveRate(idx) {
      this.review.rating = idx;
    },
  },
  created() {
    this.setUser();
  },
};
</script>
