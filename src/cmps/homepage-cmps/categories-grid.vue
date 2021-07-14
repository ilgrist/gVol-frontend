<template>
  <section class="homepage-grid">
    <!-- <div v-for="img in imgs"></div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        { loc: "Korea", link: "@/assets/img/grid-imgs/grid1.jpg" },
        { loc: "Africa", link: "@/assets/img/grid-imgs/grid2.jpg" },
        { loc: "Europe", link: "@/assets/img/grid-imgs/grid3.jpg" },
      ],
    };
  },
};
</script>