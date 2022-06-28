<template>
  <div class="display-comment">
    <h5 class="comment-header">Comments</h5>
    <div v-for="comment in comments" :key="comment.id">
      <SingleComment :comment="comment" />
    </div>

    <!-- {{ comments }} -->
  </div>
</template>

<script>
import SingleComment from "~/components/CommentComponent/SingleComment.vue";

export default {
  components: { SingleComment },
  props: ["comments"],
};
</script>

<style></style>
