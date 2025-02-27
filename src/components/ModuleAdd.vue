<template>
    <div>
        <h2>Add New Module</h2>
        <router-link :to="`/course/${courseId}`" class="btn btn-info">
            Back To Module List
        </router-link>
        <p>Course ID: {{ courseId }}</p> <!-- Debugging: Show Course ID -->
        <form @submit.prevent="addModule">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Module Number</label>
                <input type="text" class="form-control" v-model="module_number" required>
            </div>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['courseId'], // Ensure this is correctly received
    data() {
        return {
            title: '',
            module_number: ''
        };
    },
    mounted() {
        console.log("Received Course ID:", this.courseId);
    },
    methods: {
        async addModule() {
            if (!this.courseId) {
                alert("Course ID is missing!");
                return;
            }
            try {
                await axios.post(`http://localhost:8000/api/courses/${this.courseId}/modules`, {
                    title: this.title,
                    module_number: this.module_number
                });
                this.$router.push(`/course/${this.courseId}`);
            } catch (error) {
                console.error("Error adding module:", error.response?.data);
                alert("Failed to add module. Please check your input.");
            }
        }
    }
};
</script>
