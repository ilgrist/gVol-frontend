<template>
  <section class="explore-list">
    <vol-prev v-for="vol,idx in vols" :key="idx" :vol="vol"></vol-prev>
  </section>
</template>

<script>
import volPrev from "./vol-preview.vue"

export default {
  props:{
    vols: Array
  },
 components: {
    volPrev
  },
};
</script>
