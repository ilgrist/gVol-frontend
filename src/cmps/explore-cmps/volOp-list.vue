<template>
  <section class="explore-list">
    <volOp-prev v-for="num in 10" :key="num"></volOp-prev>
  </section>
</template>

<script>
import volOpPrev from "./volOp-preview.vue"

export default {
 components: {
    volOpPrev
  },
}
</script>
