<template>
  <div class="cast-category-page">
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
          <select name="category-action" id="">
            <option value="" selected disabled>Action</option>
            <option value="disabled">Disabled</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCategoryAdmin ",
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getCategories");
  },
};
</script>

<style></style>
