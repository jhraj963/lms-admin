<template>
  <div class="container-xxl py-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center text-primary mb-4">Login</h2>
        <form method="post" class="border p-4 bg-light rounded">
          <div class="mb-3">
            <label for="email" class="form-label text-primary">Email</label>
            <input type="text" class="form-control" id="email" name="email" v-model="formData.email"
              placeholder="Email" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label text-primary">Password</label>
            <input type="password" class="form-control" id="password" name="password" v-model="formData.password"
              placeholder="Enter a password" />
          </div>
          <button type="button" @click="login" class="btn btn-primary w-100">Submit</button>
          <div class="mb-3 text-dark">
            Not Registered? Click Here To
            <a href="/Register" class="btn btn-success">Register</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      formData: { email: "", password: "" },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("https://weeblecode.com/lms/public/api/login", this.formData);
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userName", JSON.stringify(response.data.data.data));

          console.log("Login Successful! Token:", response.data.data.token);

          router.push({ name: "Dashboard" }).then(() => {
            window.location.reload();
          });
        } else {
          alert("Login Failed!");
        }
      } catch (error) {
        console.error("Login Error:", error);
      }
    }
  },
};
</script>
