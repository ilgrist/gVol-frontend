<template>
  <section class="user-details">
    <header class="details-header">
    <div v-if="isPro" class="badge-text">Proffesional 🥇</div>
      <div class="user-profile-img-cont">
        <img :src="user.imgUrl" />
      </div>
      <h2>{{ user.fullname }}</h2>
      <p>
        Skills:
        <span
          class="details-tag"
          v-for="(skill, idx) in user.skills"
          :key="idx"
        >
          {{ skill }}
        </span>
      </p>
    </header>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    user: {
      type: Object,
    },
    vols:{
      type:Array
    }
  },
  data() {
    return {
      displayOnline: "Online",
      isShort: true,
      isPro: false,
    };
  },
  methods: {
    toggleMore() {
      this.isShort = !this.isShort;
    },
    isProUser(){
      if(this.vols.length >= 3){
        this.isPro = true
      }
    }
  },
  computed: {},
  created(){
    this.isProUser()
  },
  watch: { 
      	vols: function(newVal, oldVal) { 
          // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          if(newVal.length >= 3){
            this.isPro = true
          }else {
            this.isPro = false
          }
        }
      }
};
</script>

