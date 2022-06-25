<template>
  <div class="">
    <StatsNav />
    <div class="wrapper" id="wrapper">
      <h1>Category - Precast</h1>

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
        <div class="cast-category-page">
          <div class="list-categories">
            <ul class="list-category-admin">
              <li>Username</li>
              <li>Fullname</li>
              <li>Email Address</li>
            </ul>
            <ul
              v-for="user in users"
              :key="user.id"
              class="list-category-admin"
            >
              <li>{{ user.username }}</li>
              <li>{{ user.name }}</li>
              <li>{{ user.email }}</li>

              <li>
                <select name="user-tools" id="1" class="user-tools">
                  <option value="" selected="" disabled>Select Action</option>
                  <option value="editProfile">Edit Profile</option>
                  <option value="role">Change Role</option>
                  <option value="toggleActivation">Toggle Activation</option>
                  <option value="assign">Assign</option>
                  <option value="chart">View Chart</option>
                  <option value="log">Logs</option>
                  <option value="changeEmail">Change Email</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsNav from "~/components/Views/StatsNav.vue";

import CategoryHeader from "~/components/CategoryComponent/CategoryHeader.vue";
import AddCategory from "~/components/CategoryComponent/AddCategory.vue";
import ListCategoryAdmin from "~/components/CategoryComponent/ListCategoryAdmin.vue";

export default {
  components: {
    StatsNav,
    CategoryHeader,
    AddCategory,
    ListCategoryAdmin,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      let users = await this.$axios
        .get("http://localhost:8000/api/user")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.length > 0) {
              this.users = res.data;
            }
          }
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
