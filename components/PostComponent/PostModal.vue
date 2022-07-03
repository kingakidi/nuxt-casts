<template>
  <div class="btn-post-actions">
    <a-modal
      :visible="showModal"
      @cancel="closeModal"
      title="Post Action Model"
    >
      <!-- DELETE POST  -->
      <form v-if="modalShowContent.showDeletePost">
        <h3>Delete Post</h3>
        <p>Are you sure you want to delete this post?</p>
        <div class="form-group cast-form-group">
          <a-input placeholder="Enter your password " v-model="password" />
        </div>
        <div>
          {{ modalFormError }}
        </div>
        <div class="cast-form-group">
          <a-button @click="deletePost()">Submit</a-button>
        </div>
      </form>
      <!-- DISABLE POST  -->
      <form v-if="modalShowContent.showDisabledPost">
        <h3>Disable Post</h3>
        <p>
          Are you sure you want to Disable
          <strong>{{ thisPost.title }}</strong
          >?
        </p>
        <div class="form-group cast-form-group">
          <a-input placeholder="Enter your password " v-model="password" />
        </div>
        <div>
          {{ modalFormError }}
        </div>
        <div class="cast-form-group">
          <a-button @click="disablePost()">Submit</a-button>
        </div>
      </form>

      <!-- SUSPEND USER  -->
      <form v-if="modalShowContent.showSuspendUser">
        <h3>Suspend User</h3>
        <p>Are you sure you want to Disable this post?</p>
        <div class="form-group cast-form-group">
          <a-input placeholder="Enter your password " v-model="password" />
        </div>
        <div>
          {{ modalFormError }}
        </div>
        <div class="cast-form-group">
          <a-button @click="suspendUser()">Submit</a-button>
        </div>
      </form>

      <!-- SEND TO FRONT PAGE  -->
      <form v-if="modalShowContent.showFrontPage">
        <h3>SEND POST TO FRONT PAGE</h3>
        <p>Are you sure you want to send this post to front page?</p>
        <div class="form-group cast-form-group">
          <a-input placeholder="Enter your password " v-model="password" />
        </div>
        <div>
          {{ modalFormError }}
        </div>
        <div class="cast-form-group">
          <a-button @click="frontPage()">Submit</a-button>
        </div>
      </form>
    </a-modal>
    <a-space>
      <a-button type="primary">Edit</a-button>
      <a-button id="btn-post-front-page" @click="setFrontPage(thisPost.id)">
        Send to Front Page
      </a-button>
      <a-button type="danger" @click="setDeletePost(thisPost.id)"
        >Delete</a-button
      >
      <a-button type="danger" @click="setDisablePost(thisPost.id)"
        >Disabled</a-button
      >
      <a-button type="danger" @click="setSuspendUser(thisPost.id)">
        Suspend User
      </a-button>
    </a-space>
  </div>
</template>

<script>
export default {
  //   props: ["thisPost"],
  data() {
    return {
      showModal: false,
      password: "",
      modalFormError: "",
      modalShowContent: {
        showFrontPage: false,
        showDeletePost: false,
        showSuspendUser: false,
        showDisabledPost: false,
      },
    };
  },
  computed: {
    thisPost() {
      return this.$store.state.post;
    },
  },
  methods: {
    setFrontPage() {
      this.toggleModalContent("showFrontPage");
    },
    setDisablePost() {
      this.toggleModalContent("showDisabledPost");
    },
    setDeletePost() {
      this.toggleModalContent("showDeletePost");
    },
    setSuspendUser() {
      this.toggleModalContent("showSuspendUser");
    },

    // actions functions
    async frontPage() {
      this.modalFormError = "";
      //   CHECK PASSWORD FIELD
      console.log(this.password);
      if (this.password.trim().length < 1) {
        this.modalFormError = "Password fields is required";
      } else {
        let req = await this.$axios
          .post(`http://localhost:8000/api/home_page/${this.thisPost.id}`, {
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
            }
          });
      }
    },
    async disablePost() {
      this.modalFormError = "";
      //   CHECK PASSWORD FIELD
      console.log(this.password);
      if (this.password.trim().length < 1) {
        this.modalFormError = "Password fields is required";
      } else {
        let req = await this.$axios
          .post(
            `http://localhost:8000/api/disable_post/${this.thisPost.id}?password=${this.password}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
            }
          });
      }
    },
    async deletePost() {
      this.modalFormError = "";
      //   CHECK PASSWORD FIELD
      console.log(this.password);
      if (this.password.trim().length < 1) {
        this.modalFormError = "Password fields is required";
      } else {
        let req = await this.$axios
          .delete(
            `http://localhost:8000/api/post/${this.thisPost.id}?password=${this.password}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
            }
          });
      }
    },
    async suspendUser() {
      this.modalFormError = "";
      //   CHECK PASSWORD FIELD
      console.log(this.password);
      if (this.password.trim().length < 1) {
        this.modalFormError = "Password fields is required";
      } else {
        let req = await this.$axios
          .post(
            `http://localhost:8000/api/user/suspend_user/${this.thisPost.username}`,
            {
              password: this.password,
              username: this.thisPost.username,
              activation_status: "deactivate",
            }
          )
          .then((res) => {
            if (res.data.error !== undefined) {
              this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              this.modalFormError = res.data.success;
              this.password = "";
            }
          });
      }
    },
    closeModal() {
      this.showModal = false;
    },
    toggleModalContent(contentType) {
      this.showModal = true;
      for (let key in this.modalShowContent) {
        if (key === contentType) {
          this.modalShowContent[key] = true;
        } else {
          this.modalShowContent[key] = false;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
