<template>
  <div>
    <form class="add-comment create-comment-form">
      <label>Add Comment</label>
      <div class="ckeditor-edit">
        <client-only placeholder="loading...">
          <ckeditor-nuxt v-model="comment" :config="editorConfig" />
        </client-only>
      </div>
      <!-- <input
        type="text"
        class="cast-input"
        placeholder="Add comment"
        @keyup="commentKeyup"
        v-model="comment"
      /> -->
      <div v-if="loading">
        <a-spin />
      </div>
      <a-button
        type="submit"
        class="btn-comment-submit"
        id="btnAddComment"
        @click="addComment"
        v-else
      >
        Submit
      </a-button>
    </form>
    <div class="comment-status">{{ commentStatus }}</div>
  </div>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      editorConfig: {
        removePlugins: ["Title"],
        simpleUpload: {
          uploadUrl: "./static/images",
        },
      },
      commentHolder: "",
      comment: "",
      loading: false,
      commentStatus: "",
    };
  },
  methods: {
    commentKeyup() {
      this.commentStatus = "";
    },
    async addComment() {
      this.commentStatus = "";
      if (this.comment.trim().length > 0) {
        let btnComment = document.getElementById("btnAddComment");
        btnComment.disabled = true;
        this.commentStatus = "casting...";
        this.loading = true;
        let request = this.$axios
          .post(`/comment`, {
            post_id: this.$route.params.id,
            comment: this.comment,
          })
          .then((res) => {
            if (res.status === 201) {
              this.comment = "";
              this.$store.dispatch("getCommentByPostId", this.$route.params.id);
              this.commentStatus = "Comment Added Successfully";
            }
          })
          .finally(() => {
            btnComment.disabled = false;
            btnComment.innerHTML = "Submit";
            this.loading = false;
          });
      } else {
        this.commentStatus = "Comment is required";
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
