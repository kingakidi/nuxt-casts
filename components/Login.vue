<template>
  <div class="login-container">
    <button @click="closeLoginForm">Close</button>
    <form
      action=""
      class="login-form cast-form"
      id="login-form"
      @submit.prevent="loginUser"
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
    async loginUser() {
      this.error = "";

      // CHECK ALL FIELDS
      if (this.loginData.username !== "" && this.loginData.password !== "") {
        let loginRequest = await this.$axios
          .post("http://localhost:8000/api/login", this.loginData)
          .then((res) => {
            if (res.data.error !== "undefined") {
              this.error = res.data.error;
            } else {
              console.log(res);
            }

            if (res.data.success !== "undefined") {
              this.error = res.data.success;
            }
          });
      } else {
        this.error = "All fields required ";
      }
      // SEND
    },
  },
};
</script>

<style></style>
