<template>
  <div class="card-preview short card">
    <h2>{{ title }}</h2>
    <p>
      <span>{{ vol.loc.city }},</span><span>{{ vol.loc.country }}</span>
    </p>
    <img :src="vol.imgUrls[0]" />
    <p class="rev-com">
      <img
        src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365333/volApp/icons/star_black_24dp_jgdioo.svg"
      />
      <span>4.5</span>
      <img
        src="https://res.cloudinary.com/dzuqvua7k/image/upload/v1626365582/volApp/icons/mode_black_24dp_iqmj5f.svg"
      />
      <span>Reviews</span>
    </p>
    <hr />
    <p>{{ vol.desc }}</p>
    <hr />
    <article class="skills">
      Skills:
      <p v-for="(skill, idx) in vol.reqSkills" :key="idx">
        <span class="skill-span">{{ skill }}</span>
      </p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    vol: Object,
  },
  computed: {
    title() {
      let title = this.vol.title;
      if (title.length > 15) return title.substring(0, 10) + "...";
      return title;
    },
  },
};
</script>