<template>
    <div class="container">
        <h2>Edit Course</h2>
        <router-link to="/courses" class="btn btn-danger">Back To Course List</router-link>
        <form @submit.prevent="updateCourse" enctype="multipart/form-data">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="course.title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Thumbnail</label>
                <input type="file" class="form-control" @change="handleThumbnailUpload">
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
            <button type="submit" class="btn btn-primary">Update Course</button>
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
            thumbnailPreview: null,
            courseId: this.$route.params.id
        };
    },
    created() {
        this.fetchCourse();
    },
    methods: {
        async fetchCourse() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/courses/${this.courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.course = response.data;
                this.thumbnailPreview = "http://127.0.0.1:8000" + this.course.thumbnail;
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        },
        handleThumbnailUpload(event) {
            this.course.thumbnail = event.target.files[0];
            this.thumbnailPreview = URL.createObjectURL(this.course.thumbnail);
        },
        async updateCourse() {
            const formData = new FormData();
            formData.append("title", this.course.title);
            formData.append("price", this.course.price);
            formData.append("description", this.course.description);
            if (this.course.thumbnail) {
                formData.append("thumbnail", this.course.thumbnail);
            }
            formData.append("_method", "PUT"); // ✅ Laravel requires this for PUT method

            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(`http://127.0.0.1:8000/api/courses/${this.courseId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log("Update Response:", response.data); // ✅ Debugging

                alert("Course updated successfully!");
                this.$router.push("/courses");
            } catch (error) {
                console.error("Error updating course:", error.response?.data);
                alert("Failed to update course.");
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
