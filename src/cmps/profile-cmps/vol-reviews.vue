<template>
  <div class="details-reviews">
    <header class="review-header">
      <h3>{{ vol.reviews.length }} Review(s) relating to {{ vol.title }}:</h3>
      <button class="review-btn" @click="addReview">Add a Review</button>
    </header>
    <ul v-for="review in vol.reviews" :key="review._id">
      <li>{{ review.createdBy }}: {{ review.txt }}</li>
    </ul>
  </div>
</template>

<script>
import { showMsg } from '../../services/event-bus.service.js';

export default {
  props: {
    vol: {
      type: Object,
    },
  },
  data(){
    return{
      msg:''
    }
  },
  methods:{
    addReview(){
      console.log('add review');
      this.msg = 'Review added !'
      showMsg(this.msg, 'success')
      this.msg = ''
    }
  },
};
</script>

<style>
</style>