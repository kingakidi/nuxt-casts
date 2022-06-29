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
  props: ["id"],
  computed: {
    postComments() {
      return this.$store.state.totalPostPage;
    },
    comments() {
      return this.$store.state.current_post_comment;
    },
  },
  mounted() {
    // CALL THE GET COMMENT ACTION
    this.$store.dispatch("getCommentByPostId", this.id);
    console.log(this.allComments);
  },
};
</script>

<style></style>
