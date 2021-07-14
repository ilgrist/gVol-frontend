<template>
  <section class="short-list">
    <div class="short-header">
      <h1>Popular:</h1>
      <p>See all</p>
    </div>
    <section class="cards-cont">
      <div v-for="num in 4" :key="num" class="card-preview">
        <h2>Save the Elephants</h2>
        <p><span>Nairoby,</span><span>Kenya</span></p>
        <img src="@/assets/img/generic-vol-img.png" />
        <p class="rev-com">⭐ <span>4.5</span> 💬 <span>Reviews</span></p>
        <hr>
        <p>
          lorem ipsum dolor sit amet lorem, consectet lorem ipsum lorem ipsum
        </p>
        <hr>
        <p>Skills: <span>Teaching,</span> <span>Web-Design</span></p>
      </div>
    </section>
  </section>
</template>

<script>
export default {};
</script>
