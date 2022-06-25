<template>
  <div class="controller">
    <!-- stats navs  -->
    <StatsNav />

    <div class="wrapper" id="wrapper">
      <header>
        <h1><NuxtLink to="/">Precast Forum</NuxtLink></h1>
      </header>

      <ListCategory />

      <ShowAds />
      <main class="list-casts">
        <h1>Latest News Updates</h1>
        <HomeHeader />
        <div class="cast-group">
          <Cast v-for="post in posts" :key="post.id" :thisPost="post" />
        </div>
      </main>
      <section class="pagination"></section>
      <ShowAds />
      <footer class="random-posts">
        <div class="disclaimer">
          Disclaimer: Every caster is responsible for anything they post on
          precast
        </div>
        <a href="">CLICK HERE TO PLACE YOUR ADVERT</a>
      </footer>
    </div>
  </div>
</template>

<script>
import StatsNav from "~/components/Views/StatsNav.vue";
import ShowAds from "~/components/Views/ShowAds.vue";
import AddComment from "~/components/CommentComponent/AddComent.vue";
import DisplayComment from "~/components/CommentComponent/DisplayComment.vue";
import ListCategory from "~/components/CategoryComponent/ListCategory.vue";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  components: { StatsNav, ShowAds, AddComment, DisplayComment, ListCategory },
  data() {
    return {};
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getCategories");
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cast-input {
  display: block;
  font-size: 16px;
  padding: 10px;
}
</style>
