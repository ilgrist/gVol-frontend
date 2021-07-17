<template>
  <section class="addVol-page main-layout">
    <div class="form-container">
      <form @submit.prevent="saveVol" class="addVol-form" action="addVol">
        <label for="volTitle"
          >Title:
          <input placeholder="Enter Title" v-model="vol.title" type="text"
        /></label>
        <label for="volDesc"
          >Description:
          <input placeholder="Describe Vol" v-model="vol.desc" type="text"
        /></label>
        <label for="reqSkills">List Required Skills</label>
        <!-- TODO: amend to a multipule select -->
        <select multipule v-model="vol.reqSkills" name="reqSkills">
          <option value="teaching">Teaching</option>
          <option value="dreaming">Dreaming</option>
          <option value="translating">Translating</option>
        </select>
        <label for="tags">List Tags</label>
        <select v-model="vol.tags" name="tags">
          <option value="children">Children</option>
          <option value="animals">Animals</option>
          <option value="Elderly">Elderly</option>
        </select>
        <label for="location">Location of Vol</label>
        <input placeholder="Enter City" v-model="vol.loc.city" type="text" />
        <input
          placeholder="Enter Country"
          v-model="vol.loc.country"
          type="text"
        />
        <select v-model="vol.loc.isOnsite" name="location">
          <option value="false">Online</option>
          <option value="true">On-site</option>
        </select>
        <label for="volOrg"> Orgs </label>
        <select v-model="vol.org.name" name="org">
          <option value="org1">Org1</option>
          Org1
        </select>

        <button>Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      vol: {
        imgUrls: [],
        loc: {
          lat: 12.12,
          lng: 11.11,
          city: "",
          country: "",
          isOnsite: false,
        },
        org: {
          name: "",
          imgUrl: "",
        },
        reqSkills: [],
        tags: [],
      },
    };
  },
  methods: {
    async saveVol() {
      // this.vol._id = "aaa123";
      // this.vol._id = "";
      try {
        await this.$store.dispatch({ type: "saveVol", vol: this.vol });
      } catch (err) {
        console.log("cannot save vol", err);
        throw err;
      }
      // finally {
      //   this.closeModal();
      // }
    },

    // closeModal() {
    //   this.$emit("closeModal");
    //   this.vol = null;
    //   this.$store.commit({ type: "setVolToUpdate", vol: null });
    // },
  },
};
</script>

