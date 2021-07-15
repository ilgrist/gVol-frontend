<template>
  <div class="homepage-grid-card">
    <img src="../../assets/img/grid-imgs/grid1.jpg" />
    <p>{{ category.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
  },
};
</script>