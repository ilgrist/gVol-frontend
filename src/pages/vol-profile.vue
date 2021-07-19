<template>
  <section class="vol-profile main-layout">
    <div class="displayProfile">
      <img
        class="loading-img"
        v-if="!vol"
        src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
        alt="loading"
      />
      <!-- <div v-if="vol" class="vol-det"> -->
      <div v-else class="vol-det">
        <volDetails
          @sendRev="sendReview"
          :vol="vol"
          @openModal="openModal"
          @closeModal="closeModal"
        />
        <volSideBar :vol="vol" @joinVol="joinVol" />
      </div>
    </div>
    <add-edit-vol v-if="isEditing" @closeModal="closeModal" @remove="remove" />
  </section>
</template>

<script>
import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/profile-cmps/vol-details.vue";
import { volService } from "@/services/vol.service.js";
import { showMsg } from "../services/event-bus.service.js";
import addEditVol from "@/cmps/add-edit-vol.vue";

export default {
  components: {
    volSideBar,
    volDetails,
    addEditVol,
  },
  data() {
    return {
      vol: null,
      isEditing: false,
    };
  },
  methods: {
    joinVol() {
      this.vol = this.$store.getters.volToUpdate;
    },

    async remove(volId) {
      try {
        await this.$store.dispatch({ type: "removeVol", volId });
        this.closeModal();
        this.msg = "Vol deleted Successfully!";
        showMsg(this.msg, "success");
        this.$router.push("/volApp");
      } catch (err) {
        this.msg = "Failed to delete Vol";
        showMsg(this.msg, "danger");
        console.log("cannot remove Vol", err);
        throw err;
      }
    },
    openModal() {
      const vol = this.vol;
      this.$store.commit({ type: "setVolToUpdate", vol });
      this.isEditing = !this.isEditing;
    },
    closeModal() {
      // await this.setVol();
      console.log("sanity");
      this.vol = this.$store.getters.volToUpdate;
      this.isEditing = false;
    },

    async sendReview(newReview) {
      console.log("send review", newReview);
      this.isNewReview = false;
      newReview.volId = this.vol._id;
      try {
        await this.$store.dispatch({ type: "addReview", newReview });
        this.msg = "Review added!";
        showMsg(this.msg, "success");
      } catch {
        this.msg = "Cannot add review, Try again later..";
        showMsg(this.msg, "danger");
      }
      this.msg = "";
    },
    async setVol() {
      console.log("sanity set");
      const { _id } = this.$route.params;
      if (_id)
        try {
          this.vol = await this.$store.dispatch({ type: "getVol", _id });
        } catch (err) {
          console.log("Vol not available", err);
          throw err;
        }
    },
  },
  async created() {
    this.setVol();
  },
};
</script>
