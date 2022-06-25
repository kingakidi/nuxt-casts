<template>
  <div>
    <div class="single-cast">
      <div class="show-action-stats">
        <div class="show-visit">
          <button>
            <span class="material-icons"> visibility </span>
          </button>
          <span>1k</span>
        </div>
        <div class="show-comment">
          <button>
            <span class="material-icons"> forum </span>
          </button>
          <span>1.2k</span>
        </div>
        <div class="show-likes">
          <button>
            <span class="material-icons show-likes-color"> favorite </span>
          </button>
          <span>1.2k</span>
        </div>
      </div>
      <h2 class="cast-header-title">
        <NuxtLink :to="`/${thisPost.id}/${thisPost.slug}`">
          {{ thisPost.title }}
        </NuxtLink>
      </h2>
      <div class="time-ago">10 mins Ago</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["thisPost"],
  mounted() {},
};
</script>

<style></style>
