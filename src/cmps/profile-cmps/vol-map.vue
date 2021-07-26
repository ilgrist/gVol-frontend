<template>
  <GmapMap
    :center="setLocation"
    :zoom="14"
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
    <GmapMarker
      :position="setLocation"
      :clickable="false"
      :draggable="true"
      icon="/img/icons/marker3.png"
    />
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
    clickMarker() {
      console.log(this.vol.title, "at", this.vol.loc.lat, this.vol.loc.lng);
    },
  },
};
</script>

