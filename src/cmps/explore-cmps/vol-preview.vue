<template>
  <div @click="goToProfile(vol._id)" class="card-preview card">
    <h2>{{ title }}</h2>
    <p>
      <span>{{ vol.loc.city }},</span><span>{{ vol.loc.country }}</span>
    </p>
    <img :src="vol.imgUrls[0]" />
    <div class="rev-cont">
      <div class="rating">
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"
        />
        <span>4.5</span>
      </div>
      <div class="reviews">
        <img
          src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365582/volApp/icons/mode_black_24dp_iqmj5f.svg"
        />
        <span>Reviews</span>
      </div>
    </div>
    <hr />
    <p>{{ description }}</p>
    <hr />
    <p>
      Skills:
      <span v-for="(skill, idx) in vol.reqSkills" :key="idx">{{ skill }}</span>
    </p>
  </div>
</template>

<script>
import { utilService } from "../../services/util.service.js";
export default {
  props: {
    vol: Object,
  },
  methods: {
    goToProfile(volId) {
      this.$router.push(`volApp/${volId}`);
    },
  },
  computed: {
    title() {
      return utilService.shortTxt(this.vol.title, 30);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 80);
    },
  },
};
</script>

