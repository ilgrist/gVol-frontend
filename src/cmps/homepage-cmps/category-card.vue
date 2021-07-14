<template>
  <div class="homepage-grid-card">
    <img src="url" />
    <p>{{ locName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    locName: String,
  },
};
</script>