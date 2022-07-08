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
      <div v-if="loading"><a-spin /></div>
      <div class="cast-group">
        <input type="submit" id="btnLogin" class="cast-input" value="Login" />
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
      loading: false,
    };
  },
  methods: {
    closeLoginForm() {
      return this.$store.dispatch("setLoginForm", false);
    },

    async login() {
      this.error = "";
      let btnLogin = document.getElementById("btnLogin");
      if (
        this.loginData.username.trim().length > 0 &&
        this.loginData.password.trim().length > 0
      ) {
        this.loading = true;
        btnLogin.disabled = true;
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
                this.loading = false;
                btnLogin.disabled = false;
              } else if (res.data.success !== undefined) {
                let response1 = this.$auth
                  .loginWith("laravelSanctum", {
                    data: {
                      username: this.loginData.username,
                      password: this.loginData.password,
                    },
                  })
                  .then((res) => {})
                  .finally(() => {
                    this.loading = false;
                    btnLogin.disabled = false;
                  });
              } else if (res.data.data !== undefined) {
                this.$auth.setUser(this.$auth.user);
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.error = "All fields required";
      }
    },
  },
};
</script>

<style></style>
