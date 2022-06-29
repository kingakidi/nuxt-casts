<template>
  <div class="cast-category-page">
    <a-modal :visible="showModal" @ok="closeModal" title="Category Action">
      <form class="edit-category-form">
        <h3>Edit Category</h3>
        <a-space>
          <a-input placeholder="Enter Category Title"></a-input>
        </a-space>
        <br />
        <a-space>
          <a-button> Submit</a-button>
        </a-space>
      </form>

      <form class="delete-category-form">
        <h3>Delete Category</h3>
        <p>Are you sure you want to delete these category</p>
        <a-button>Yes</a-button>
      </form>

      <form class="disabled-category-form">
        <h3>Disabled Category</h3>
        <p>
          Are you sure you want to disable this category? <br />
          Note: once you disabled these category, it won't appear on the
          category list!
        </p>
      </form>
    </a-modal>

    <div class="list-categories">
      <ul class="list-category-admin">
        <li>Name</li>
        <li>Date</li>
        <li>Action</li>
      </ul>
      <ul
        v-for="category in categories"
        :key="category.id"
        class="list-category-admin"
      >
        <li>{{ category.title }}</li>
        <li>{{ category.created_at }}</li>
        <li>
          <select
            name="category-action"
            :data-action-id="category.id"
            @change="categoryAction"
          >
            <option value="" selected disabled>Action</option>
            <option value="disabled">Disabled</option>
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
      showModal: true,
    };
  },
  computed: {
    categories() {
      return this.$store.state.adminCategories;
    },
    totalCategory() {
      return this.$store.state.totalCategory;
    },
  },
  methods: {
    async changePage(pageNumber) {
      this.current = pageNumber;
      pageNumber = pageNumber - 1;

      // SEND FOR THIS PAGE NUMBER,
      this.$store.dispatch("getPagedCategory", pageNumber);
    },
    categoryAction(e) {
      let actionId = e.target.getAttribute("data-action-id");
      let actionType = e.target.selectedOptions[0].value;
      console.log(actionType, actionId);

      // REQUEST FOR ACTION FORM
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getPagedCategory", 0);
  },
};
</script>

<style></style>
