<template>
  <section class="card-preview card" @click="cardClicked">
    <h3>{{ title }}</h3>
    <p>
      <span>{{ vol.loc.city }}, </span><span>{{ vol.loc.country }}</span>
    </p>
    <img :src="vol.imgUrls[0]" />
    <div class="rev-cont">
      <div class="rating">
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"
        />
        <span>{{avgRating}}</span>
      </div>
      <div class="reviews">
        <span> Reviews ({{reviewNum}})</span>
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
        <span @click.stop="filterBySkill(skill)">{{ skill }}</span>
      </p>
    </article>
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
      reviews: this.vol.reviews
    };
  },
  methods: {
    cardClicked() {
      this.$emit("cardClicked", this.vol._id);
    },
    filterBySkill(skill) {
      this.$emit("filterBySkill", skill);
    },
  },
  computed: {
    title() {
      return utilService.shortTxt(this.vol.title, 25);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 50);
    },
    avgRating() {
      let ratingSum = 0;
      let ratingLength = 0;

      this.reviews.forEach((review) => {
        if (!review.rating) return;
        ratingLength++;
        ratingSum += review.rating;
      });

      return (ratingSum / ratingLength).toFixed(2);
    },
    reviewNum(){
      return this.reviews.length
    }
  
  },
};
</script>