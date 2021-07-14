<template>
  <div id="app">
    <main-header />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import mainHeader from "@/cmps/main-layout-cmps/main-header.vue";
import mainFooter from "@/cmps/main-layout-cmps/main-footer.vue";

export default {
  components: {
    mainHeader,
    mainFooter,
  },
};
</script>
