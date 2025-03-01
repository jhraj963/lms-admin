<template>
    <div>
        <router-link :to="`/course/${course.id}/module/add`" class="btn btn-primary">
            Add New Module
        </router-link>
        <router-link to="/courses" class="btn btn-danger">
            Back To Course List
        </router-link>

        <h3>Course Name: {{ course.title }}</h3>
        <h2>Module List</h2>

        <ul>
            <li v-for="module in modules" :key="module.id">
                <router-link :to="`/course/${course.id}/module/${module.id}`">
                    {{ module.title }} (Module {{ module.module_number }})
                </router-link>
                <router-link :to="`/courses/${course.id}/modules/${module.id}/edit`" class="btn btn-warning btn-sm">
                    Edit
                </router-link>
                <button @click="deleteModule(module.id)" class="btn btn-danger btn-sm">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            course: {},
            modules: []
        };
    },
    created() {
        console.log("Course ID:", this.id); // Debugging Course ID
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const courseResponse = await axios.get(`http://localhost:8000/api/courses/${this.id}`);
                this.course = courseResponse.data;

                const modulesResponse = await axios.get(`http://localhost:8000/api/courses/${this.id}/modules`);
                this.modules = modulesResponse.data;

                console.log("Modules:", this.modules); // Debugging Modules
            } catch (error) {
                console.error("Error fetching data:", error.response?.data);
            }
        },
        async deleteModule(moduleId) {
            if (!confirm("Are you sure you want to delete this module?")) return;

            try {
                await axios.delete(`http://localhost:8000/api/courses/${this.id}/modules/${moduleId}`);
                this.modules = this.modules.filter(module => module.id !== moduleId);
                alert("Module deleted successfully!");
            } catch (error) {
                console.error("Error deleting module:", error.response?.data);
                alert("Failed to delete module.");
            }
        }
    }
};
</script>
