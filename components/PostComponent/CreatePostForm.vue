<template>
  <div>
    <div class="create-post-container">
      <button @click="closeCreateForm">Close</button>
      <form @submit.prevent="createPost" class="create-post-form">
        <h2 class="form-title">Create Post Form</h2>
        <div class="cast-form-group">
          <label for="category">Select Category</label>
          <select
            name="category"
            id="category"
            class="cast-input"
            @change="setCategory"
          >
            <option value="" selected disabled>Select Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="cast-form-group">
          <label for="postTitle">Post Title </label>
          <input
            type="text"
            class="cast-input"
            placeholder="Post Title"
            v-model="postTitle"
          />
          <div class="show-post-slug">
            <!-- https://www.precastnaija.com/id/{{ postSlug }} -->
          </div>
        </div>
        <div class="cast-form-group">
          <label>Cast</label>
          <div class="ckeditor-edit">
            <client-only placeholder="loading...">
              <ckeditor-nuxt v-model="postContent" :config="editorConfig" />
            </client-only>
          </div>
        </div>
        <div class="cast-form-group">
          <label for="file">Select Image</label>
          <input
            type="file"
            ref="postFiles"
            id="file"
            class="cast-input"
            @change="postFileChange"
          />
        </div>
        <div v-if="loading"><a-spin /></div>
        <div class="show-error">
          {{ errors }}
        </div>
        <div class="cast-form-group">
          <input
            type="submit"
            class="cast-input"
            id="btn-create-post"
            value="Create Post"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  name: "CreatePostForm",
  data() {
    return {
      editorConfig: {
        removePlugins: ["Title"],
        simpleUpload: {
          uploadUrl: "./static/images",
        },
      },
      postSlug: "",
      postCategory: "",
      postTitle: "",

      postFiles: [],
      postContent: "",

      errors: "",
      loading: false,
    };
  },
  computed: {
    // postContent() {
    //   return this.$store.state.postContent;
    // },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    closeCreateForm() {
      return this.$store.dispatch("setPostForm", false);
    },
    setCategory(e) {
      this.postCategory = e.target.value;
    },

    clean(data) {
      return data.length;
    },
    postFileChange(e) {
      // check if file is selected

      this.postFiles = this.$refs.postFiles.files;

      if (this.postFiles.length > 0) {
        let allowedExtension = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/bmp",
        ];

        let checkFiles = this.$refs.postFiles.files[0].type;
        if (allowedExtension.indexOf(checkFiles) > -1) {
          this.erros = "";
        } else {
          this.$refs.postFiles.value = "";
          alert("Invalid Image Seleted");
        }
      } else {
        console.log("no file selected");
      }

      //   CHECK IF THE FILES ARE IMAGES, AND THE SIZE ARE NOT MORE THAN 2MB, ELSE , CLEAN AND RESTART
    },

    createPost() {
      this.errors = "";
      let singleSpace = this.postTitle.replace(/  +/g, " ");

      this.postTitle = singleSpace;

      const newSlug = singleSpace.replace(/\s/g, "-");
      this.postSlug = newSlug.toLowerCase();

      if (
        this.clean(this.postCategory) > 0 &&
        this.clean(this.postSlug) > 0 &&
        this.clean(this.postTitle) > 0 &&
        this.postContent.trim().length > 0
      ) {
        let formData = new FormData();

        formData.append("category_id", this.postCategory);
        formData.append("title", this.postTitle);
        formData.append("content", this.postContent);
        formData.append("slug", this.postSlug);
        formData.append("images", this.postFiles[0]);

        // CHECK IF ALL FIELD EXCEPT IMAGES
        try {
          let btnCreatePost = document.getElementById("btn-create-post");

          btnCreatePost.disabled = true;
          this.loading = true;
          this.errors = "Loading...";

          // Set loading status
          // Disabled Button for Create Post
          this.$axios.post("/post", formData).then((res) => {
            if (res.data.success != undefined) {
              this.errors = "Post Created Successfully";
              this.postTitle = "";
              this.$store.dispatch("setPostConent", "");
              this.postSlug = "";
              this.$refs.postFiles.value = "";
              this.loading = false;
            } else if (res.status === 201) {
              this.errors = "Post Created Successfully";
              this.postTitle = "";
              this.$store.dispatch("setPostConent", "");
              this.postSlug = "";
              this.$refs.postFiles.value = "";
              this.loading = false;
            } else {
              this.loading = false;
              this.errors = res.data.statusMessage;
              btnCreatePost.disabled = false;
            }
          });
        } catch (error) {
          btnCreatePost.disabled = false;
          console.log(error);
          this.loading = false;
          this.errors = "Failed to create post";
        }
      } else {
        this.errors = "All fields required";
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
