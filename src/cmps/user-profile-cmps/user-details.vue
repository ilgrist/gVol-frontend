<template>
  <section class="vol-details">
    <header class="details-header">
      <div class="user-profile-img-cont">
        <img :src="user.imgUrl" />
      </div>
      <h2>{{ user.fullname }}</h2>
      <p>
        Skills:
        <span class="details-tag" v-for="skill,idx in user.skills" :key="idx">
          {{ skill }}
        </span>
      </p>
    </header>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      displayOnline: "Online",
      isShort: true,
    };
  },
  methods: {
    toggleMore() {
      this.isShort = !this.isShort;
    },
  },
  computed: {},
};
</script>

