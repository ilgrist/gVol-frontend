<template>
  <section class="vol-sidebar-container user-sidebar-container">
    <div class="sticky-sidebar-container">
      <div class="vol-details-sidebar">
        <section class="vol-sidebar-btn-container">
          <button
            @click="onExplore"
            class="volunteer-btn explore-btn"
            v-if="!isLoggedSameAsCurr"
          >
            Explore
          </button>
          <button
            @click="openModal"
            v-if="isLoggedSameAsCurr"
            class="volunteer-btn"
          >
            Add volunteering
          </button>
          <button
            @click="logout"
            v-if="isLoggedSameAsCurr"
            class="volunteer-btn explore-btn"
          >
            Logout
          </button>
          <div class="share-section">
            <ShareNetwork
              :popup="{ width: 500, height: 500 }"
              network="facebook"
              :url="url"
              :title="user.fullname"
              :description="userDesc"
              class="share-link"
            >
              <svg
                class="facebook"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  class="facebook"
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
                  fill="black"
                />
              </svg>
            </ShareNetwork>

            <ShareNetwork
              :popup="{ width: 500, height: 500 }"
              network="whatsapp"
              :url="url"
              :title="user.fullname"
              :description="userDesc"
            >
              <svg
                class="whataspp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  class="whataspp"
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                  fill="black"
                />
              </svg>
            </ShareNetwork>

            <ShareNetwork
              :popup="{ width: 500, height: 500 }"
              network="twitter"
              :url="url"
              :title="user.fullname"
              :description="userDesc"
            >
              <svg
                class="twitter"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  class="twitter"
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  fill="black"
                />
              </svg>
            </ShareNetwork>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from "../../services/event-bus.service.js";
export default {
  props: {
    user: {
      type: Object,
    },
    isLoggedSameAsCurr: {
      type: Boolean,
    },
  },
  data() {
    return {
      msg: "",
      loggedinUser: null,
      url: window.location.href,
    };
  },
  methods: {
    openModal() {
      this.$emit("openModal");
    },
    onExplore() {
      this.$router.push("/volApp");
    },
    onShare() {
      console.log("shared!");
      this.msg = "User profile shared !";
      showMsg(this.msg, "success");
      this.msg = "";
    },
    setUser() {
      this.loggedinUser = this.$store.getters.loggedinUser;
    },
    logout() {
      const username = this.loggedinUser.username
      this.$store.dispatch({ type: "logout" });
      this.msg = `Goodbye, - ${username} !`;
      showMsg(this.msg, "danger");
    },
  },
  computed: {
    userDesc() {
      return `${
        this.user.fullname.charAt(0).toUpperCase() + this.user.fullname.slice(1)
      } is good at ${this.user.skills.join(" , ")}`;
    },
  },
  created() {
    this.setUser();
  },
};
</script>

