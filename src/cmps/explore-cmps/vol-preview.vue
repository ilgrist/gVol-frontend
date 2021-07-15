<template>
  <div @click="goToProfile(vol._id)" class="card-preview">
    <h2>{{ vol.title }}</h2>
    <p>
      <span>{{ vol.loc.city }},</span><span>{{ vol.loc.country }}</span>
    </p>
    <img src="@/assets/img/generic-vol-img.png" />
    <p class="rev-com">⭐ <span>4.5</span> 💬 <span>Reviews</span></p>
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

