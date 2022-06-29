<template>
  <section class="list-home-categories">
    <div class="home-cats-container">
      <NuxtLink
        :to="`/category/${category.id}`"
        v-for="category in categories"
        :key="category.id"
      >
        {{ category.title[0].toUpperCase() + category.title.substring(1) }}
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: "ListCategory",
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
    // this.getAllCategory();

    this.$store.dispatch("getCategories");
  },
};
</script>

<style></style>
