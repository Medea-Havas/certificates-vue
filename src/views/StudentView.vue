<template>
  <h2>
    {{ student.name }} {{ student.last_name }} <el-tag>ID: {{ route.params.id }}</el-tag>
  </h2>
  <el-tabs v-model="activeName" class="courseTabs" @tab-change="changeTab">
    <el-tab-pane label="Información" name="information">
      <StudentInfo :student="student" />
    </el-tab-pane>
    <el-tab-pane label="Cursos" name="courses">
      <StudentCourses
        :courses="pagination.filtered"
        :loading="loading"
        :search="search"
        :studentId="parseInt(route.params.id)"
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
import StudentInfo from '../components/studentInfo.vue'
import StudentCourses from '../components/studentCourses.vue'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const studentCoursesStore = useStudentCoursesStore()
const { student } = storeToRefs(studentStore)
const { studentCourses, loading } = storeToRefs(studentCoursesStore)

const route = useRoute()

const activeName = ref(sessionStorage.getItem('studentTabs') || 'information')
const search = ref('')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})

onBeforeMount(async () => {
  await studentStore.getStudent(route.params.id)
  await studentCoursesStore.getStudentCourses(route.params.id)
  filterTableData()
})

const changeTab = () => {
  sessionStorage.setItem('studentTabs', activeName.value)
}

const filterTableData = () => {
  let filtered = studentCourses.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.file_number.toLowerCase().includes(search.value.toLowerCase())
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
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  max-width: 63rem;
  width: 100%;
}
</style>
