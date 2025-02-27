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
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    data() {
        return { course: {}, modules: [] };
    },
    created() {
        axios.get(`http://localhost:8000/api/courses/${this.id}`)
            .then(response => { this.course = response.data; });
        axios.get(`http://localhost:8000/api/courses/${this.id}/modules`)
            .then(response => { this.modules = response.data; });
    }
};
</script>