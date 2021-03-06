<template>
  <section class="vol-details">
    <header class="details-header">
      <h2>
        {{ vol.title }}
        <button title="Edit Vol" v-if="isCreatedBy" @click="openModal">
          <img src="/img/icons/edit_note_black_24dp_zmb8jd_kxigkd.svg" />
        </button>
      </h2>
      <a href="#reviews" class="vol-stats">
        <img src="img/icons/star_rwjmbm.png" />
        {{ avgRating }} ({{ vol.reviews.length }} Reviews)
      </a>
      <p class="details-location" v-if="!vol.loc.city && !vol.loc.country">
        Online
      </p>
      <p v-else>
        <span class="details-location">
          {{ vol.loc.city }}, {{ vol.loc.country }}
        </span>
      </p>
      <p>
        <span
          class="details-tag"
          v-for="tag in vol.tags"
          :key="tag"
          @click="filterTag(tag)"
        >
          {{ tag }}
        </span>
      </p>
    </header>

    <div class="img-gallery">
      <div v-for="(img, idx) in vol.imgUrls" :key="idx">
        <img class="details-img" :src="img" alt="img-details-grid" />
      </div>
    </div>

    <el-carousel
      class="img-gallery-tablet"
      :autoplay="false"
      trigger="click"
      max-height="650px"
    >
      <el-carousel-item v-for="(img, idx) in vol.imgUrls" :key="idx">
        <img :src="img" />
      </el-carousel-item>
    </el-carousel>

    <section class="more-details">
      <h3>
        More Details
        <img
          title="Read More"
          v-if="isShort && vol.desc.length > 200"
          class="toggleMore"
          @click="toggleMore"
          src="/img/icons/more_rurxqi.svg"
          alt="readMore"
        />
        <img
          title="Read Less"
          v-if="!isShort && vol.desc.length > 200"
          class="toggleMore"
          @click="toggleMore"
          src="/img/icons/less_nafgg8.svg"
          alt="readLess"
        />
      </h3>

      <h4 v-if="isShort">
        {{ description }}
      </h4>

      <h4 v-else>
        {{ vol.desc }}
      </h4>

      <section class="amenities">
        <article
          class="amenity"
          v-for="(amenity, idx) in vol.amenities"
          :key="idx"
        >
          <img
            class="amenity-img"
            :src="amenity.imgUrl"
            alt="amenityImg"
            :title="amenity.label"
          />
          {{ amenity.label }}
        </article>
      </section>
      <p class="skills">
        Required Skills:
        <span
          class="req-skill"
          v-for="skill in vol.reqSkills"
          :key="skill"
          @click="filterSkill(skill)"
        >
          {{ skill }}
        </span>
      </p>
      <!-- <p>
        Date:
          <span class="header-date">01/07/2021 - 30/07/2021</span>
      </p> -->
    </section>

    <volReviews
      id="reviews"
      :volId="vol._id"
      @sendReview="sendReview"
      @removeReview="removeReview"
      @stars="setRatingStars"
    />
  </section>
</template>



<script>
import volReviews from "@/cmps/profile-cmps/vol-reviews.vue";
import { utilService } from "@/services/util.service.js";

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
      isShort: true,
      isCreatedBy: false,
      ratingStars: "",
      filterBy: {
        category: null,
        skills: null,
      },
    };
  },
  methods: {
    filterSkill(skill) {
      this.filterBy.skills = skill.toLowerCase();
      let filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterBy);
    },
    filterTag(category) {
      this.filterBy.category = category.toLowerCase();
      let filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterBy);
    },
    goToReviews() {},
    openModal() {
      this.$emit("openModal");
    },
    closeModal() {
      console.log("sanity");
      this.$emit("closeModal");
    },

    toggleMore() {
      this.isShort = !this.isShort;
    },
    sendReview(newReview) {
      this.$emit("sendReview", newReview);
    },
    removeReview(revIdx) {
      this.$emit("removeReview", revIdx);
    },
    checkCreator() {
      const creator = this.vol.createdBy;
      const loggeddinUser = this.$store.getters.loggedinUser;
      if (!creator || !loggeddinUser) return;
      if (loggeddinUser._id === creator) {
        this.isCreatedBy = true;
      }
    },
    setRatingStars(stars) {
      this.ratingStars = stars;
    },
  },
  computed: {
    avgRating() {
      let ratingLength = 0;
      let ratingSum = this.vol.reviews.reduce((acc, review) => {
        if (!review.rating) return acc;
        ratingLength++;
        return acc + review.rating;
      }, 0);

      if (!ratingLength) return "None";
      this.volRatingStars = "⭐".repeat((ratingSum / ratingLength).toFixed(1));
      this.$emit("stars", this.volRatingStars);
      return (ratingSum / ratingLength).toFixed(2);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 200);
    },
  },
  created() {
    this.checkCreator();
  },
};
</script>

