<template>
    <div>
        <h2>Add New Lecture</h2>
        <router-link :to="`/course/${courseId}/module/${moduleId}`" class="btn btn-info">
            Back To Lecture List
        </router-link>
        <p>Course ID: {{ courseId }}</p>
        <p>Module ID: {{ moduleId }}</p> <!-- Debugging: Show IDs -->
        <form @submit.prevent="addLecture">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Video URL</label>
                <input type="text" class="form-control" v-model="video_url" required>
            </div>
            <div class="mb-3">
                <label class="form-label">PDF Notes</label>
                <input type="text" class="form-control" v-model="pdf_notes">
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
            pdf_notes: ''
        };
    },
    mounted() {
        // Debugging: Check received params
        console.log("Props - Course ID:", this.courseId);
        console.log("Props - Module ID:", this.moduleId);
        console.log("Route - Course ID:", this.$route.params.courseId);
        console.log("Route - Module ID:", this.$route.params.moduleId);
    },
    methods: {
        async addLecture() {
            // Check if IDs are correctly passed
            if (!this.courseId || !this.moduleId) {
                alert("Course ID or Module ID is missing!");
                return;
            }

            try {
                const response = await axios.post(`http://localhost:8000/api/courses/${this.courseId}/modules/${this.moduleId}/lectures`, {
                    title: this.title,
                    video_url: this.video_url,
                    pdf_notes: this.pdf_notes
                });

                console.log("Lecture Added:", response.data);

                // Redirect to the correct module page after adding a lecture
                this.$router.push(`/course/${this.courseId}/module/${this.moduleId}`);
            } catch (error) {
                console.error("Error adding lecture:", error.response?.data || error.message);
                alert("Failed to add lecture. Please check your input.");
            }
        }
    }
};
</script>
