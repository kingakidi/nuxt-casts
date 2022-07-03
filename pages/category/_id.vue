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
        <h1>
          Latest News Updates /
          <NuxtLink :to="`/category/${thisCategory.id}`">
            {{
              thisCategory.title[0].toUpperCase() +
              thisCategory.title.substring(1)
            }}
          </NuxtLink>
          ({{ this.$store.state.totalCategoryPageView }}
          views)
        </h1>
        <HomeHeader />
        <div class="cast-group">
          <Cast v-for="post in posts" :key="post.id" :thisPost="post" />
        </div>
      </main>
      <section class="pagination">
        <a-pagination
          :current="current"
          :total="totalPage"
          @change="changePage"
        />
      </section>
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
  components: {
    StatsNav,
    ShowAds,
    AddComment,
    DisplayComment,
    ListCategory,
  },
  data() {
    return {
      current: 1,
      thisCategory: {
        id: "",
        title: " ",
      },
    };
  },

  computed: {
    totalPage() {
      return this.$store.state.totalCategoryPage;
    },
    posts() {
      return this.$store.state.categoryPosts;
    },

    setPostForm() {
      return this.$store.state.setPostForm;
    },
    categoryTitle() {
      return this.thisCategory.title;
    },
  },
  methods: {
    async changePage(pageNumber) {
      this.current = pageNumber;

      pageNumber = pageNumber - 1;

      this.$store.dispatch("getCategoryByPage", {
        id: this.$route.params.id,
        pageNumber: pageNumber,
      });
      // SEND FOR THIS PAGE NUMBER,
    },
    filterCategoryTitle() {
      this.$store.state.categories.forEach((element) => {
        if (element.id === Number(this.$route.params.id)) {
          this.thisCategory = element;
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("removePostForm");
    this.$store.dispatch("setLoginForm", false);
    this.$store.dispatch("setRegisterForm", false);
    this.$store.dispatch("getCategoryPosts", this.$route.params.id);
    this.filterCategoryTitle();
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
