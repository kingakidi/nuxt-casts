<template>
  <div class="">
    <StatsNav />
    <div class="wrapper" id="wrapper">
      <section class="list-home-categories">
        <h1><NuxtLink to="/">Precast Forum</NuxtLink> / Category</h1>
        <!-- <ListCategory /> -->
      </section>

      <div class="main-header post-header">
        <!-- <h2><a href="">Trending Right Now</a></h2> -->
        <div class="main-header-group">
          <a href="" @click.prevent="setAllCategory">All Category</a>

          <div class="line"></div>
          <a href="" @click.prevent="setCreateCategory">Create Category</a>
        </div>
        <input
          type="search"
          name="search"
          id="seach"
          placeholder="Search Category"
        />
      </div>
      <div class="show-category">
        <AddCategory v-if="createCategory"> </AddCategory>

        <ListCategoryAdmin> </ListCategoryAdmin>
      </div>
    </div>
  </div>
</template>

<script>
import StatsNav from "~/components/Views/StatsNav.vue";

import CategoryHeader from "~/components/CategoryComponent/CategoryHeader.vue";
import AddCategory from "~/components/CategoryComponent/AddCategory.vue";
import ListCategoryAdmin from "~/components/CategoryComponent/ListCategoryAdmin.vue";
// import ListCategory from "~/components/CategoryComponent/ListCategory.vue";

export default {
  middleware: "auth",
  components: {
    StatsNav,
    CategoryHeader,
    AddCategory,
    ListCategoryAdmin,
  },
  data() {
    return {
      createCategory: false,
      allCategory: true,
    };
  },
  methods: {
    setCreateCategory() {
      this.createCategory = true;
      this.allCategory = false;
    },
    setAllCategory() {
      this.allCategory = true;
      this.createCategory = false;
    },
  },
  mounted() {
    // CHECK IF USER IS AN ADMIN
    if (
      !this.$auth.user.user_level === "admin" ||
      !this.$auth.user.user_level === "super admin"
    ) {
      this.$router.push("/");
    }
    this.$store.dispatch("getCategories");
  },
};
</script>

<style></style>
