<template>
  <div class="add-comment">
    <input
      type="text"
      class="cast-input"
      placeholder="Add comment"
      v-model="comment"
    />
    <button type="submit" @click="addComment">
      <span class="material-icons"> send </span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    async addComment() {
      let request = this.$axios
        .post(`http://localhost:8000/api/comment`, {
          post_id: this.$route.params.id,
          comment: this.comment,
          user_id: 78,
        })
        .then((res) => {
          if (res.status === 201) {
            this.comment = "";
          }

          console.log(res);
        });
    },
  },
  mounted() {},
};
</script>

<style></style>
