<template>
    <div>
        <router-link :to="`/course/${course.id}/module/add`" class="btn btn-primary mb-4">Add New Module</router-link>
        <router-link to="/courses" class="btn btn-danger mb-4">Back To Course List</router-link>

        <h3 class="text-center mb-3">Course Name: {{ course.title }}</h3>
        <h2 class="text-center mb-5">Module List</h2>

        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title (Click This ➡)</th>
                        <th>Module Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="module in modules" :key="module.id">
                        <td>{{ module.id }}</td>
                        <td>
                            <router-link :to="`/course/${course.id}/module/${module.id}`" class="text-decoration-none">
                                {{ module.title }} ➡
                            </router-link>
                        </td>
                        <td>{{ module.module_number }}</td>
                        <td>
                            <router-link :to="`/courses/${course.id}/modules/${module.id}/edit`"
                                class="btn btn-warning btn-sm mr-2">Edit</router-link>
                            <button @click="deleteModule(module.id)" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const courseResponse = await axios.get(`https://weeblecode.com/lms/public/api/courses/${this.id}`);
                this.course = courseResponse.data;

                const modulesResponse = await axios.get(`https://weeblecode.com/lms/public/api/courses/${this.id}/modules`);
                this.modules = modulesResponse.data;
            } catch (error) {
                console.error("Error fetching data:", error.response?.data);
            }
        },
        async deleteModule(moduleId) {
            if (!confirm("Are you sure you want to delete this module?")) return;

            try {
                await axios.delete(`https://weeblecode.com/lms/public/api/courses/${this.id}/modules/${moduleId}`);
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

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}

.thead-dark {
    background-color: #343a40;
    color: white;
}

.btn-warning,
.btn-danger {
    margin-right: 5px;
}
</style>
