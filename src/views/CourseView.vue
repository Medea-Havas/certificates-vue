<template>
  <h2>
    {{ course.title }} <el-tag>ID: {{ route.params.id }}</el-tag>
  </h2>
  <el-tabs v-model="activeName" class="courseTabs" @tab-change="changeTab">
    <el-tab-pane label="Información" name="information">
      <CourseInfo :course="course" />
    </el-tab-pane>
    <el-tab-pane label="Alumnos" name="users">
      <CourseStudents
        :students="courseStudents"
        :courseId="parseInt(route.params.id)"
        @updateCourse="updateCourse"
        @updateStudents="updateStudents"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import CourseInfo from '../components/courseInfo.vue'
import CourseStudents from '../components/courseStudents.vue'
import { useCourseStore } from '@/stores/course'
import { useCourseStudentsStore } from '@/stores/courseStudents'
import { useStudentsStore } from '@/stores/students'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()

const courseStore = useCourseStore()
const courseStudentsStore = useCourseStudentsStore()
const studentsStore = useStudentsStore()
const { course } = storeToRefs(courseStore)
const { courseStudents } = storeToRefs(courseStudentsStore)

onBeforeMount(async () => {
  await courseStore.getCourse(route.params.id)
  await courseStudentsStore.getCourseStudents(route.params.id)
})

const activeName = ref(sessionStorage.getItem('courseTabs') || 'information')

const changeTab = () => {
  sessionStorage.setItem('courseTabs', activeName.value)
}

const updateCourse = () => {
  courseStudentsStore.getCourseStudents(route.params.id)
}
const updateStudents = () => {
  studentsStore.getStudents()
}
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  max-width: 63rem;
  width: 100%;
}
</style>
