<template>
  <section class="vol-details">
    <header class="details-header">
      <h2>{{ vol.title }}</h2>
      <h4>Opportunity offered by "{{ vol.org.name }}"</h4>
      <p v-if="vol.loc">
        Located at {{ vol.loc.city }}, {{ vol.loc.country }} Onsite:{{
          vol.loc.isOnsite
        }}
      </p>
      <h4 v-for="tag in vol.tags" :key="tag">
        Tags: <span class="details-tag">{{ tag }}</span>
      </h4>
    </header>
    <img class="details-img" :src="vol.imgUrls" alt="VolIMG" />
    <div class="more-details">
      <h3>More Details</h3>
      <h4>{{ vol.desc }}</h4>
      <p>
        Required Skills:
        <span v-for="skill in vol.reqSkills" :key="skill"> {{ skill }} |</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    vol: {
      type: Object,
    },
  },

  methods: {},
};
</script>

// $(function() { // $( "#button" ).click(function() { // $( "#button"
).addClass( "onclic", 250, validate); // }); // function validate() { //
setTimeout(function() { // $( "#button" ).removeClass( "onclic" ); // $(
"#button" ).addClass( "validate", 450, callback ); // }, 2250 ); // } //
function callback() { // setTimeout(function() { // $( "#button" ).removeClass(
"validate" ); // }, 1250 ); // } // });
