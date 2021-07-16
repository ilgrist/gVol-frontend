<template>
  <div id="app">
    <main-header />
    <user-msg />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import mainHeader from "@/cmps/main-layout-cmps/main-header.vue";
import mainFooter from "@/cmps/main-layout-cmps/main-footer.vue";
import userMsg from './cmps/user-msg.vue'


export default {
  components: {
    mainHeader,
    mainFooter,
    userMsg
  },
};
</script>
