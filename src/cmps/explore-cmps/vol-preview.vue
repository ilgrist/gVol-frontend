<template>
  <div @click="goToProfile(vol._id)" class="card-preview">
    <h2>{{ vol.title }}</h2>
    <p>
      <span>{{ vol.loc.city }},</span><span>{{ vol.loc.country }}</span>
    </p>
    <img :src="vol.imgUrls[0]" />
    <p class="rev-com"><img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"> <span>4.5</span> <img src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365582/volApp/icons/mode_black_24dp_iqmj5f.svg"> <span>Reviews</span></p>
    <hr />
    <p>{{ vol.desc }}</p>
    <hr />
    <p>
      Skills:
      <span v-for="(skill, idx) in vol.reqSkills" :key="idx">{{ skill }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    vol: Object,
  },
  methods: {
    goToProfile(volId) {
      this.$router.push(`volApp/${volId}`);
    },
  },
};
</script>

