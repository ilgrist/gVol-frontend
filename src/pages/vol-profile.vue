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
          @sendReview="sendReview"
          :vol="vol"
          @openModal="openModal"
          @closeModal="closeModal"
          @removeReview="removeReview"
        />
        <volSideBar :vol="vol" />
      </div>
    </div>
    <add-edit-vol v-if="isEditing" @closeModal="closeModal" @remove="remove" />
  </section>
</template>

<script>
import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/profile-cmps/vol-details.vue";
// import { volService } from "@/services/vol.service.js";
import { showMsg } from "@/services/event-bus.service.js";
import addEditVol from "@/cmps/add-edit-vol.vue";
import { utilService } from "@/services/util.service.js";

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
    async removeReview(revIdx) {
      try {
        await this.$store.dispatch({ type: "removeReview", revIdx });
        this.msg = "Review Deleted!";
        showMsg(this.msg, "success");
      } catch {
        this.msg = "Cannot remove review, Try again later...";
        showMsg(this.msg, "danger");
      }
      this.msg = "";
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
      this.$store.commit({ type: "setCurrVol", vol });
      this.isEditing = !this.isEditing;
    },
    closeModal() {
      this.vol = this.$store.getters.currVol;
      this.isEditing = false;
    },

    async sendReview(newReview) {
      this.isNewReview = false;
      newReview.volId = this.vol._id;
      const reviewToSave = {
        id: utilService.makeId(),
        txt: newReview.txt,
        createdBy: newReview.createdBy,
        createdAt: Date.now(),
        rating: newReview.rating,
      };

      try {
        await this.$store.dispatch({ type: "addReview", reviewToSave });
        this.msg = "Review added!";
        showMsg(this.msg, "success");
      } catch {
        this.msg = "Cannot add review, Try again later...";
        showMsg(this.msg, "danger");
      }
      this.msg = "";
    },
    async setVol() {
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
