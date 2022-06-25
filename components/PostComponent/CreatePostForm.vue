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
              {{ capitalizeCategory(category.title) }}
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
            @keyup="generateSlug"
          />
          <div class="show-post-slug">
            https://www.precastnaija.com/id/{{ postSlug }}
          </div>
        </div>
        <div class="cast-form-group">
          <div class="ckeditor-edit">
            <client-only placeholder="loading...">
              <Ckeditor />
            </client-only>
          </div>

          <!-- <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            class="cast-input"
            placeholder="Post Content"
            v-model="postContent"
          ></textarea> -->
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
        <div class="show-error">
          {{ errors }}
        </div>
        <div class="cast-form-group">
          <input type="submit" class="cast-input" value="Create Post" />
        </div>
      </form>
      <!-- {{ postCategory }} - {{ postTitle }} - {{ [postSlug] }} -->
    </div>
  </div>
</template>

<script>
import Ckeditor from "~/components/Ckeditor.vue";

export default {
  components: { Ckeditor },
  name: "CreatePostForm",
  data() {
    return {
      postSlug: "",
      postCategory: "",
      postTitle: "",

      postFiles: [],
      categories: [],
      errors: "",
    };
  },
  computed: {
    postContent() {
      return this.$store.state.postContent;
    },
  },
  methods: {
    closeCreateForm() {
      return this.$store.dispatch("setPostForm", false);
    },
    setCategory(e) {
      this.postCategory = e.target.value;
    },
    capitalizeCategory(data) {
      let newData = data[0].toUpperCase() + data.substring(1);
      return newData;
    },
    generateSlug() {
      // REMOVE DOUBLE SPACE
      let singleSpace = this.postTitle.replace(/  +/g, " ");
      this.postTitle = singleSpace;

      if (singleSpace.length < 30) {
        const newSlug = singleSpace.replace(/\s/g, "-");
        this.postSlug = newSlug.toLowerCase();
      }
    },
    clean(data) {
      return data.length;
    },
    postFileChange(e) {
      // console.log(checkFiles);
      // check if file is selected

      this.postFiles = this.$refs.postFiles.files;

      if (this.postFiles.length > 0) {
        console.log(this.postFiles[0]);

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
    async getAllCategory() {
      let cat = await this.$axios
        .get("http://localhost:8000/api/category")
        .then((res) => {
          this.categories = res.data;
        });
    },
    createPost() {
      this.errors = "";

      if (
        this.clean(this.postCategory) > 0 &&
        this.clean(this.postSlug) > 0 &&
        this.clean(this.postTitle) > 0
      ) {
        let formData = new FormData();
        formData.append("post_user_id", 1);

        formData.append("category_id", this.postCategory);

        formData.append("title", this.postTitle);
        formData.append("content", this.postContent);
        formData.append("slug", this.postSlug);
        formData.append("images", this.postFiles[0]);

        // CHECK IF ALL FIELD EXCEPT IMAGES
        try {
          this.$axios
            .post("http://localhost:8000/api/post", formData)
            .then((res) => {
              if (
                res.status === 201 &&
                res.statusText.toLowerCase() === "created"
              ) {
                this.errors = "Post Created Successfully";
                this.postTitle = "";
                this.$store.dispatch("setPostConent", "");
                this.postSlug = "";
                this.$refs.postFiles.value = "";
              } else {
                this.errors = res.data.statusMessage;
                console.log(res);
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.errors = "All fields required";
      }
    },
  },
  mounted() {
    this.getAllCategory();
    console.log("Mounted");
  },
};
</script>

<style></style>
