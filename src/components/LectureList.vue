<template>
    <div>
        <router-link :to="`/course/${courseId}/module/${moduleId}/lecture/add`" class="btn btn-primary mb-4">
            Add New Lecture
        </router-link>
        <router-link :to="`/course/${courseId}`" class="btn btn-info mb-4">
            Back To Module List
        </router-link>

        <h3 class="text-center mb-3">Module: {{ module.title }}</h3>
        <h2 class="text-center mb-5">Lecture List</h2>

        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title (Click This ➡)</th>
                        <th>Video</th>
                        <th>PDF Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lecture in lectures" :key="lecture.id">
                        <td>{{ lecture.id }}</td>
                        <td>{{ lecture.title }}</td>
                        <td>
                            <a :href="lecture.video_url" target="_blank">See Video</a>
                        </td>
                        <td v-if="lecture.pdf_notes">
                            <a :href="getPdfUrl(lecture.pdf_notes)" target="_blank" download>Download PDF</a>
                        </td>
                        <td v-else>—</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['courseId', 'moduleId'],
    data() {
        return { module: {}, lectures: [] };
    },
    created() {
        this.fetchModule();
        this.fetchLectures();
    },
    methods: {
        async fetchModule() {
            try {
                const response = await axios.get(`https://weeblecode.com/lms/public/api/modules/${this.moduleId}`);
                this.module = response.data;
            } catch (error) {
                console.error("Error fetching module:", error.response?.data);
            }
        },
        async fetchLectures() {
            try {
                const response = await axios.get(`https://weeblecode.com/lms/public/api/modules/${this.moduleId}/lectures`);
                this.lectures = response.data;
            } catch (error) {
                console.error("Error fetching lectures:", error.response?.data);
                alert("Failed to load lectures.");
            }
        },
        getPdfUrl(pdfPath) {
            return `https://weeblecode.com/lms/public/storage/${pdfPath}`;
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

.btn-primary,
.btn-info {
    margin-bottom: 10px;
}
</style>
