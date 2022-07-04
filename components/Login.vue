<template>
  <div class="login-container" v-if="!this.$auth.loggedIn">
    <button @click="closeLoginForm">Close</button>
    <form
      action=""
      class="login-form cast-form"
      id="login-form"
      @submit.prevent="login"
    >
      <h2 class="cast-login-title">Login</h2>
      <div class="cast-group">
        <input
          type="text"
          class="cast-input"
          placeholder="Username"
          v-model="loginData.username"
        />
      </div>
      <div class="cast-group">
        <input
          type="password"
          class="cast-input"
          placeholder="Password"
          v-model="loginData.password"
        />
      </div>
      <div>{{ error }}</div>
      <div class="cast-group">
        <input type="submit" class="cast-input" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    closeLoginForm() {
      return this.$store.dispatch("setLoginForm", false);
    },

    async logIn() {
      let response = await this.$auth
        .loginWith("local", {
          data: {
            username: this.loginData.username,
            password: this.loginData.password,
          },
        })
        .then((res) => {});
    },
    async login() {
      this.error = "";
      try {
        let response = await this.$auth
          .loginWith("local", {
            data: {
              username: this.loginData.username,
              password: this.loginData.password,
            },
          })
          .then((res) => {
            if (res.data.error !== undefined) {
              this.error = res.data.error;

              // this.modalFormError = res.data.error;
            } else if (res.data.success !== undefined) {
              // this.modalFormError = res.data.success;

              let response1 = this.$auth
                .loginWith("laravelSanctum", {
                  data: {
                    username: this.loginData.username,
                    password: this.loginData.password,
                  },
                })
                .then((res) => {});
            } else if (res.data.data !== undefined) {
              this.$auth.setUser(this.$auth.user);
            }
          });
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style></style>
