<template>
  <section class="card-preview card" @click="cardClicked">
    <el-carousel :autoplay="false" trigger="click" height="200px">
      <el-carousel-item v-for="(img, idx) in vol.imgUrls" :key="idx">
        <img :src="img" />
      </el-carousel-item>
    </el-carousel>
    <div class="card-title-cont">
      <h3 class="card-title">{{ title }}</h3>
      <button
        @click.stop="leaveVol"
        v-if="isLoggedSameAsCurr"
        class="leave-vol-btn"
        title="Leave volunteering"
      >
        ✖
      </button>
    </div>
    <div class="details-loc-cont">
      <p class="details-location" v-if="!vol.loc.city && !vol.loc.country">
        Online
      </p>
      <p v-else>
        <span class="details-location">
          {{ vol.loc.city }}, {{ vol.loc.country }}
        </span>
      </p>
    </div>
    <!-- <img :src="vol.imgUrls[0]" /> -->
    <p class="card-description">{{ description }}</p>
    <article class="skills">
      Skills:
      <p
        class="skill-span-cont"
        v-for="(skill, idx) in vol.reqSkills"
        :key="idx"
      >
        <span @click.stop="filterBySkill(skill)">{{ skill }}</span>
      </p>
    </article>
    <div class="rev-cont">
      <div class="rating">
        <!-- <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"
        /> -->

        <span> &#9733; {{ avgRating }}</span>
      </div>
      <div class="reviews">
        <span> Reviews ({{ reviewNum }})</span>
      </div>
    </div>
  </section>
</template>



<script>
import { utilService } from "../../services/util.service.js";
export default {
  props: {
    vol: Object,
    isLoggedSameAsCurr: Boolean,
  },
  data() {
    return {
      reviews: this.vol.reviews,
    };
  },
  methods: {
    cardClicked() {
      this.$emit("cardClicked", this.vol);
    },
    filterBySkill(skill) {
      this.$emit("filterBySkill", skill);
    },
    leaveVol() {
      this.$emit("leaveVol", this.vol);
    },
  },
  computed: {
    title() {
      return utilService.shortTxt(this.vol.title, 25);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 60);
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