<template>
  <section class="vol-profile main-layout">
    <div v-if="isEditing" class="dark-screen"></div>
    <img
      class="loading-img"
      v-if="!vol"
      src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626461956/volApp/icons/loading_dmwaqp.gif"
      alt="loading"
    />
    <div v-else class="vol-det">
      <header class="profile-header">
        <h2>
          {{ vol.title }}
          <button title="Edit Vol" v-if="isCreatedBy" @click="openModal">
            <img
              src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626876387/edit_note_black_24dp_zmb8jd.svg"
            />
          </button>
        </h2>
        <a href="#reviews" class="vol-stats">
          ⭐{{ avgRating }} ({{ vol.reviews.length }} Reviews)
        </a>
        <!-- <h4>Opportunity offered by "{{ vol.org.name }}"</h4> -->
        <p class="details-location" v-if="!vol.loc.city && !vol.loc.country">
          Online
        </p>
        <p v-else>
          <span class="details-location">
            {{ vol.loc.city }}, {{ vol.loc.country }}
          </span>
        </p>
        <p>
          <span class="details-tag" v-for="tag in vol.tags" :key="tag">
            {{ tag }}
          </span>
        </p>
      </header>
      <volDetails
        @sendReview="sendReview"
        :vol="vol"
        @openModal="openModal"
        @closeModal="closeModal"
        @removeReview="removeReview"
        @filterBy="goExplore"
      />
      <volSideBar :vol="vol" />
    </div>
    <!-- </div> -->
    <add-edit-vol
      v-if="isEditing"
      @closeModal="closeModal"
      @removeVol="removeVol"
    />
  </section>
</template>

<script>
import volSideBar from "@/cmps/profile-cmps/vol-sideBar.vue";
import volDetails from "@/cmps/profile-cmps/vol-details.vue";
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
      isCreatedBy: false,
    };
  },
  // computed: {
  //   vol() {
  //     return this.$store.getters.currVol;
  //   },
  // },
  methods: {
    goExplore(filterBy) {
      console.log("file: vol-profile.vue ~ line 84 ~ filterBy", filterBy);
      this.$store.commit({ type: "setFilter", filterBy });
      this.$router.push("/volApp");
    },
    async removeReview(revIdx) {
      try {
        await this.$store.dispatch({ type: "removeReview", revIdx });
        this.msg = "Review Deleted!";
        showMsg(this.msg, "success");
        // showMsg("Review Deleted!", "success");
      } catch {
        this.msg = "Cannot remove review, Try again later...";
        showMsg(this.msg, "danger");
      }
      this.msg = "";
    },

    async removeVol(volId) {
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
        imgUrl: newReview.imgUrl,
        userId: newReview.userId,
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
          // this.vol =
          this.$store.commit({ type: "setCurrVol", vol: this.vol });
        } catch (err) {
          console.log("Vol not available", err);
          throw err;
        }
    },

    checkCreator() {
      const creator = this.vol.createdBy;
      const loggeddinUser = this.$store.getters.loggedinUser;
      if (!creator || !loggeddinUser) return;
      if (loggeddinUser._id === creator) {
        this.isCreatedBy = true;
      }
    },
  },

  computed: {
    avgRating() {
      let ratingLength = 0;
      let ratingSum = this.vol.reviews.reduce((acc, review) => {
        if (!review.rating) return acc;
        ratingLength++;
        return acc + review.rating;
      }, 0);

      if (!ratingLength) return "None";
      this.volRatingStars = "⭐".repeat((ratingSum / ratingLength).toFixed(1));
      this.$emit("stars", this.volRatingStars);
      return (ratingSum / ratingLength).toFixed(2);
    },
    description() {
      return utilService.shortTxt(this.vol.desc, 200);
    },
  },
  async created() {
    this.setVol();
    socketService.on("got volunteer", ({ vol, user }) => {
      console.log("sanity from created, vol:", vol);
      this.$store.commit({ type: "setCurrVol", vol });
      this.setVol();
    });
  },
};
</script>
