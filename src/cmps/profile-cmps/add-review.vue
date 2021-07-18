<template>
  <section>
    <label for="txt">
      <input id="txt" v-model="review.txt" type="text" />
    </label>
    <button @click="sendReview">Send</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        txt: "",
      },
    };
  },
  methods:{
      sendReview(){
          const copyReview = JSON.parse(JSON.stringify(this.review))
          console.log('copyReview:', copyReview)
      }
  }
};
</script>
