<template>
  <nav class="cast-nav">
    <span class="cast-home-stats"> Stats: 50,000 </span
    ><span class="cast-home-stats">Topics: 10,000 </span
    ><span class="cast-home-stats">Date: {{ $moment().format("LL") }} </span
    ><span class="cast-home-stats">Time: {{ $moment().format("LT") }}</span>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>