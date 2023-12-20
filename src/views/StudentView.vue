<script setup>
import { ref, onBeforeMount } from 'vue'
import StudentInfo from '../components/studentInfo.vue'
import StudentCourses from '../components/studentCourses.vue'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { storeToRefs } from 'pinia'

const route = useRoute()

const studentStore = useStudentStore()
const studentCoursesStore = useStudentCoursesStore()
const { student } = storeToRefs(studentStore)
const { studentCourses, loading } = storeToRefs(studentCoursesStore)

onBeforeMount(async () => {
  await studentStore.getStudent(route.params.id)
  await studentCoursesStore.getStudentCourses(route.params.id)
  filterTableData()
})

const activeName = ref(sessionStorage.getItem('studentTabs') || 'information')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})
const search = ref('')

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

const updateStudentCourses = async () => {
  await studentCoursesStore.getStudentCourses(route.params.id)
  filterTableData()
}
</script>

<template>
  <h2>
    {{ student.name }} {{ student.last_name }} <el-tag>ID: {{ route.params.id }}</el-tag>
  </h2>
  <el-tabs v-model="activeName" @tab-change="changeTab" class="courseTabs">
    <el-tab-pane label="Información" name="information">
      <StudentInfo :student="student" />
    </el-tab-pane>
    <el-tab-pane label="Cursos" name="courses">
      <StudentCourses
        @handleSearch="handleSearch"
        @updateStudentCourses="updateStudentCourses"
        :courses="pagination.filtered"
        :loading="loading"
        :search="search"
        :studentId="parseInt(route.params.id)"
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
