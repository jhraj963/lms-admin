<template>
    <div class="container">
        <h2>Add New Course</h2>
        <router-link to="/courses" class="btn btn-danger">
            Back To Course List
        </router-link>
        <form @submit.prevent="addCourse" enctype="multipart/form-data">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="course.title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Thumbnail</label>
                <input type="file" class="form-control" @change="handleThumbnailUpload" required>
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
                thumbnail: null,  // Change to null since it's a file
                price: "",
                description: ""
            }
        };
    },
    methods: {
        // Handle file input for thumbnail
        handleThumbnailUpload(event) {
            this.course.thumbnail = event.target.files[0]; // Store the file in the course object
        },
        async addCourse() {
            const formData = new FormData();
            formData.append("title", this.course.title);
            formData.append("thumbnail", this.course.thumbnail); // Append the file
            formData.append("price", this.course.price);
            formData.append("description", this.course.description);

            try {
                // Send POST request with formData (multipart/form-data)
                await axios.post("http://127.0.0.1:8000/api/courses", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data" // Make sure the request is in the correct format
                    }
                });
                this.$router.push("/courses"); // Redirect to course list after success
            } catch (error) {
                console.error("Error adding course:", error.response?.data);
            }
        }
    }
};
</script>
