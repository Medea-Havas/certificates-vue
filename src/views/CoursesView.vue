<script setup>
import { ref, computed } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import moment from 'moment'
import CourseForm from '../components/courseForm.vue'
import { storeToRefs } from 'pinia'

const coursesStore = useCoursesStore()
const { courses } = storeToRefs(coursesStore)

const search = ref('')
const dialogFormVisible = ref(false)
const formTitle = ref('Nuevo curso')

const isEdit = ref(false)
const course = ref({})

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const filterTableData = computed(() =>
  courses.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.file_number.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleView = (row) => {
  router.push(`/curso/${row.id}`)
}
const handleNewCourse = () => {
  isEdit.value = false
  formTitle.value = 'Nuevo curso'
  dialogFormVisible.value = true
  course.value = {}
}
const handleEdit = (row) => {
  isEdit.value = true
  formTitle.value = 'Editar curso'
  course.value = row
  dialogFormVisible.value = true
}
const handleDelete = (row) => {
  coursesStore.removeCourse(row.id)
  document.activeElement.blur()
}
</script>

<template>
  <div class="header">
    <h1>Cursos</h1>
    <div>
      <el-button tabindex="0" @click="handleNewCourse">+ Nuevo curso</el-button>
      <el-button tabindex="0">+ Gestionar plantillas</el-button>
    </div>
  </div>
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'id', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="title" label="Curso" sortable width="360">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.title"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.title }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="date_init" label="F. inicio" sortable width="140">
      <template #default="scope">
        <div>{{ moment(scope.row.date_init).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="date_end" label="F. finalización" sortable width="140">
      <template #default="scope">
        <div>{{ moment(scope.row.date_end).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="file_number" label="Num. expediente" sortable width="160" />
    <el-table-column prop="credits" label="Créditos" sortable width="120"></el-table-column>
    <el-table-column prop="certificate_thumbnail" label="Imagen" width="160">
      <template #default="scope">
        <img :src="scope.row.certificate_thumbnail" width="100" />
      </template>
    </el-table-column>
    <el-table-column align="right" width="240">
      <template #header>
        <el-input
          :prefix-icon="Search"
          clearable
          placeholder="Buscar..."
          size="small"
          v-model="search"
        />
      </template>
      <template #default="scope">
        <div class="buttons">
          <el-button
            size="small"
            @click="handleView(scope.row)"
            @keyup.space="handleView(scope.row)"
            tabindex="0"
            >Ver</el-button
          >
          <el-button
            size="small"
            @click="handleEdit(scope.row)"
            @keyup.space="handleEdit(scope.row)"
            tabindex="0"
            >Editar</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            @keyup.space="handleDelete(scope.row)"
            tabindex="0"
            >Borrar</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
  <CourseForm
    @changeFormVisibility="changeFormVisibility"
    :title="formTitle"
    :isEdit="isEdit"
    :course="course"
    :dialogFormVisible="dialogFormVisible"
  />
</template>

<style>
.buttons {
  padding: 0.5rem 0;
}
.ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
}
</style>
