<template>
  <div class="display-comment">
    <h5 class="comment-header">Comments</h5>
    <div>
      <div
        class="comments-holder"
        v-for="comment in comments"
        :key="comment.id"
      >
        <SingleComment :comment="comment" :postTitle="postTitle" />
      </div>
    </div>

    <!-- {{ comments }} -->
  </div>
</template>

<script>
import SingleComment from "~/components/CommentComponent/SingleComment.vue";

export default {
  components: { SingleComment },
  props: ["id", "postTitle"],
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
    console.log(this.$store.state.totalPostPage);
  },
};
</script>

<style></style>
