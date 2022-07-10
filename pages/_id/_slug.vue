<template>
  <div class="postController">
    <StatsNav />

    <div class="wrapper" id="wrapper">
      <section class="list-home-categories">
        <h1>
          <NuxtLink to="/">Precast Forum</NuxtLink>
          <NuxtLink :to="`/category/${postCategory.id}`">
            {{ categoryTitle[0].toUpperCase() + categoryTitle.substring(1) }}
          </NuxtLink>
        </h1>
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
            <div>{{ thisPost.title }}</div>
            <div class="post-time">
              - By
              <NuxtLink to="/profile"> {{ thisPost.username }} </NuxtLink> ({{
                this.$store.state.totalSinglePageViews
              }}
              views) @
              {{ $moment(thisPost.created_at).format("LLLL") }}
            </div>
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
                <NuxtLink to="/profile">{{ thisPost.username }}</NuxtLink></a
              >
            </div>
          </div>
          <PostModal />
          <AddComment v-if="this.$auth.loggedIn" :thisPost="thisPost" />

          <DisplayComment :postTitle="thisPost.title" :id="thisRouteId" />
        </div>
      </main>
      <section class="pagination">
        <a-pagination
          :current="current"
          :total="totalPage"
          :pageSize="20"
          @change="changePage"
        />
      </section>
      <RandomPost />
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
import RandomPost from "~/components/PostComponent/RandomPost.vue";
import PostModal from "~/components/PostComponent/PostModal.vue";

export default {
  components: {
    StatsNav,
    ShowAds,
    AddComment,
    DisplayComment,
    ListCategory,
    RandomPost,
    PostModal,
  },
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
      current: 1,
      postId: this.$route.params.id,
      comments: [],
      postCategory: {
        id: "",
        title: " ",
      },
    };
  },
  computed: {
    thisPost() {
      return this.$store.state.post;
    },
    totalPage() {
      return this.$store.state.totalPostPage;
    },
    thisRouteId() {
      return this.$route.params.id;
    },
    categoryTitle() {
      return this.postCategory.title;
    },
  },
  methods: {
    async changePage(pageNumber) {
      this.current = pageNumber;

      pageNumber = pageNumber - 1;

      this.$store.dispatch("getCommentByPage", {
        id: this.thisRouteId,
        page: pageNumber,
      });
      // SEND FOR THIS PAGE NUMBER,
    },
    closeModal() {
      this.showModal = false;
    },
    filterCategoryTitle() {
      this.$store.state.categories.forEach((element) => {
        if (element.id === Number(this.thisPost.category_id)) {
          this.postCategory = element;
        }
      });
    },
  },

  mounted() {
    this.$store.dispatch("getPost", this.postId);
    this.$store.dispatch("removePostForm");

    this.filterCategoryTitle();
  },
};
</script>

<style></style>
