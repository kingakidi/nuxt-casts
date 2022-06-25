<template>
  <div class="postController">
    <StatsNav />

    <div class="wrapper" id="wrapper">
      <section class="list-home-categories">
        <h1><NuxtLink to="/">Precast Forum</NuxtLink></h1>
        <ListCategory />
      </section>
      <ShowAds />
      <main class="list-casts">
        <h3 class="post-main-title">
          {{ thisPost.title }}
        </h3>
        <HomeHeader />
        <div class="display-post">
          <h4 class="post-title">
            {{ thisPost.title }} - By
            <NuxtLink to="/profile">{{ thisPost.post_user_id }}</NuxtLink>
          </h4>
          <div class="post-content" v-html="thisPost.content">
            <!-- {{ thisPost.content }} -->
          </div>
          <div class="display-reactions">
            <div class="reaction-icons">
              <div class="post-likes-counts">
                <button class="btn-reactions">
                  <span class="material-icons show-likes-color">
                    favorite
                  </span>
                </button>
                <span>1k</span>
              </div>
              <div class="post-comment-counts">
                <button class="btn-reactions">
                  <span class="material-icons"> forum </span>
                </button>
                <span>1.2k</span>
              </div>
              <div class="post-share-counts">
                <span class="material-icons"> share </span>
                <span>1.2k</span>
              </div>
            </div>
            <div class="post-by">
              <a href=""
                >Post By:
                <NuxtLink to="/profile">{{
                  thisPost.post_user_id
                }}</NuxtLink></a
              >
            </div>
          </div>
          <AddComment />
          <DisplayComment />
        </div>
      </main>
      <section class="pagination"></section>
      <ShowAds />
      <Footer />
    </div>
  </div>
</template>

<script>
import StatsNav from "~/components/Views/StatsNav.vue";
import ShowAds from "~/components/Views/ShowAds.vue";
import AddComment from "~/components/CommentComponent/AddComent.vue";
import DisplayComment from "~/components/CommentComponent/DisplayComment.vue";
import ListCategory from "~/components/CategoryComponent/ListCategory.vue";

export default {
  components: { StatsNav, ShowAds, AddComment, DisplayComment, ListCategory },
  head() {
    return {
      title: this.thisPost.title,
      meta: [
        {
          hid: this.postId,
          description: this.thisPost.title,
          content: this.thisPost.content,
        },
      ],
    };
  },
  data() {
    return {
      postId: this.$route.params.id,
    };
  },
  computed: {
    thisPost() {
      return this.$store.state.post;
    },
  },
  methods: {},

  mounted() {
    // console.log();
    this.$store.dispatch("getPost", this.postId);
    this.$store.dispatch("removePostForm");
  },
};
</script>

<style></style>
