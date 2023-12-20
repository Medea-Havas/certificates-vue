<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCourseStore } from '@/stores/course'
import { useCourseStudentsStore } from '@/stores/courseStudents'
import { useStudentsStore } from '@/stores/students'
import CourseInfo from '../components/courseInfo.vue'
import CourseStudents from '../components/courseStudents.vue'
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

const activeName = ref(sessionStorage.getItem('courseTabs') || 'information')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})
const search = ref('')

const changeTab = () => {
  sessionStorage.setItem('courseTabs', activeName.value)
}

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

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

const handleSearch = (searchTerm) => {
  search.value = searchTerm
  filterTableData()
}

const handleSizeChange = () => {
  filterTableData()
}

const updateCourseStudents = async () => {
  await courseStudentsStore.getCourseStudents(route.params.id)
  filterTableData()
}

const updateStudents = () => {
  studentsStore.getStudents()
  filterTableData()
}
</script>

<template>
  <h2>
    {{ course.title }} <el-tag>ID: {{ route.params.id }}</el-tag>
  </h2>
  <el-tabs v-model="activeName" @tab-change="changeTab" class="courseTabs">
    <el-tab-pane label="Información" name="information">
      <CourseInfo :course="course" />
    </el-tab-pane>
    <el-tab-pane label="Alumnos" name="users">
      <CourseStudents
        @updateStudents="updateStudents"
        @updateCourseStudents="updateCourseStudents"
        @handleSearch="handleSearch"
        :courseId="parseInt(route.params.id)"
        :loading="loading"
        :search="search"
        :students="pagination.filtered"
      />
      <el-pagination
        v-if="!loading"
        v-model:page-size="pagination.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 100]"
        :total="pagination.total"
        background
        class="pagination"
        hide-on-single-page
        layout="sizes, prev, pager, next"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  max-width: 63rem;
  width: 100%;
}
</style>
