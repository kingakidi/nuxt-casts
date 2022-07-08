<template>
  <div class="single-comment">
    <p class="commenter">
      <a href="">
        {{ postTitle }} By {{ comment.username }} - @
        {{ $moment(comment.created_at).format("LLLL") }}</a
      >
    </p>

    <p class="comment-text" v-html="comment.comment"></p>
    <div class="comments-reaction-icons">
      <div class="comment-likes-counts">
        <!-- <button class="btn-reactions">
          <span class="material-icons show-likes-color"> favorite </span>
        </button>
        <span>1k</span> -->
      </div>
      <div v-if="this.$auth.loggedIn">
        <a-space
          v-if="
            this.$auth.user.user_level === 'super admin' ||
            this.$auth.user.user_level === 'admin'
          "
        >
          <a-button type="primary">Edit</a-button>
          <a-button type="danger">Delete</a-button>
          <a-button type="danger">Disabled</a-button>
          <a-button type="danger"> Suspend User </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment", "postTitle"],
};
</script>

<style></style>
