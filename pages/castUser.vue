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
            <a-table
              :dataSource="users"
              :rowKey="
                (record, index) => {
                  return index;
                }
              "
              :columns="usersColumns"
              bordered
              :pagination="checkPaginate"
            >
              <template #action="{ record }">
                {{ record }}
                <a-select style="width: 150px" @change="selectChange">
                  <a-select-option value="">Select Action</a-select-option>
                  <a-select-option value="editProfile"
                    >Edit Profile</a-select-option
                  >
                  <a-select-option value="role">Change Role</a-select-option>
                  <a-select-option value="toggleActivation"
                    >Toggle Activation</a-select-option
                  >
                  <a-select-option value="assign">Assign</a-select-option>
                  <a-select-option value="chart">View Chart</a-select-option>
                  <a-select-option value="log">Logs</a-select-option>
                  <a-select-option value="changeEmail"
                    >Change Email</a-select-option
                  >
                </a-select>
              </template>
            </a-table>
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
      checkPaginate: false,
      users: [],
      usersColumns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Email Address",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    async getUsers() {
      let users = await this.$axios
        .get("http://localhost:8000/api/user")
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            if (res.data.length > 0) {
              this.users = res.data;
            }
          }
        });
    },
    selectChange(e) {
      console.log(e);
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
