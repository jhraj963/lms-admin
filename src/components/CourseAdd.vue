<template>
    <div class="container">
        <h2>Add New Course</h2>
        <router-link to="/courses" class="btn btn-danger">Back To Course List</router-link>
        <form @submit.prevent="addCourse" enctype="multipart/form-data">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="course.title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Thumbnail</label>
                <input type="file" class="form-control" @change="handleThumbnailUpload" required>
                <img v-if="thumbnailPreview" :src="thumbnailPreview" alt="Thumbnail Preview" class="preview-img">
            </div>
            <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="number" class="form-control" v-model="course.price" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="course.description" required></textarea>
            </div>
            <button type="submit" class="btn btn-success">Save Course</button>
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
                price: "",
                description: "",
                thumbnail: null
            },
            thumbnailPreview: null
        };
    },
    methods: {
        handleThumbnailUpload(event) {
            this.course.thumbnail = event.target.files[0];
            this.thumbnailPreview = URL.createObjectURL(this.course.thumbnail);
        },
        async addCourse() {
            const formData = new FormData();
            formData.append("title", this.course.title);
            formData.append("price", this.course.price);
            formData.append("description", this.course.description);
            formData.append("thumbnail", this.course.thumbnail);

            try {
                const token = localStorage.getItem("token");
                await axios.post("https://weeblecode.com/lms/public/api/courses", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                this.$router.push("/courses"); // Redirect to course list after success
            } catch (error) {
                console.error("Error adding course:", error.response?.data);
                alert("Failed to add course.");
            }
        }
    }
};
</script>

<style scoped>
.preview-img {
    width: 150px;
    margin-top: 10px;
    border-radius: 5px;
}
</style>
