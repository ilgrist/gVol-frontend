<template>
  <div class="details-reviews">
    <h3>Reviews</h3>
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