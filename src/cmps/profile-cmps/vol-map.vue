<template>
  <GmapMap
    :center="setLocation"
    :zoom="10"
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
    <GmapMarker :position="setLocation" :clickable="false" :draggable="true" />
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
      console.log(
        this.vol.title,
        "lat: ",
        this.vol.loc.lat,
        "lng: ",
        this.vol.loc.lng
      );
      return { lat: this.vol.loc.lat, lng: this.vol.loc.lng };
    },
    clickMarker() {
      console.log(this.vol.title, "at", this.vol.loc.lat, this.vol.loc.lng);
    },
  },
};
</script>

