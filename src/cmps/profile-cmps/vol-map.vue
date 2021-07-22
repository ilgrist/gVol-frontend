<template>
  <GmapMap
    :center="setLocation"
    :zoom="7"
    map-type-id="terrain"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: false,
    }"
  >
    <!-- <GmapMarker
      :position="setLocation"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    /> -->
  </GmapMap>
</template>

<script>
export default {
  props: {
    vol: {
      type: Object,
    },
  },

  computed: {
    setLocation() {
      return { lat: this.vol.loc.lat, lng: this.vol.loc.lng };
    },
  },
};
</script>

