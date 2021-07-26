 <template>
  <section class="map-layout">
    <div class="placeholder-map" v-if="!location.lat"></div>
    <GmapMap
      v-if="location.lat"
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
        :draggable="false"
        :title="volLoc.title"
        @click="goToProfile(volLoc.id)"
      />
    </GmapMap>
  </section>
</template>
 
 <script>
export default {
  /* ~ Method from homepage-map component, which dynamically renders all existing vols in the database ~  */

  methods: {
    goToProfile(volId) {
      this.$router.push(`/volApp/${volId}`);
    },
  },
  computed: {
    volsLocs() {
      let vols = JSON.parse(JSON.stringify(this.$store.getters.volsToShow));
      let volsLocs = vols
        .filter((vol) => vol.loc.lat && vol.loc.lng)
        .map((vol) => {
          return Object.assign({ id: vol._id, title: vol.title }, vol.loc);
        });
      return volsLocs;
    },
  },

  /* ~ Method from add-edit-vol component, which dynamically locates and stores the coordinates of 
  a new vol, added by a user ~  */

  methods: {
    async setLatLng() {
      let locationString = this.vol.loc.country + " " + this.vol.loc.city;
      locationString = locationString.replace(" ", "+");
      const URL = `
    https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${API_GEO_KEY}`;

      try {
        let newLoc = await axios.get(URL);
        this.vol.loc.lat = newLoc.data.results[0].geometry.location.lat;
        this.vol.loc.lng = newLoc.data.results[0].geometry.location.lng;
      } catch (err) {
        console.log("error is", err);
        throw err;
      }
    },
  },
};
</script>
 
 
