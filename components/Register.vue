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
        <input
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
        <input
          type="email"
          name="email"
          id="email"
          class="cast-input"
          placeholder="Email"
          v-model="registerData.email"
        />
      </div>
      <div class="cast-group">
        <input
          type="text"
          name="fullname"
          id="fullname"
          class="cast-input"
          placeholder="Fullname"
          v-model="registerData.fullname"
        />
      </div>
      <div class="cast-group">
        <input
          type="password"
          class="cast-input"
          placeholder="Password"
          v-model="registerData.password"
        />
      </div>
      <div class="cast-group">
        <input type="submit" value="Register" class="cast-input" />
      </div>
      <div v-if="error">
        {{ error }}
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
    };
  },
  methods: {
    closeRegisterForm() {
      return this.$store.dispatch("setRegisterForm", false);
    },
    checkUsername() {},
    registerUser() {
      //   CHECK ALL FIELDS IS FILLED

      if (
        this.registerData.username !== "" ||
        this.registerData.email !== "" ||
        this.registerData.fullname !== "" ||
        this.registerData.password !== ""
      ) {
        this.$axios
          .post("http://localhost:8000/api/user", {
            username: this.registerData.username,
            email: this.registerData.email,
            name: this.registerData.fullname,
            password: this.registerData.password,
          })
          .then((res) => {
            console.log(res);
          });
      } else {
        this.error = "All fields required";
      }
      // SEND DATA TO DATABASE
    },
  },
};
</script>
<style></style>
