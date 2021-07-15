<template>
  <div class="card" @click="cardClicked">
    <img :src="require('../../assets/img/grid-imgs/' + category.url)" />
    <p>{{ category.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  methods: {
    cardClicked() {
      this.$emit("cardClicked", this.category.name);
    },
  },
  computed: {
    img() {
      return "/grid1.jpg";
    },
  },
};
</script>