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
          <input
            multiple
            placeholder="Enter Title"
            v-model="vol.title"
            type="text"
          />
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

        <label class="vol-imgs" for="img"
          >Upload Images (up to 5 Images):
          <img
            class="upload-img"
            src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626782582/volApp/icons/uploadImg_ysu2jj.svg"
          />
          <input
            click.stop.prevent
            id="img"
            type="file"
            @change.stop.prevent="handleFile"
          />
          <div v-if="this.vol.imgUrls.length" class="img-preview-gallery">
            <div
              class="img-container"
              v-for="(imgUrl, idx) in vol.imgUrls"
              :key="idx"
            >
              <img
                class="img-preview"
                :src="imgUrl"
                @click.stop.prevent="removeImg(idx)"
              />
              <img
                class="clear-img"
                src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626788807/volApp/icons/whiteClear_izkynd.svg"
                alt="removeImg"
                @click.stop.prevent="removeImg(idx)"
              />
            </div>
          </div>
        </label>
      </section>

      <div class="btns-container">
        <button @click.stop.prevent="saveVol" class="edit-btn submit">
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
import { uploadImg } from "@/services/img-upload.service.js";

export default {
  data() {
    return {
      title: "",
      msg: "",
      vol: null,
      isEdit: false,

      // TBD: ASK SHACHAR HOW TO DO THIS BETTER AND FROM DB?
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
    if (this.$store.getters.currVol) {
      this.isEdit = true;
      this.vol = JSON.parse(JSON.stringify(this.$store.getters.currVol));
      this.title = "Update ";
    } else {
      this.isEdit = false;
      this.vol = volService.getEmptyVol();
      this.title = "Add a New";
    }
  },

  methods: {
    removeImg(imgIdx) {
      console.log(
        "file: add-edit-vol.vue ~ line 209 ~ this.vol.imgUrls",
        this.vol.imgUrls
      );
      this.vol.imgUrls.splice(imgIdx, 1);
      console.log(
        "file: add-edit-vol.vue ~ line 208 ~  this.vol.imgUrls",
        this.vol.imgUrls
      );
    },

    async handleFile(ev) {
      if (this.vol.imgUrls.length > 4) {
        this.msg = "Not more than 5 Images";
        showMsg(this.msg, "danger");
        console.log("Not more than 5 Images");
        return;
      }
      const file = ev.target.files[0];
      const res = await uploadImg(ev);
      // console.log("res:", res);
      this.vol.imgUrls.push(res.url);
      console.log(this.vol);
    },

    removeVol(volId) {
      console.log("sanity cmp", volId);
      this.$emit("remove", volId);
    },
    closeModal() {
      this.$emit("closeModal");
      this.vol = null;
    },

    async saveVol() {
      try {
        console.log("onsite", this.vol.loc.isOnsite);
        if (this.vol.loc.isOnsite) this.vol.loc.isOnsite = false;
        console.log("onsite", this.vol.loc.isOnsite);

        await this.$store.dispatch({ type: "saveVol", vol: this.vol });

        if (this.isEdit) this.msg = "Vol Updated!";
        else this.msg = "new Vol added!";
        showMsg(this.msg, "success");

        if (this.isEdit) this.closeModal();
        else {
          this.vol = JSON.parse(JSON.stringify(this.$store.getters.currVol));
          const volId = this.vol._id;
          this.$router.push(`/volApp/${volId}`);
        }
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

