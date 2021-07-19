<template>
  <section class="addEdit-modal">
    <form class="addEdit-form">
      <header>
        <h3>{{ title }} a Vol</h3>
        <span class="closeModal" @click="closeModal">Close</span>
      </header>
      <section class="main-form">
        <label class="vol-title">
          Title:
          <input placeholder="Enter Title" v-model="vol.title" type="text" />
        </label>

        <label> Description: </label>
        <textarea
          v-model="vol.desc"
          name="vol-desc"
          cols="15"
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

          <div v-if="vol.loc.isOnsite" class="loc-input-cont">
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
      </section>
      <div class="btns-container">
        <button @click="saveVol" class="edit-btn submit">
          {{ title }} Vol
        </button>
        <button
          @click.stop.prevent="removeVol(vol._id)"
          class="edit-btn delete"
          v-if="isEdit"
        >
          Delete Vol
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { showMsg } from "@/services/event-bus.service.js";
import { volService } from "@/services/vol.service.js";

export default {
  data() {
    return {
      title: "",
      msg: "",
      vol: null,
      isEdit: false,

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

  created() {
    if (this.$store.getters.volToUpdate) {
      this.isEdit = true;
      this.vol = JSON.parse(JSON.stringify(this.$store.getters.volToUpdate));
      this.title = "Update ";
    } else {
      this.isEdit = false;
      this.vol = volService.getEmptyVol();
      this.title = "Add a New";
    }
  },

  methods: {
    removeVol(volId) {
      console.log("sanity cmp", volId);
      this.$emit("remove", volId);
    },
    closeModal() {
      this.$emit("closeModal");
      this.vol = null;
      // this.$store.commit({ type: "setVolToUpdate", vol: null });
    },

    async saveVol() {
      try {
        this.$store.dispatch({ type: "saveVol", vol: this.vol });
        if (this.isEdit) this.msg = "Vol Updated!";
        else this.msg = "new Vol added!";
        showMsg(this.msg, "success");
        if (this.isEdit) this.closeModal();
        else this.$router.push(`/volApp`);
      } catch (err) {
        this.msg = "Cannot save Vol";
        console.log("Cannot Save Vol", err);
        showMsg(this.msg, "danger");
        throw err;
      } finally {
        this.msg = "";
      }
    },
  },
};
</script>

