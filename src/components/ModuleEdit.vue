<template>
    <div>
        <h2>Edit Module</h2>
        <router-link :to="`/course/${courseId}`" class="btn btn-info">
            Back To Module List
        </router-link>

        <form @submit.prevent="updateModule">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="module.title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Module Number</label>
                <input type="text" class="form-control" v-model="module.module_number" required>
            </div>
            <button type="submit" class="btn btn-success">Update</button>
        </form>

        <!-- Delete Button -->
        <button @click="deleteModule" class="btn btn-danger btn-sm">
            Delete
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['courseId', 'moduleId'], // Ensure props are received correctly
    data() {
        return {
            module: {
                title: '',
                module_number: ''
            }
        };
    },
    created() {
        console.log("Received courseId:", this.courseId, "moduleId:", this.moduleId); // Debug props
        this.fetchModule();
    },
    methods: {
        async fetchModule() {
            try {
                const response = await axios.get(`https://weeblecode.com/lms/public/api/courses/${this.courseId}/modules/${this.moduleId}`);
                console.log("Fetched module data:", response.data); // Debug API response
                if (response.data) {
                    this.module = response.data; // Ensure data is correctly assigned
                }
            } catch (error) {
                console.error("Error fetching module:", error.response?.data);
            }
        },
        async updateModule() {
            try {
                await axios.put(`https://weeblecode.com/lms/public/api/courses/${this.courseId}/modules/${this.moduleId}`, this.module);
                alert("Module updated successfully!");
                this.$router.push(`/course/${this.courseId}`);
            } catch (error) {
                console.error("Error updating module:", error.response?.data);
                alert("Failed to update module.");
            }
        },
        async deleteModule() {
            if (confirm("Are you sure you want to delete this module?")) {
                try {
                    await axios.delete(`https://weeblecode.com/lms/public/api/courses/${this.courseId}/modules/${this.moduleId}`);
                    alert("Module deleted successfully!");
                    this.$router.push(`/course/${this.courseId}`);
                } catch (error) {
                    console.error("Error deleting module:", error.response?.data);
                    alert("Failed to delete module.");
                }
            }
        }
    }
};
</script>
