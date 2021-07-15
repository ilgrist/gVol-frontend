<template>
  <div class="homepage-grid-card">
    <img :src="require('../../assets/img/grid-imgs/' + category.url)" />
    <p>{{ category.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  computed: {
    img() {
      return "/grid1.jpg";
    },
  },
};
</script>