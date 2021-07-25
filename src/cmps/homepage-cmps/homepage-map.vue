<template>
  <section class="map-layout">
    <div class="placeholder-map" v-if="!location.lat"></div>
    <GmapMap
      v-if="location.lat"
      :center="setCenter"
      :zoom="2"
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
        :key="idx"
        v-for="(volLoc, idx) in volsLocs"
        :position="volLoc"
        :clickable="true"
        :draggable="true"
        @click="goToProfile(volLoc.id)"
        :title="volLoc.title"
      />
    </GmapMap>
  </section>
</template>

<script>
export default {
  props: {
    volsLocs: {
      type: Array,
    },
  },

  data() {
    return {
      location: { lat: 31.0461, lng: 34.8516 },
    };
  },
  methods: {
    goToProfile(volId) {
      // console.log("file: homepage-map.vue ~ line 47 ~ volId", volId);
      this.$router.push(`/volApp/${volId}`);
    },
  },
  computed: {
    setCenter() {
      return this.location;
    },
  },

  created() {
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   this.gettingLocation = false;
    //   this.location.lat = pos.coords.latitude;
    //   this.location.lng = pos.coords.longitude;
    //   this.setCenter;
    // });
    // this.location.lat = 31.0461;
    // this.location.lng = 34.8516;
  },
};
</script>

