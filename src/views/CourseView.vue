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
        :loading="loading"
        :students="pagination.filtered"
        :courseId="parseInt(route.params.id)"
        :search="search"
        @updateCourse="updateCourse"
        @updateStudents="updateStudents"
        @handleSearch="handleSearch"
      />
      <el-pagination
        v-if="!loading"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 100]"
        :total="pagination.total"
        background
        class="pagination"
        hide-on-single-page
        layout="sizes, prev, pager, next"
        v-model:page-size="pagination.pageSize"
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
const { courseStudents, loading } = storeToRefs(courseStudentsStore)

onBeforeMount(async () => {
  await courseStore.getCourse(route.params.id)
  await courseStudentsStore.getCourseStudents(route.params.id)
  filterTableData()
})

const search = ref('')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})

const filterTableData = () => {
  let filtered = courseStudents.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.last_name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.email.toLowerCase().includes(search.value.toLowerCase()) ||
      data.nif.toLowerCase().includes(search.value.toLowerCase())
  )

  pagination.value.total = filtered.length
  pagination.value.filtered = filtered.slice(
    pagination.value.pageSize * pagination.value.page - pagination.value.pageSize,
    pagination.value.pageSize * pagination.value.page
  )
}
const handleSizeChange = () => {
  filterTableData()
}

const handleSearch = (searchTerm) => {
  search.value = searchTerm
  filterTableData()
}

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

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
