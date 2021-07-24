<template>
  <div v-if="alive" id="user-msg" :class="[msgDesign, { closing: isClosing }]">
    <button @click="closeMsg">✖</button>
    <p ref="msg">
      {{ msg.txt }}
      <router-link v-if="this.msg.user" :to="`/user/${this.msg.user._id}`"
        >{{ this.msg.user.fullname }}
      </router-link>
      <span v-if="this.msg.user"> in </span>
      <router-link v-if="this.msg.vol" :to="`/volApp/${this.msg.vol._id}`">{{
        this.msg.vol.title
      }}</router-link>
    </p>
  </div>
</template>


<script>
import {
  eventBusService,
  SHOW_MSG,
  TOGGLE_MSG,
} from "../services/event-bus.service.js";
import { socketService } from "../services/socket.service.js";

export default {
  created() {
    socketService.on("got volunteer", ({ vol, user }) => {
      console.log("got volunteer");
      this.msg = {
        txt: "New volunteer:",
        vol,
        user,
      };
      this.type = "success";
      var delay = 5000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
    socketService.on("new vol", (vol) => {
      this.msg = {
        txt: "New volunteering opportunity added:",
        vol,
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
      let delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.isClosing = true;
      }, delay - 500);
      setTimeout(() => {
        this.alive = false;
        this.isClosing = false;
      }, delay);
    });
    eventBusService.$on(TOGGLE_MSG, (msg) => {
      this.msg = msg;
      this.type = msg.type;
      this.alive = !this.alive;
    });
  },
  data() {
    return {
      alive: false,
      isClosing: false,
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
    },
  },
  methods: {
    closeMsg() {
      this.isClosing = true;
      setTimeout(() => {
        this.alive = false;
        this.isClosing = false;
      }, 500);
    },
  },
};
</script>