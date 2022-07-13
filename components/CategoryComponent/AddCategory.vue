<template>
  <div class="cast-category-page">
    <!-- <div class="list-categories">
      {{ categories }}
    </div> -->
    <div class="create-category-container">
      <form
        action=""
        class="create-category-form"
        @submit.prevent="createCategory"
      >
        <h2>Create Category</h2>
        <div class="cast-group">
          <input
            type="text"
            class="cast-input"
            placeholder="Category Title"
            @keyup="catTitleKeyUp"
            v-model="categoryTitle"
          />
        </div>
        <div class="show-category-error">
          {{ showStatus }}
        </div>
        <div class="cast-group">
          <input type="submit" class="cast-input" value="Create Category" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCategory",
  data() {
    return {
      categoryTitle: "",
      showStatus: "",
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    catTitleKeyUp() {
      this.showStatus = "";
    },
    createCategory() {
      this.showStatus = "";
      // CHECK INPUT, SHOW LOADER, SEND

      if (this.categoryTitle !== "") {
        let data = { title: this.categoryTitle, user_id: 4 };
        let postCat = this.$store.dispatch("postCategory", data);
        postCat.then((res) => {
          
          if (res.status === 201) {
            this.showStatus = `${this.categoryTitle} is added `;
            this.categoryTitle = "";
            this.$store.dispatch("getCategories");
          } else {
            this.showStatus = res.data;
          }
        });
      } else {
        this.showStatus = "Enter category title";
      }
    },
  },
  mounted() {},
};
</script>

<style></style>

