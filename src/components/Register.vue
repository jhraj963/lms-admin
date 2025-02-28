<template>
    <div class="container-xxl py-5">
        <div class="row justify-content-center">
            <div class="col-6">
                <h2 class="text-center text-primary mb-4">Register</h2>
                <form method="post" class="border p-4 bg-light rounded">
                    <!-- Full Name -->
                    <div class="mb-3">
                        <label for="name" class="form-label text-primary">Full Name</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="formData.name"
                            placeholder="Full Name" :class="{ 'is-invalid': errors.name }" required />
                        <div class="invalid-feedback" v-if="errors.name">
                            {{ errors.name }}
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label for="email" class="form-label text-primary">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model="formData.email"
                            placeholder="Email" :class="{ 'is-invalid': errors.email }" required />
                        <div class="invalid-feedback" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label for="password" class="form-label text-primary">Password</label>
                        <input type="password" class="form-control" id="password" name="password"
                            v-model="formData.password" placeholder="Enter a password"
                            :class="{ 'is-invalid': errors.password }" required />
                        <div class="invalid-feedback" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="mb-3">
                        <label for="c_password" class="form-label text-primary">Confirm Password</label>
                        <input type="password" class="form-control" id="c_password" name="c_password"
                            v-model="formData.c_password" placeholder="Confirm your password"
                            :class="{ 'is-invalid': passwordMismatch }" required />
                        <div class="invalid-feedback" v-if="passwordMismatch">
                            Passwords do not match.
                        </div>
                    </div>


                    <!-- Submit Button -->
                    <button type="button" @click="register" class="btn btn-primary w-100" :disabled="loading">
                        <span v-if="loading">Registering...</span>
                        <span v-else>Register</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import http from "../http-common";

export default {
    name: "Register",
    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: "",
                c_password: "",
            },
            errors: {},
            passwordMismatch: false,
            loading: false,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.formData.photo = event.target.files[0];
        },
        register() {
            this.errors = {};
            this.passwordMismatch = false;

            if (this.formData.password !== this.formData.c_password) {
                this.passwordMismatch = true;
                return;
            }

            const formDataToSend = new FormData();
            for (const key in this.formData) {
                formDataToSend.append(key, this.formData[key]);
            }

            this.loading = true;

            http
                .post("/register", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        alert("Registration successful!");
                        router.push({ name: "Login" });
                    } else {
                        this.errors = response.data.errors || {};
                        alert("Registration failed!");
                    }
                })
                .catch((e) => {
                    if (e.response && e.response.data && e.response.data.errors) {
                        this.errors = e.response.data.errors;
                    } else {
                        alert("Something went wrong. Please try again.");
                    }
                    console.error(e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
}

.text-center {
    text-align: center;
}

.btn-primary {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.btn-primary:hover {
    background-color: #218838;
}

.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
}
</style>
