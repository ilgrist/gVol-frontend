<template>
  <section class="chat-cont">
    <h4 class="chat-title" @click="toggleChat">
      Chat about {{ vol.title }}
      <img
        :title="arrowTitle"
        :src="toggleChatImgSrc"
        alt=""
        class="toggleChatImg"
      />
    </h4>
    <div class="chat-inner-cont" :class="{ hidden: !isChatOpen }">
      <ul class="chat-msg-list" v-if="msgs.length" ref="msgList">
        <li class="chat-msg" v-for="(msg, idx) in msgs" :key="idx">
          <span>{{ msg.from }}</span
          >: {{ msg.txt }}
        </li>
      </ul>
      <p class="emptyState" v-else>Start messaging...</p>
      <p class="chat-isTyping" v-if="isTyping">{{ isTyping }} is typing...</p>
      <form @submit.prevent="sendMsg">
        <input
          ref="input"
          type="text"
          v-model="txt"
          placeholder="Type your msg"
          @input="showTyping"
        />
        <button class="chat-send-btn">Send</button>
      </form>
    </div>
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
      isChatOpen: true,
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
      this.scrollToBottom();
      this.isTyping = false;
    },
    showTyping() {
      socketService.emit("isTyping", this.username);
    },
    setTyping(typerName) {
      this.isTyping = typerName;
    },
    stoppedTyping() {
      this.isTyping = false;
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) this.$refs.input.focus();
    },
    scrollToBottom() {
      const el = this.$refs.msgList;
      // el.scrollIntoView(false);
      el.scrollTop = el.scrollHeight;
    },
  },
  computed: {
    username() {
      const user = this.$store.getters.loggedinUser;
      return user ? user.fullname : "Guest";
    },
    toggleChatImgSrc() {
      if (this.isChatOpen)
        return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626603292/volApp/icons/less_nafgg8.svg";
      return "https://res.cloudinary.com/dzuqvua7k/image/upload/v1626603292/volApp/icons/more_rurxqi.svg";
    },
    arrowTitle() {
      if (this.isChatOpen) return "Close chat";
      return "Open chat";
    },
  },
  watch: {
    txt: function () {
      if (!this.txt.length) {
        socketService.emit("stoppedTyping");
      }
    },
  },
  created() {
    if (this.vol.msgs?.length)
      this.msgs = JSON.parse(JSON.stringify(this.vol.msgs));
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("getTyping", this.setTyping);
    socketService.on("stoppedTyping", this.stoppedTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.off("getTyping", this.setTyping);
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>