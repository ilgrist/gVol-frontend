<template>
  <section class="card-preview card" @click="cardClicked">
    <div v-if="isOverTen" class="badge-text">{{ leftMembers }}</div>
    <el-carousel :autoplay="false" trigger="click" height="200px">
      <el-carousel-item v-for="(img, idx) in vol.imgUrls" :key="idx">
        <img :src="img" />
      </el-carousel-item>
    </el-carousel>
    <h3 class="card-title">{{ title }}</h3>
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
  },
  data() {
    return {
      reviews: this.vol.reviews,
      isOverTen: true,
      false: false,
    };
  },
  methods: {
    cardClicked() {
      this.$emit("cardClicked", this.vol);
    },
    filterBySkill(skill) {
      this.$emit("filterBySkill", skill);
    },
  },
  computed: {
    leftMembers() {
      const members = this.vol.members;
      const maxMembers = +this.vol.maxMembers;
      const left = maxMembers - members.length;
      if (left > 0 && left < 10) {
        this.isOverTen = true;
        return `${left} Left`;
      } else if (left >= 10) {
        this.isOverTen = false;
      } else {
        this.isOverTen = true;
        return "Full";
      }
    },
    title() {
      return this.vol.title;
      return utilService.shortTxt(this.vol.title, 25);
    },
    description() {
      return this.vol.desc;
      return utilService.shortTxt(this.vol.desc, 60);
    },
    avgRating() {
      let ratingLength = 0;
      let ratingSum = this.reviews.reduce((acc, review) => {
        if (!review.rating) return acc;
        ratingLength++;
        return acc + review.rating;
      }, 0);

      if (!ratingLength) return "None";
      return (ratingSum / ratingLength).toFixed(2);
    },
    reviewNum() {
      if (!this.reviews) return "0";
      return this.reviews.length;
    },
  },
};
</script>