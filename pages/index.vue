<template>
  <div class="controller">
    <!-- stats navs  -->
    <StatsNav />

    <div class="wrapper" id="wrapper">
      <div class="precast-title">
        <h1><NuxtLink to="/">Precast Forum</NuxtLink></h1>
      </div>

      <ListCategory />

      <ShowAds />
      <main class="list-casts">
        <h1>
          Latest News Updates ({{ this.$store.state.totalHomePageViews }} views)
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
          :pageSize="20"
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
  head() {
    return {
      title: "Precast Naija",

      meta: [
        {
          hid: "#1",
          name: "Precast Naija",
          description: "Your #1 Information center",
          content:
            "Precast Naija is a platform for all kind of information, from Breaking News, Recent Happening, ICT, Sport, Hangout and many more, signup on the platform and let your voice be heard",
        },
      ],
    };
  },

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
    };
  },

  computed: {
    totalPage() {
      return this.$store.state.totalPage;
    },
    posts() {
      return this.$store.state.posts;
    },

    setPostForm() {
      return this.$store.state.setPostForm;
    },
  },
  methods: {
    async changePage(pageNumber) {
      this.current = pageNumber;

      pageNumber = pageNumber - 1;

      this.$store.dispatch("getPostsByPage", pageNumber);
      // SEND FOR THIS PAGE NUMBER,
    },
    async loggin() {
      let response = await this.$auth
        .loginWith("laravelSanctum", {
          data: { username: "king", password: "1111" },
        })
        .then((res) => {
          if (res.data.error !== undefined) {
            // this.modalFormError = res.data.error;
          } else if (res.data.success !== undefined) {
            // this.modalFormError = res.data.success;

            this.password = "";
          } else if (res.data.data !== undefined) {
            this.$auth.setUser(this.$auth.user);
          }
        });
    },
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("removePostForm");
    this.$store.dispatch("setLoginForm", false);
    this.$store.dispatch("setRegisterForm", false);
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
