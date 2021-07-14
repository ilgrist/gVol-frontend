<template>
  <section class="explore-list">
    <vol-prev v-for="num in 10" :key="num"></vol-prev>
  </section>
</template>

<script>
import volPrev from "./vol-preview.vue";

export default {
  components: {
    volPrev,
  },
};
</script>
