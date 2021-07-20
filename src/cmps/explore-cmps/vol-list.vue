<template>
  <section class="explore-list">
    <short-prev v-for="vol,idx in vols" :key="idx" :vol="vol"></short-prev>
  </section>
</template>

<script>
import shortPrev from "../homepage-cmps/short-vol-list-card.vue"

export default {
  props:{
    vols: Array
  },
 components: {
    shortPrev
  },
};
</script>
