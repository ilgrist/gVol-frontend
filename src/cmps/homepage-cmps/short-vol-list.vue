<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{name}}:</h1>
      <p @click="goExplore">See all</p>
    </div>
    <section v-if="randVols" class="cards-cont">
      <div v-for="vol,idx in randVols" :key="idx" class="card-preview">
        <h2>{{vol.title}}</h2>
        <p><span>{{vol.loc.city}},</span><span>{{vol.loc.country}}</span></p>
        <img :src="vol.imgUrls[0]" />
        <p class="rev-com">⭐ <span>4.5</span> 💬 <span>Reviews</span></p>
        <hr />
        <p>{{vol.desc}}</p>
        <hr />
        <p v-for="skill,idx in vol.reqSkills" :key="idx"><span>{{skill}}</span> </p>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props:{
    name:String
  },
  data(){
    return{
      
    }
  },
  computed:{
    randVols(){
      return this.$store.getters.shortListRandVols
      }
  },
  methods:{
    goExplore(){
      this.$router.push('/volApp')
    }
  },
  created(){
    this.$store.dispatch({ type: "loadVols" });
  }
};
</script>
