<template>
  <div v-if="alive" id="user-msg" :class="msgDesign">
    <button>X</button>
    <p>
      {{ msg.txt }}
      <router-link v-if="this.msg.volUrl" :to="this.msg.volUrl"
        >here</router-link
      >
    </p>
  </div>
</template>


<script>
import { eventBusService, SHOW_MSG } from "../services/event-bus.service.js";
import { socketService } from "../services/socket.service.js";

export default {
  created() {
    socketService.on("new vol", (vol) => {
      console.log("got vol", vol);
      this.msg = {
        txt: "New volunteering opportunity added. Find it",
        volUrl: `/volApp/${vol._id}`,
      };
      this.type = "success";
      var delay = 5000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
    eventBusService.$on(SHOW_MSG, (msg) => {
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
      type: null,
    };
  },
  computed: {
    msgDesign() {
      return {
        danger: this.type === "danger",
        success: this.type === "success",
      };
      // return {'danger': 1 > 1, 'success': 2 > 1 };
    },
  },
};
</script>