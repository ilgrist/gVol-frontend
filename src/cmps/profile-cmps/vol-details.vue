<template>
  <section class="vol-details">
    <header class="details-header">
      <h2>
        {{ vol.title }}
        <button title="Edit Vol" v-if="isCreatedBy" @click="openModal"><img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626876387/edit_note_black_24dp_zmb8jd.svg"></button>
      </h2>
      <h4>Opportunity offered by "{{ vol.org.name }}"</h4>
      <p class="details-location" v-if="!vol.loc.city && !vol.loc.country">
        Online
      </p>
      <p v-else>
        <span class="details-location">
          {{ vol.loc.city }}, {{ vol.loc.country }}
        </span>
      </p>

      <p>
        <span class="details-tag" v-for="tag in vol.tags" :key="tag">
          {{ tag }}
        </span>
      </p>
    </header>

    <div class="img-gallery">
      <div v-for="(img, idx) in vol.imgUrls" :key="idx">
        <img class="details-img" :src="img" alt="img-details-grid" />
      </div>
    </div>

    <div class="more-details">
      <h3>
        More Details
        <img
          title="Read More"
          v-if="isShort && vol.desc.length > 200"
          class="toggleMore"
          @click="toggleMore"
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626603292/volApp/icons/more_rurxqi.svg"
          alt="readMore"
        />
        <img
          title="Read Less"
          v-if="!isShort && vol.desc.length > 200"
          class="toggleMore"
          @click="toggleMore"
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626603292/volApp/icons/less_nafgg8.svg"
          alt="readLess"
        />
      </h3>
      <h4 v-if="isShort">
        {{ description }}
      </h4>
      <h4 v-else>
        {{ vol.desc }}
      </h4>

      <p>
        Required Skills:
        <span class="req-skill" v-for="skill in vol.reqSkills" :key="skill">
          {{ skill }}
        </span>
      </p>
    </div>
    <volReviews
      :volId="vol._id"
      @sendReview="sendReview"
      @removeReview="removeReview"
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
    };
  },
  methods: {
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
      const creator = this.vol.createdBy
      const loggeddinUser = this.$store.getters.loggedinUser
      if(!creator || !loggeddinUser) return
      if(loggeddinUser._id === creator){
        this.isCreatedBy = true
      }
    },
  },
  computed: {
    description() {
      return utilService.shortTxt(this.vol.desc, 200);
    },
  },
  created(){
    this.checkCreator()
  }
};
</script>

