<template>
  <section class="chat-cont">
    <h4>Chat about {{ vol.title }}</h4>
    <!-- <button @click="toggleChat">></button> -->
    <ul class="chat-msg-list" v-if="msgs.length">
      <li class="chat-msg" v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span> {{ msg.txt }}
      </li>
    </ul>
    <p class="chat-isTyping" v-if="isTyping">{{ isTyping }} is typing...</p>
    <form @submit.prevent="sendMsg">
      <input
        type="text"
        v-model="txt"
        placeholder="Type your msg"
        @input="showTyping"
      />
      <button class="chat-send-btn">Send</button>
    </form>
  </section>
</template>

<script>
import { socketService } from "../../services/socket.service.js";
export default {
  props: {
    vol: {
      type: Object,
    },
  },
  data() {
    return {
      txt: "",
      msgs: [],
      topic: this.vol._id,
      isTyping: false,
      isChatOpen: false,
    };
  },
  methods: {
    sendMsg() {
      const msg = {
        from: this.username,
        txt: this.txt,
      };
      socketService.emit("chat newMsg", msg);
      this.txt = "";
      this.isTyping = false;
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    showTyping() {
      socketService.emit("isTyping", this.username);
    },
    setTyping() {
      this.isTyping = this.username;
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
  },
  computed: {
    username() {
      const user = this.$store.getters.loggedinUser;
      return user ? this.user.fullname : "Guest";
    },
  },
  created() {
    if (this.vol.msgs?.length)
      this.msgs = JSON.parse(JSON.stringify(this.vol.msgs));
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("getTyping", this.setTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.off("getTyping", this.setTyping);
  },
};
</script>