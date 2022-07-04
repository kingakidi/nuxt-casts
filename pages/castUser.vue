<template>
  <div class="">
    <StatsNav />
    <div class="wrapper" id="wrapper">
      <section class="list-home-categories">
        <h1><NuxtLink to="/">Precast Forum</NuxtLink> / List of Users</h1>
        <ListCategory />
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
        <div class="cast-category-page">
          <a-modal
            :visible="showModal"
            @ok="closeModal"
            @cancel="closeModal"
            title="User Action Modal"
          >
            <!-- setToggle: false,
      setRole: false,
      setDelete: false,
      setLog: false,
      setAssign: false, -->
            <form v-if="setToggle">
              <h3>Toggle User Activation</h3>
              <div class="form-group cast-form-group">
                <label for="">Select Activation Type</label>

                <a-select name="" id="" v-model="activation_status" required>
                  <a-select-option value="" disabled selected
                    >Select Activation</a-select-option
                  >
                  <a-select-option value="activate">Activate</a-select-option>
                  <a-select-option value="deactivate"
                    >Deactivate</a-select-option
                  >
                </a-select>
              </div>
              <div class="form-group cast-form-group">
                <a-input
                  type="password"
                  placeholder="Enter your password"
                  v-model="password"
                />
              </div>
              <div>
                {{ modalFormError }}
              </div>
              <div class="form-group cast-form-group">
                <a-button @click="changeUserActivation">Submit</a-button>
              </div>
            </form>

            <form v-if="setRole">
              <h3>Set User Role</h3>
              <div class="form-group cast-form-group">
                <label for="">Select Role Level </label>
                <a-select v-model="user_level">
                  <a-select-option selected value=""
                    >Select User Role</a-select-option
                  >
                  <a-select-option value="user">User</a-select-option>
                  <a-select-option value="editor">Editor</a-select-option>
                  <a-select-option value="moderator">Moderator</a-select-option>
                  <a-select-option value="admin">Admin</a-select-option>
                  <a-select-option value="super admin"
                    >Super Admin</a-select-option
                  >
                </a-select>
              </div>

              <div class="form-group cast-form-group">
                <a-input
                  type="password"
                  placeholder="Enter password"
                  v-model="password"
                />
              </div>
              <div>
                {{ modalFormError }}
              </div>
              <div class="form-group cast-form-group">
                <a-button @click="changeUserLevel">Submit</a-button>
              </div>
            </form>

            <form v-if="setDelete">
              <h3>Delete User Account</h3>
              <div class="form-group cast-form-group">
                <a-input
                  type="password"
                  placeholder="Enter your password "
                  v-model="password"
                />
              </div>
              <div>
                {{ modalFormError }}
              </div>
              <div class="cast-form-group">
                <a-button @click="deleteUserAccount">Submit</a-button>
              </div>
            </form>
          </a-modal>
          <div class="list-categories">
            <!-- <a-table
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
            </a-table> -->

            <ul class="list-category-admin">
              <li>Username</li>
              <li>Fullname</li>
              <li>Email Address</li>
              <li>User Level</li>
              <li>Actions</li>
            </ul>
            <ul
              v-for="user in users"
              :key="user.id"
              class="list-category-admin"
            >
              <li>{{ user.username }}</li>
              <li>{{ user.name }}</li>
              <li>{{ user.email }}</li>
              <li>{{ user.user_level }}</li>

              <li>
                <select
                  name="user-tools"
                  :data-action-id="user.id"
                  class="user-tools"
                  @change="userAction"
                >
                  <option value="" selected="" disabled>Select Action</option>
                  <option value="role">Change Role</option>
                  <option value="toggleActivation">Toggle Activation</option>
                  <option value="delete">Delete</option>
                  <option value="editProfile">Edit Profile</option>
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
import ListCategory from "~/components/CategoryComponent/ListCategory.vue";

export default {
  middleware: "auth",
  components: {
    StatsNav,
    CategoryHeader,
    AddCategory,
    ListCategoryAdmin,
    ListCategory,
  },
  data() {
    return {
      password: "",
      showModal: false,
      setToggle: false,
      setRole: false,
      setDelete: false,
      setLog: false,
      setAssign: false,
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
      userObject: {},
      activation_status: "",
      user_level: "",
      modalFormError: "",
    };
  },
  methods: {
    async getUsers() {
      let users = await this.$axios.get("/admin_user").then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.users = res.data;
          }
        }
      });
    },
    selectChange(e) {},
    closeModal() {
      this.showModal = false;
    },
    async userAction(e) {
      this.setToggle = false;
      this.setRole = false;
      this.setDelete = false;
      let actionId = e.target.getAttribute("data-action-id");
      let actionType = e.target.selectedOptions[0].value;
      this.showModal = true;
      this.modalFormError = "";
      let response = await this.$axios.get(`/user/${actionId}`).then((res) => {
        this.userObject = {
          id: res.data.id,
          username: res.data.username,
        };
      });

      if (actionType === "role") {
        // REQUEST FOR THE CATEGORY
        // SET THE EDITING OBJECT
        this.setToggle = false;
        this.setRole = true;
        this.setDelete = false;
      } else if (actionType === "toggleActivation") {
        this.setToggle = true;
        this.setRole = false;
        this.setDelete = false;
      } else if (actionType === "delete") {
        this.setToggle = false;
        this.setRole = false;
        this.setDelete = true;
      } else if (actionType === "assign") {
      } else if (actionType === "log") {
      }
      // REQUEST FOR ACTION FORM
    },
    async changeUserActivation() {
      // check for activationa and password
      this.modalFormError = "";
      if (
        this.password.trim().length > 0 &&
        this.activation_status.trim().length > 0
      ) {
        let response = await this.$axios
          .post(`/user/toggle_activation/${this.userObject.id}`, {
            password: this.password,
            activation_status: this.activation_status,
          })
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
            }
          });
      } else {
        this.modalFormError = "All fields required";
      }
    },
    async changeUserLevel() {
      // check for activationa and password
      this.modalFormError = "";
      if (
        this.password.trim().length > 0 &&
        this.user_level.trim().length > 0
      ) {
        let response = await this.$axios
          .post(`/user/change_user_role/${this.userObject.id}`, {
            password: this.password,
            user_level: this.user_level,
          })
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
              this.getUsers();
            }
          });
      } else {
        this.modalFormError = "All fields required";
      }
    },
    async deleteUserAccount() {
      // check for activationa and password
      this.modalFormError = "";

      if (this.password.trim().length > 0) {
        let response = await this.$axios
          .delete(`/user/${this.userObject.id}?password=${this.password}`)
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
              this.getUsers();
            }
          });
      } else {
        this.modalFormError = "All fields required";
      }
    },
  },
  mounted() {
    if (
      !this.$auth.user.user_level === "admin" ||
      !this.$auth.user.user_level === "super admin"
    ) {
      this.$router.push("/");
    }
    this.getUsers();
  },
};
</script>

<style></style>
