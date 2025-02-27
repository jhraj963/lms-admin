<template>
    <div>
        <router-link to="/course/add" class="btn btn-primary">Add New Course</router-link>
        <h2>Course List</h2>
        <div v-for="course in courses" :key="course.id">
            <router-link :to="`/course/${course.id}`">
                <div class="course-card">
                    <img :src="course.thumbnail" alt="Course Thumbnail" />
                    <h3>{{ course.title }}</h3>
                    <p>{{ course.description }}</p>
                    <p>Price: ${{ course.price }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return { courses: [] };
    },
    created() {
        axios.get('http://localhost:8000/api/courses')
            .then(response => { this.courses = response.data; })
            .catch(error => { console.error(error); });
    }
};
</script>