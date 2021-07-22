<template>
  <GmapMap :center="{ lat: 10, lng: 10 }" :zoom="7" map-type-id="terrain">
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="england"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    />
  </GmapMap>
</template>

<script>
export default {};
</script>

