<template>
  <div class="explore-page">
     <label for="online">Online
          <input id="online" type="checkbox">
      </label>
      <label for="onsite">On-site
          <input id="onsite" type="checkbox">
      </label>
    <volOp-filter></volOp-filter>
    <volOp-list />
  </div>
</template>

<script>
import volOpList from "../cmps/explore-cmps/volOp-list.vue"
import volOpFilter from "../cmps/explore-cmps/volOp-filter.vue"
export default {
  name: "Home",
  components: {
    volOpList,
    volOpFilter
  },
};
</script>
