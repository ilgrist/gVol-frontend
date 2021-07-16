<template>
  <section class="short-list">
    <div class="short-header">
      <h1>{{name}}:</h1>
      <p @click="goExplore">See all</p>
    </div>
    <section v-if="randVols" class="cards-cont">
      <div v-for="vol,idx in randVols" :key="idx" @click="goToProfile(vol._id)" class="card-preview short">
        <h2>{{vol.title}}</h2>
        <p><span>{{vol.loc.city}},</span><span>{{vol.loc.country}}</span></p>
        <img :src="vol.imgUrls[0]" />
        <p class="rev-com"><img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"> <span>4.5</span> <img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365582/volApp/icons/mode_black_24dp_iqmj5f.svg"> <span>Reviews</span></p>
        <hr />
        <p>{{vol.desc}}</p>
        <hr />
        <article class="skills">
          Skills:
        <p v-for="skill,idx in vol.reqSkills" :key="idx"><span class="skill-span">{{skill}}</span> </p>
        </article>
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
    },
    goToProfile(volId){
       this.$router.push(`volApp/${volId}`);
    }
  },
  created(){
    this.$store.dispatch({ type: "loadVols" });
  }
};
</script>
