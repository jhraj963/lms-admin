<template>
    <div>
        <router-link to="/course/add" class="btn btn-primary mb-4">Add New Course</router-link>
        <h2 class="text-center mb-5">Course List</h2>
        <div class="row">
            <div class="col-md-4 mb-4" v-for="course in courses" :key="course.id">
                <router-link :to="`/course/${course.id}`" class="text-decoration-none">
                    <div class="course-card shadow-lg">
                        <img :src="'http://127.0.0.1:8000' + course.thumbnail" alt="Course Thumbnail"
                            class="course-img" />
                        <div class="course-info p-3">
                            <h3 class="course-title">{{ course.title }}</h3>
                            <p class="course-description">{{ course.description }}</p>
                            <p class="course-price">Price: ${{ course.price }}</p>
                            <div class="course-actions">
                                <router-link :to="`/course/edit/${course.id}`"
                                    class="btn btn-warning btn-sm mr-2">Edit</router-link>
                                <button @click="deleteCourse(course.id)" class="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
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

                console.log("Fetching Courses with Token:", token); // ✅ Debugging

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
.course-card {
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid #f0f0f0;
}

.course-info {
    padding: 15px;
}

.course-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
}

.course-description {
    font-size: 1em;
    color: #555;
    margin-bottom: 15px;
}

.course-price {
    font-size: 1.1em;
    font-weight: bold;
    color: #007bff;
}

.course-actions {
    margin-top: 15px;
}

.btn-primary {
    margin-bottom: 20px;
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #e0a800;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #c82333;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.col-md-4 {
    flex: 1 0 30%;
    max-width: 30%;
}
</style>