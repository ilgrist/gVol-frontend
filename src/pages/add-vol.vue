<template>
  <section class="addVol-page main-layout">
    <div class="form-container">
      <h3>Add a Vol</h3>
      <form @submit.prevent="saveVol" class="addVol-form" action="addVol">
        <label class="vol-title">
          Title:
          <input placeholder="Enter Title" v-model="vol.title" type="text" />
        </label>

        <label> Description: </label>
        <textarea
          v-model="vol.desc"
          name="vol-desc"
          cols="8"
          rows="8"
          placeholder="Enter Vol Description"
        ></textarea>

        <label class="loc-label">
          Location of Vol:
          <div class="switch-button">
            <input
              v-model="vol.loc.isOnsite"
              class="switch-button-checkbox"
              type="checkbox"
            />
            <label class="switch-button-label">
              <span class="switch-button-label-span">Online</span></label
            >
          </div>

          <div v-if="vol.loc.isOnsite">
            <input
              placeholder="Enter City"
              v-model="vol.loc.city"
              type="text"
            />
            <input
              placeholder="Enter Country"
              v-model="vol.loc.country"
              type="text"
            />
          </div>
        </label>

        <label for="reqSkills">List Required Skills</label>

        <el-select
          v-model="vol.reqSkills"
          multiple
          placeholder="Select Required Skills"
        >
          <el-option
            v-for="skill in skills"
            :key="skill.value"
            :label="skill.label"
            :value="skill.value"
          >
          </el-option>
        </el-select>

        <label for="reqSkills">List Relevant Tags</label>
        <el-select
          v-model="vol.tags"
          multiple
          placeholder="Select Relevant Tags"
        >
          <el-option
            v-for="tag in tags"
            :key="tag.value"
            :label="tag.label"
            :value="tag.value"
          >
          </el-option>
        </el-select>

        <!-- <label for="volOrg"> Orgs </label> -->
        <!-- <select v-model="vol.org.name" name="org">
          <option value="org1">Org1</option>
          Org1
        </select> -->

        <button class="submit-btn">Submit New Vol</button>
      </form>
    </div>
  </section>
</template>

<script>
import { showMsg } from "@/services/event-bus.service.js";

export default {
  data() {
    return {
      msg: "",
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
      tags: [
        {
          value: "children",
          label: "Children",
        },
        {
          value: "animals",
          label: "Animals",
        },
        {
          value: "elderly",
          label: "Elderly",
        },
        {
          value: "music",
          label: "Music",
        },
        {
          value: "art",
          label: "Art",
        },
      ],
      skills: [
        {
          value: "dreaming",
          label: "Dreaming",
        },
        {
          value: "building",
          label: "Building",
        },
        {
          value: "translating",
          label: "Translating",
        },
        {
          value: "hugging",
          label: "Hugging",
        },
        {
          value: "saving",
          label: "Saving",
        },
      ],
    };
  },

  methods: {
    async saveVol() {
      try {
        await this.$store.dispatch({ type: "saveVol", vol: this.vol });
      } catch (err) {
        console.log("cannot save vol", err);
        throw err;
      } finally {
        //TBD - hack for now, intended to make sure that when redirects to volApp - new vol was added
        this.msg = "new Vol added !";
        showMsg(this.msg, "success");
        this.msg = "";
        // await this.$store.dispatch({ type: "loadVols" });
        this.$router.push("/volApp");
        // this.closeModal();
      }
    },
  },
};
</script>

