<template>
    <div>
        <h2>Add New Lecture</h2>
        <router-link :to="`/course/${courseId}/module/${moduleId}`" class="btn btn-info">
            Back To Lecture List
        </router-link>
        <p>Course ID: {{ courseId }}</p>
        <p>Module ID: {{ moduleId }}</p> <!-- Debugging: Show IDs -->
        <form @submit.prevent="addLecture" enctype="multipart/form-data">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Video URL</label>
                <input type="text" class="form-control" v-model="video_url" required>
            </div>
            <div class="mb-3">
                <label class="form-label">PDF Notes (Upload File)</label>
                <input type="file" class="form-control" @change="handleFileUpload">
            </div>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['courseId', 'moduleId'], // Ensure props are received
    data() {
        return {
            title: '',
            video_url: '',
            pdf_file: null // Store the uploaded file
        };
    },
    methods: {
        handleFileUpload(event) {
            this.pdf_file = event.target.files[0]; // Store selected file
        },
        async addLecture() {
            if (!this.courseId || !this.moduleId) {
                alert("Course ID or Module ID is missing!");
                return;
            }

            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('video_url', this.video_url);
            if (this.pdf_file) {
                formData.append('pdf_notes', this.pdf_file);
            }

            try {
                const response = await axios.post(
                    `http://localhost:8000/api/courses/${this.courseId}/modules/${this.moduleId}/lectures`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log("Lecture Added:", response.data);
                this.$router.push(`/course/${this.courseId}/module/${this.moduleId}`);
            } catch (error) {
                console.error("Error adding lecture:", error.response?.data || error.message);
                alert("Failed to add lecture. Please check your input.");
            }
        }
    }
};
</script>
