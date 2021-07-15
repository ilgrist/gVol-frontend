<template>
  <div class="details-reviews">
    <header class="review-header">
      <h3>{{ vol.reviews.length }} Review(s) relating to {{ vol.title }}:</h3>
      <button class="review-btn">Add a Review</button>
    </header>
    <ul v-for="review in vol.reviews" :key="review._id">
      <li>{{ review.createdBy }}: {{ review.txt }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    vol: {
      type: Object,
    },
  },
};
</script>

<style>
</style>