<template>
  <div>
    <div class="main-header">
      <h2><a href="">Trending Right Now</a></h2>
      <div class="main-header-group">
        <a href="" @click.prevent="setPostForm">Create Post </a>
        <div class="line"></div>
        <a href="">My Posts</a>
        <div class="line"></div>
        <a href="">All Posts</a>
        <div class="line"></div>
        <a href="" @click.prevent="setRegisterForm">Create Account</a>
        <div class="line"></div>
        <a href="" @click.prevent="setLoginForm">Login</a>
        <div class="line"></div>
        <nuxt-link to="/castUser">Users</nuxt-link>
        <div class="line"></div>
        <a href="">logout</a>
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
  },
};
</script>

<style></style>
