<template>
  <!-- Navbar -->
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
    navbar-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <h2 class="font-weight-bolder mb-0">(LMS) Admin Panel</h2>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <!-- <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group input-group-outline">
            <label class="form-label">Type here...</label>
            <input type="text" class="form-control">
          </div>
        </div> -->
        <ul class="ms-md-auto pe-md-3 d-flex align-items-center">
          <li class="nav-item px-3 d-flex align-items-center">
            <!-- 🔹 Show Sign Out if Logged In -->
            <button v-if="isLoggedIn" @click="signOut" class="btn btn-danger btn-sm">Sign Out</button>
            <!-- 🔹 Show Sign In if Logged Out -->
            <button v-else @click="redirectToLogin" class="btn btn-primary btn-sm">Sign In</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false); // 🔹 Track Login Status

    // ✅ Check if User is Logged In
    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem("token");
    };

    // 🔹 Sign Out Function
    const signOut = () => {
      localStorage.removeItem("token");
      isLoggedIn.value = false; // Update UI
      router.push("/login"); // Redirect to Login Page
    };

    // 🔹 Redirect to Login Page
    const redirectToLogin = () => {
      router.push("/login");
    };

    onMounted(() => {
      checkLoginStatus();
    });

    return { isLoggedIn, signOut, redirectToLogin };
  }
};
</script>

<style></style>
