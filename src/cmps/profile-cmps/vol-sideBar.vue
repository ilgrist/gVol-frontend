<template>
  <div class="details-sidebar">
    SideBar
    <div class="btn-container">
      <button class="details-btn"></button>
    </div>
    <h4>Participating Members</h4>
    <div class="sidebar-users">
      <p class="users-avatar" v-for="member in vol.members" :key="member">
        {{ member }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vol: {
      type: Object,
    },
  },
};
</script>

