  <!-- TODO: INCLUDE LOCATION -->
<template>
  <section class="addVol-page main-layout">
    <div class="form-container">
      <form class="addVol-form" action="addVol">
        <label for="volTitle"
          >Title: <input v-model="vol.title" type="text"
        /></label>
        <label for="volDesc"
          >Description: <input v-model="vol.desc" type="text"
        /></label>
        <label for="reqSkills">List Required Skills</label>
        <!-- TODO: amend to a multipule select -->
        <select v-model="vol.reqSkills" name="reqSkills">
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
        <!-- TODO: FIGURE OUT WHY WONT ACCEPT VOL.LOC.ISONSITE -->
        <select v-model="vol.isOnsite" name="location">
          <option value="false">Online</option>
          <option value="true">On-site</option>
        </select>
        <!-- TODO: FIGURE OUT WHY WONT ACCEPT VOL.org.name - we might have to include the entire vol structure -->

        <label for="volOrg"
          >Organization Name: <input v-model="vol.org" type="text"
        /></label>
        <label for="volTitle"
          >Upload Organization Photo: <input type="image"
        /></label>
        <label for="volTitle">Upload Vol Photos: <input type="image" /></label>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      vol: {},
    };
  },
};
</script>

