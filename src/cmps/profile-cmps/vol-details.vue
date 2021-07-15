<template>
  <section class="vol-details">
    <div class="cont-details">
      <header class="details-header">
        <h2>{{ vol.title }}</h2>
        <h4>Opportunity offered by "{{ vol.org.name }}"</h4>
        <p v-if="vol.loc">
          Located at {{ vol.loc.city }}, {{ vol.loc.country }} Onsite:{{
            vol.loc.isOnsite
          }}
        </p>
        <h4 v-for="tag in vol.tags" :key="tag">
          Tags: <span>{{ tag }}</span>
        </h4>
      </header>
      <img class="details-img" :src="vol.imgUrls" alt="VolIMG" />
      <div class="more-details">
        <h3>More Details</h3>
        <h4>{{ vol.desc }}</h4>
        <p>
          Required Skills:
          <span v-for="skill in vol.reqSkills" :key="skill">
            {{ skill }} |</span
          >
        </p>
      </div>
      <div class="details-reviews">
        <h3>Reviews</h3>
        <button>Add review</button>
        <ul v-for="review in vol.reviews" :key="review._id">
          <li>{{ review.createdBy }}: {{ review.txt }}</li>
        </ul>
      </div>
    </div>
    <div class="details-sidebar">
      SideBar Placeholder
      <div class="btn-container">
        <button class="details-btn"></button>
      </div>
      <div class="sidebar-users">
        <p v-for="member in vol.members" :key="member">
          {{ member }}
        </p>
      </div>
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
