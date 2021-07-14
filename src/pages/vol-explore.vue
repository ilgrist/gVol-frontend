<template>
  <div class="explore-page">
    <label for="online"
      >Online
      <input id="online" type="checkbox" />
    </label>
    <label for="onsite"
      >On-site
      <input id="onsite" type="checkbox" />
    </label>
    <vol-filter />
    <vol-list />
  </div>
</template>

<script>
import volList from "../cmps/explore-cmps/vol-list.vue";
import volFilter from "../cmps/explore-cmps/vol-filter.vue";
export default {
  name: "Home",
  components: {
    volList,
    volFilter,
  },
};
</script>
