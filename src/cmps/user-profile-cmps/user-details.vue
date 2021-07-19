<template>
  <section class="user-details">
    <header class="details-header">
      <div class="user-profile-img-cont">
        <img :src="require('../../assets/img/userImg/' + user.imgUrl)" />
      </div>
      <h2>Name:{{ user.fullname }}</h2>
      <p>
        <span class="details-tag" v-for="skill in user.skills" :key="skill">
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

