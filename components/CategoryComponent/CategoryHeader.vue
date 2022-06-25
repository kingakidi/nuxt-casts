<template>
  <div class="main-header post-header">
    <!-- <h2><a href="">Trending Right Now</a></h2> -->
    <div class="main-header-group">
      <a href="">All Category</a>

      <div class="line"></div>
      <a href="" @click="setCreateCategory">Create Category</a>
    </div>
    <input
      type="search"
      name="search"
      id="seach"
      placeholder="Search Category"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { createCategory: false };
  },
  methods: {
    setCreateCategory() {
      this.createCategory = true;
    },
  },
};
</script>

<style></style>
