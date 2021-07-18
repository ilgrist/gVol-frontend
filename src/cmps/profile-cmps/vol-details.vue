<template>
  <section class="vol-details">
    <header class="details-header">
      <h2>{{ vol.title }}</h2>
      <h4>Opportunity offered by "{{ vol.org.name }}"</h4>
      <p class="details-location" v-if="!vol.loc.city && !vol.loc.country">
        Online
      </p>
      <p v-else>
        <span class="details-location">
          {{ vol.loc.city }}, {{ vol.loc.country }}
        </span>
      </p>
      <!-- <p class="tag-container" v-for="tag in vol.tags" :key="tag">
        <span class="details-tag">{{ tag }}</span>
      </p> -->
      <p>
        <span class="details-tag" v-for="tag in vol.tags" :key="tag">
          {{ tag }}
        </span>
      </p>
    </header>

    <div class="img-gallery">
      <img class="details-img main-img" :src="vol.imgUrls" alt="VolIMG" />
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
    <volReviews v-if="vol.reviews" :vol="vol" />
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
    // isOnline() {
    //   console.log(this.vol.loc);
    //   if (this.vol.loc.isOnline) this.displayOnline = "Online";
    //   else this.displayOnline = "On Site ";
    // },
  },

  methods: {},
};
</script>

