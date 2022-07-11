<template>
  <div>
    <div class="main-header">
      <h2>
        <a href="">Trending Right Now</a>
      </h2>
      <div class="main-header-group" v-if="this.$auth.loggedIn">
        <a href="" @click.prevent="setPostForm">Create Post </a>
        <div class="line"></div>
        <div
          class="user-category-hack"
          v-if="
            this.$auth.user.user_level === 'admin' ||
            this.$auth.user.user_level === 'super admin'
          "
        >
          <nuxt-link to="/castUser"> Users </nuxt-link>
          <div class="line"></div>
          <nuxt-link to="/category"> Category </nuxt-link>
          <div class="line"></div>
        </div>

        <a href="">My Posts</a>

        <div class="line"></div>
        <a href="#" @click.prevent="logout">Logout</a>
        <span v-if="this.$auth.loggedIn">
          You are login as: ({{ this.$auth.user.username }})
        </span>
      </div>
      <div class="main-header-group" v-if="!this.$auth.loggedIn">
        <div class="line"></div>
        <a href="">All Posts</a>
        <div class="line"></div>

        <a href="" @click.prevent="setRegisterForm">Create Account</a>
        <div class="line"></div>
        <a href="" @click.prevent="setLoginForm">Login</a>
      </div>
      <input type="search" name="search" id="seach" placeholder="Search Post" />
    </div>

    <CreatePostForm v-if="showCreatePost" />
    <Login v-if="showLoginForm" />
    <Register v-if="showRegisterForm" />
  </div>
</template>

<script>
import CreatePostForm from "~/components/PostComponent/CreatePostForm.vue";
import Login from "~/components/Login.vue";
import Register from "~/components/Register.vue";

export default {
  components: { CreatePostForm, Login, Register },
  data() {
    return {};
  },
  computed: {
    showCreatePost() {
      return this.$store.state.setPostForm;
    },
    showLoginForm() {
      return this.$store.state.setLoginForm;
    },
    showRegisterForm() {
      return this.$store.state.setRegisterForm;
    },
  },
  methods: {
    setPostForm() {
      this.$store.dispatch("setRegisterForm", false);
      this.$store.dispatch("setPostForm", true);
      this.$store.dispatch("setLoginForm", false);
    },
    setRegisterForm() {
      this.$store.dispatch("setRegisterForm", true);
      this.$store.dispatch("setPostForm", false);
      this.$store.dispatch("setLoginForm", false);
    },
    setLoginForm() {
      this.$store.dispatch("setRegisterForm", false);
      this.$store.dispatch("setPostForm", false);
      this.$store.dispatch("setLoginForm", true);
    },
    async logout() {
      try {
        await this.$auth.logout().then((res) => {});
        this.$router.push("/");
      } catch (error) {
        console.log("This is error", error);
      }
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>

<style></style>
