<template>
  <div class="header">
    <h2>
      {{ student.name }} {{ student.last_name }} <el-tag>ID: {{ route.params.id }}</el-tag>
    </h2>
    <el-tabs v-model="activeName" class="courseTabs" @tab-change="changeTab">
      <el-tab-pane label="Información" name="information">
        <StudentInfo :student="student" />
      </el-tab-pane>
      <el-tab-pane label="Cursos" name="courses">
        <StudentCourses :courses="studentCourses" :studentId="parseInt(route.params.id)" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import StudentInfo from '../components/studentInfo.vue'
import StudentCourses from '../components/studentCourses.vue'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const studentCoursesStore = useStudentCoursesStore()
const { student } = storeToRefs(studentStore)
const { studentCourses } = storeToRefs(studentCoursesStore)

const route = useRoute()

const activeName = ref(sessionStorage.getItem('studentTabs') || 'information')

onBeforeMount(async () => {
  await studentStore.getStudent(route.params.id)
  await studentCoursesStore.getStudentCourses(route.params.id)
})

const changeTab = () => {
  sessionStorage.setItem('studentTabs', activeName.value)
}
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  max-width: 63rem;
  width: 100%;
}
</style>
