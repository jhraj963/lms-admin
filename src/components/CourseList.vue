<template>
    <div>
        <router-link to="/course/add" class="btn btn-primary mb-4">Add New Course</router-link>
        <h2 class="text-center mb-5">Course List</h2>
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Thumbnail</th>
                        <th>Title (Click This ➡)</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course.id">
                        <td>{{ course.id }}</td>
                        <td>
                            <img :src="'http://127.0.0.1:8000' + course.thumbnail" alt="Course Thumbnail"
                                class="course-img" />
                        </td>
                        <td>
                            <router-link :to="`/course/${course.id}`" class="text-decoration-none">
                                {{ course.title }} ➡
                            </router-link>
                        </td>
                        <td>{{ course.description }}</td>
                        <td>৳{{ course.price }}</td>
                        <td>
                            <router-link :to="`/course/edit/${course.id}`"
                                class="btn btn-warning btn-sm mr-2">Edit</router-link>
                            <button @click="deleteCourse(course.id)" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            courses: [],
        };
    },
    created() {
        this.fetchCourses();
    },
    methods: {
        async fetchCourses() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/api/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.courses = response.data;
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        },
        async deleteCourse(id) {
            if (confirm("Are you sure you want to delete this course?")) {
                try {
                    const token = localStorage.getItem("token");
                    await axios.delete(`http://localhost:8000/api/courses/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    this.courses = this.courses.filter(course => course.id !== id);
                } catch (error) {
                    console.error("Error deleting course:", error);
                    alert("Failed to delete the course.");
                }
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

.course-img {
    width: 80px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
}

.btn-warning,
.btn-danger {
    margin-right: 5px;
}
</style>
