<template>
  <div class="random-list-container">
    <NuxtLink
      v-for="post in randomPosts"
      :key="post.id"
      :to="`/${post.id}/${post.slug}`"
    >
      {{ post.title }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "RandomPost",
  data() {
    return {
      randomPosts: [],
    };
  },
  computed: {},
  methods: {
    async getFivePostsByPostId() {
      this.$axios.get("/related_post?post_id=15").then((res) => {
        this.randomPosts = res.data;
      });
    },
  },
  mounted() {
    this.getFivePostsByPostId();
  },
};
</script>

<style></style>
