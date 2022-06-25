<template>
  <div class="ckeditor-edit">
    <client-only placeholder="loading...">
      <ckeditor-nuxt
        v-model="contentHolder"
        @input="inputChange"
        :config="editorConfig"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Ckeditor",
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      editorConfig: {
        removePlugins: ["Title"],
        simpleUpload: {
          uploadUrl: "./static/images",
        },
      },
      contentHolder: "",
    };
  },
  methods: {
    inputChange() {
      this.$store.dispatch("setPostConent", this.contentHolder);
    },
  },
  mounted() {
    this.$store.dispatch("setPostConent", "");
  },
};
</script>
<style>
</style>