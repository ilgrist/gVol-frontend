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
        createdBy: ""
      },
    };
  },
  methods:{
      sendReview(){
          const copyReview = JSON.parse(JSON.stringify(this.review))
          this.$emit('sendRev', copyReview )
      },
      setUser(){
          const loggedinUser = this.$store.getters.loggedinUser
          this.review.createdBy = loggedinUser.username
      }
  },
  created(){
      this.setUser()
  }
};
</script>
