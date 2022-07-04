<template>
  <div class="cast-category-page">
    <a-modal
      :visible="showModal"
      @ok="closeModal"
      @cancel="closeModal"
      title="Category Action"
    >
      <form class="edit-category-form" v-if="setEditCategory">
        <h3>Edit Category</h3>
        <a-space>
          <a-input
            v-model="actionCategoryObject.title"
            placeholder="Enter Category Title"
          ></a-input>
        </a-space>
        <a-space>
          <div>
            {{ modalFormError }}
          </div>
        </a-space>
        <br />
        <a-space>
          <a-button @click.prevent="editCategory"> Submit</a-button>
        </a-space>
      </form>

      <form class="delete-category-form" v-if="setDeleteCategory">
        <h3>Delete Category</h3>
        <a-input
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <p>
          Are you sure you want to delete
          <strong>{{ actionCategoryObject.title }}</strong> category
        </p>
        <div>
          {{ modalFormError }}
        </div>
        <a-button @click="deleteCategory">Delete</a-button>
      </form>

      <form class="disabled-category-form" v-if="setDisabledCategory">
        <h3>Disabled Category</h3>
        <a-input
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <p>
          Are you sure you want to Disabled
          <strong>{{ actionCategoryObject.title }} </strong> category
        </p>
        <div>
          {{ modalFormError }}
        </div>
        <a-button @click="disableCategory">Disable</a-button>
      </form>
      <form class="enable-category-form" v-if="setEnableCategory">
        <h3>Enable Category</h3>
        <a-input
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <p>
          Are you sure you want to Disabled
          <strong>{{ actionCategoryObject.title }} </strong> category
        </p>
        <div>
          {{ modalFormError }}
        </div>
        <a-button @click="enableCategory">Enable</a-button>
      </form>
    </a-modal>

    <div class="list-categories">
      <ul class="list-category-admin">
        <li>Name</li>
        <li>Date</li>
        <li>Status</li>
        <li>Action</li>
      </ul>
      <ul
        v-for="category in categories"
        :key="category.id"
        class="list-category-admin"
      >
        <li>{{ category.title }}</li>
        <li>{{ category.created_at }}</li>
        <li>{{ category.category_status }}</li>
        <li>
          <select
            name="category-action"
            :data-action-id="category.id"
            @change="categoryAction"
          >
            <option value="" selected disabled>Action</option>

            <option
              v-if="categoryStatus(category.category_status)"
              value="disabled"
            >
              Disabled
            </option>
            <option
              v-if="!categoryStatus(category.category_status)"
              value="enable"
            >
              Enable
            </option>

            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </li>
      </ul>

      <section class="pagination">
        <a-pagination
          :current="current"
          :total="totalCategory"
          :pageSize="10"
          @change="changePage"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCategoryAdmin",
  data() {
    return {
      current: 1,
      id: "",
      showModal: false,
      setDeleteCategory: false,
      setDisabledCategory: false,
      setEditCategory: false,
      setEnableCategory: false,
      password: "",
      actionCategoryObject: {
        id: "",
        title: "",
      },
      modalFormError: "",
    };
  },
  computed: {
    categories() {
      return this.$store.state.adminCategories;
    },
    totalCategory() {
      return this.$store.state.totalCategory;
    },
    category_status(status) {
      if (status === 1 || status === "1") {
        return "Active";
      } else {
        return "Disabled";
      }
    },
  },
  methods: {
    categoryStatus(cat_status) {
      if (cat_status === 1 || cat_status === "1") {
        return true;
      } else {
        return false;
      }
    },
    async changePage(pageNumber) {
      this.current = pageNumber;
      pageNumber = pageNumber - 1;

      // SEND FOR THIS PAGE NUMBER,
      this.$store.dispatch("getPagedCategory", pageNumber);
    },
    async categoryAction(e) {
      let actionId = e.target.getAttribute("data-action-id");
      let actionType = e.target.selectedOptions[0].value;
      this.showModal = true;
      this.modalFormError = "";
      let response = await this.$axios
        .get(`/category/${actionId}`)
        .then((res) => {
          this.actionCategoryObject = {
            id: res.data.id,
            title: res.data.title,
          };
        });

      if (actionType === "edit") {
        this.setEditCategory = true;

        (this.setDeleteCategory = false), (this.setDisabledCategory = false);
        this.setEnableCategory = false;

        // REQUEST FOR THE CATEGORY
        // SET THE EDITING OBJECT
      } else if (actionType === "disabled") {
        this.setEditCategory = false;
        this.setEnableCategory = false;
        this.setDeleteCategory = false;
        this.setDisabledCategory = true;
      } else if (actionType === "delete") {
        this.setEditCategory = false;
        this.setEnableCategory = false;
        this.setDeleteCategory = true;
        this.setDisabledCategory = false;
      } else if (actionType === "enable") {
        this.setEditCategory = false;
        this.setEnableCategory = true;
        this.setDeleteCategory = false;
        this.setDisabledCategory = false;
      }
      // REQUEST FOR ACTION FORM
    },
    closeModal() {
      this.showModal = false;
    },
    editCategory() {
      this.modalFormError = "";
      let update = this.$axios
        .put(`/category/${this.actionCategoryObject.id}`, {
          title: this.actionCategoryObject.title,
        })
        .then((res) => {
          if (res.data.error !== undefined) {
            if (res.data.error.title !== undefined) {
              this.modalFormError = res.data.error.title[0];
            }
          } else {
            if (res.data.message !== undefined) {
              this.modalFormError = res.data.message;
              this.$store.dispatch("getPagedCategory", 0);
            }
          }
        });
    },
    async deleteCategory() {
      this.modalFormError = "";
      if (this.password.trim().length > 0) {
        let response = this.$axios
          .delete(
            `/category/${this.actionCategoryObject.id}?password=${this.password}`
          )
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
              this.$store.dispatch("getPagedCategory", 0);
            }
          });
      } else {
        this.modalFormError = "Password fields is required";
      }
    },
    async disableCategory() {
      this.modalFormError = "";
      if (this.password.trim().length > 0) {
        let response = this.$axios
          .post(
            `/category/disable_category/${this.actionCategoryObject.id}?password=${this.password}`
          )
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
              this.$store.dispatch("getPagedCategory", 0);
            }
          });
      } else {
        this.modalFormError = "Password fields is required";
      }
    },
    async enableCategory() {
      this.modalFormError = "";
      if (this.password.trim().length > 0) {
        let response = this.$axios
          .post(
            `/category/enable_category/${this.actionCategoryObject.id}?password=${this.password}`
          )
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
              this.$store.dispatch("getPagedCategory", 0);
            }
          });
      } else {
        this.modalFormError = "Password fields is required";
      }
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getPagedCategory", 0);
  },
};
</script>

<style></style>
