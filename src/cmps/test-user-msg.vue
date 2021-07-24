<template>
  <section>
    <button @click="success">Success</button>
    <button @click="danger">Danger</button>
    <button @click="toggle">Toggle</button>
  </section>
</template>

<script>
import { showMsg, testToggleMsg } from "../services/event-bus.service.js";
export default {
  methods: {
    success() {
      showMsg("testing a success msg", "success");
    },
    danger() {
      showMsg("testing a danger msg", "danger");
    },
    toggle() {
      testToggleMsg("toggle this msg like a mofo", "danger");
    },
  },
};
</script>