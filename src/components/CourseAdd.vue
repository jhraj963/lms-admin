<template>
    <div class="container">
        <h2>Add New Course</h2>
        <router-link to="/courses" class="btn btn-danger">
            Back To Course List
        </router-link>
        <form @submit.prevent="addCourse">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="course.title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Thumbnail</label>
                <input type="text" class="form-control" v-model="course.thumbnail" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="number" class="form-control" v-model="course.price" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" v-model="course.description" required>
            </div>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            course: {
                title: "",
                thumbnail: "",
                price: "",
                description: ""
            }
        };
    },
    methods: {
        async addCourse() {
            await axios.post("http://127.0.0.1:8000/api/courses", this.course);
            this.$router.push("/courses");
        }
    }
};
</script>