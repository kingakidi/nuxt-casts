<template>
  <div class="register-container">
    <button @click="closeRegisterForm">Close</button>
    <form
      action=""
      class="cast-register-form cast-form"
      id="login-form"
      @submit.prevent="registerUser"
    >
      <h2 class="cast-register-title">Register an account</h2>
      <div class="cast-group">
        <a-input
          type="text"
          class="cast-input"
          placeholder="Username"
          v-model="registerData.username"
        />
        <div class="username-status" id="username-status" v-if="usernameStatus">
          {{ usernameStatusText }}
        </div>
      </div>

      <div class="cast-group">
        <a-input
          type="email"
          name="email"
          id="email"
          class="cast-input"
          placeholder="Email"
          v-model="registerData.email"
        />
      </div>
      <div class="cast-group">
        <a-input
          type="text"
          name="fullname"
          id="fullname"
          class="cast-input"
          placeholder="Fullname"
          v-model="registerData.fullname"
        />
      </div>
      <div class="cast-group">
        <a-input
          type="password"
          class="cast-input"
          placeholder="Password"
          v-model="registerData.password"
        />
      </div>
      <div v-if="error">
        {{ error }}
      </div>

      <div v-if="loading">
        <a-spin />
      </div>
      <div class="cast-group">
        <input
          type="submit"
          value="Register"
          class="cast-input"
          id="btnRegister"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameStatus: false,
      usernameStatusText: "Username is required",
      registerData: {
        username: "",
        email: "",
        fullname: "",
        password: "",
      },
      error: "",
      loading: false,
    };
  },
  methods: {
    closeRegisterForm() {
      return this.$store.dispatch("setRegisterForm", false);
    },
    checkUsername() {},
    registerUser() {
      //   CHECK ALL FIELDS IS FILLED
      let btnRegister = document.getElementById("btnRegister");

      this.error = "";
      if (
        this.registerData.username !== "" ||
        this.registerData.email !== "" ||
        this.registerData.fullname !== "" ||
        this.registerData.password !== ""
      ) {
        if (/\s/g.test(this.registerData.username)) {
          this.error = "Username can't contain space";
        } else if (/^\d/.test(this.registerData.username)) {
          this.error = "Username can't start with a number";
        } else if (this.registerData.username.trim().length < 5) {
          this.error = "Username must be upto 5 character";
        } else {
          this.loading = true;
          btnRegister.disabled = true;
          this.error = "Loading...";
          this.$axios
            .post("/user", {
              username: this.registerData.username,
              email: this.registerData.email,
              name: this.registerData.fullname,
              password: this.registerData.password,
            })
            .then((res) => {
              if (res.data.username !== undefined) {
                this.error = res.data.username[0];
              } else if (res.data.email !== undefined) {
                this.error = res.data.email[0];
              } else if (res.data.message !== undefined) {
                this.error = res.data.message;
              }
            })
            .finally(() => {
              (this.loading = false), (btnRegister.disabled = false);
            });
        }
      } else {
        this.error = "All fields required";
      }
      // SEND DATA TO DATABASE
    },
  },
};
</script>
<style></style>
