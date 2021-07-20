<template>
  <div @click="goToProfile(vol._id)" class="card-preview card">
    <h2>{{ title }}</h2>
    <p v-if="!vol.loc.city && !vol.loc.country">Online</p>
    <p v-else>
      <span> {{ vol.loc.city }}, {{ vol.loc.country }} </span>
    </p>
    <img :src="vol.imgUrls[0]" />
    <div class="rev-cont">
      <div class="rating">
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"
        />
        <span>{{ avgRating }}</span>
      </div>
      <div class="reviews">
        <span>Reviews ({{ reviewNum }})</span>
      </div>
    </div>
    <hr />
    <p>{{ description }}</p>
    <hr />
    <article class="skills">
      Skills:
      <p
        class="skill-span-cont"
        v-for="(skill, idx) in vol.reqSkills"
        :key="idx"
      >
        <span>{{ skill }}</span>
      </p>
    </article>
  </div>
</template>

<script>
import { utilService } from "../../services/util.service.js";
export default {
  props: {
    vol: Object,
  },
  data() {
    return {
      reviews: this.vol.reviews,
    };
  },
  methods: {
    goToProfile(volId) {
      this.$router.push(`/volApp/${volId}`);
    },
  },
  computed: {
    title() {
      return utilService.shortTxt(this.vol.title, 30);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 80);
    },
    avgRating() {
      let ratingSum = 0;
      let ratingLength = 0;

      if (!this.reviews) return "None";
      this.reviews.forEach((review) => {
        if (!review.rating) return;
        ratingLength++;
        ratingSum += review.rating;
      });

      return (ratingSum / ratingLength).toFixed(2);
    },
    reviewNum() {
      if (!this.reviews) return "0";
      return this.reviews.length;
    },
  },
};
</script>

