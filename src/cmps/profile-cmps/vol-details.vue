<template>
  <section class="vol-details">
    <header class="details-header">
      <h2>{{ vol.title }}</h2>
      <h4>Opportunity offered by "{{ vol.org.name }}"</h4>
      <p v-if="vol.loc">Located at {{ vol.loc.city }}, {{ vol.loc.country }}</p>
      <div v-for="tag in vol.tags" :key="tag">
        <span class="details-tag details-online">{{ displayOnline }}</span>
        <span class="details-tag">{{ tag }}</span>
      </div>
    </header>
    <div class="img-gallery">
      <img class="details-img" :src="vol.imgUrls" alt="VolIMG" />
      <img class="details-img" src="../../assets/img/dragon2.jpg" alt="" />
      <img class="details-img" src="../../assets/img/dragon.jpg" alt="" />
      <img class="details-img" src="../../assets/img/dragon4.jpg" alt="" />
    </div>
    <div class="more-details">
      <h3>More Details</h3>
      <h4>{{ vol.desc }}</h4>
      <p>
        Required Skills:
        <span class="req-skill" v-for="skill in vol.reqSkills" :key="skill">
          {{ skill }}
        </span>
      </p>
    </div>
    <volReviews :vol="vol" />
  </section>
</template>

<script>
import volReviews from "@/cmps/profile-cmps/vol-reviews.vue";
export default {
  components: {
    volReviews,
  },
  props: {
    vol: {
      type: Object,
    },
  },
  data() {
    return {
      displayOnline: "Online",
    };
  },
  computed: {
    isOnline() {
      console.log(this.vol.loc);
      if (this.vol.loc.isOnline) this.displayOnline = "Online";
      else this.displayOnline = "On Site ";
    },
  },

  methods: {},
};
</script>

// $(function() { // $( "#button" ).click(function() { // $( "#button"
).addClass( "onclic", 250, validate); // }); // function validate() { //
setTimeout(function() { // $( "#button" ).removeClass( "onclic" ); // $(
"#button" ).addClass( "validate", 450, callback ); // }, 2250 ); // } //
function callback() { // setTimeout(function() { // $( "#button" ).removeClass(
"validate" ); // }, 1250 ); // } // });
