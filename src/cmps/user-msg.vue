<template>
  <!-- <div v-if="alive" class="alert" :class="alertClass"> -->
  <div v-if="alive"  id="user-msg" :class="msgDesign">
    <button>X</button>
    <p>{{ msg.txt }}</p>
  </div>
</template>


<script>
import { eventBusService, SHOW_MSG } from "../services/event-bus.service.js";

export default {
  created() {
    eventBusService.$on(SHOW_MSG, (msg) => {
      // this.msgDesign(type)
      this.msg = msg;
      this.type = msg.type;
      var delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  data() {
    return {
      alive: false,
      msg: null,
      type: null
    };
  },
  computed: {
    msgDesign() {
      return {'danger': this.type === 'danger', 'success': this.type === 'success'};
      // return {'danger': 1 > 1, 'success': 2 > 1 };
    },
  },
};
</script>