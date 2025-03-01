<template>
    <div>
        <router-link :to="`/course/${courseId}/module/${moduleId}/lecture/add`" class="btn btn-primary">
            Add New Lecture
        </router-link>
        <router-link :to="`/course/${courseId}`" class="btn btn-info">
            Back To Module List
        </router-link>

        <h2>Lecture List</h2>
        <ul>
            <li v-for="lecture in lectures" :key="lecture.id">
                🎥 {{ lecture.title }} -
                <a :href="lecture.video_url" target="_blank">See Video</a>

                <!-- Show PDF download option if available -->
                <span v-if="lecture.pdf_notes">
                    📄 | <a :href="getPdfUrl(lecture.pdf_notes)" target="_blank" download>Download PDF</a>
                </span>
            </li>
        </ul>
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
                const response = await axios.get(`http://localhost:8000/api/modules/${this.moduleId}`);
                this.module = response.data;
            } catch (error) {
                console.error("Error fetching module:", error.response?.data);
            }
        },
        async fetchLectures() {
            try {
                const response = await axios.get(`http://localhost:8000/api/modules/${this.moduleId}/lectures`);
                this.lectures = response.data;
            } catch (error) {
                console.error("Error fetching lectures:", error.response?.data);
                alert("Failed to load lectures.");
            }
        },
        getPdfUrl(pdfPath) {
            return `http://localhost:8000/storage/${pdfPath}`;
        }
    }
};
</script>
