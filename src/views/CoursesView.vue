<template>
  <div class="header">
    <h2>Cursos</h2>
    <div>
      <el-button tabindex="0" @click="handleNewCourse">+ Nuevo curso</el-button>
      <el-button tabindex="0" @click="handleTemplates">+ Gestionar plantillas</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="pagination.filtered"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay cursos. ¡Añade alguno!"
    style="width: 100%"
  >
    <el-table-column prop="title" label="Curso" sortable width="300">
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
    <el-table-column prop="date_init" label="Iniciado" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_init).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="date_end" label="Finalizado" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_end).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="file_number" label="Expediente" sortable width="160" />
    <el-table-column prop="credits" label="Créditos" sortable width="105"></el-table-column>
    <el-table-column prop="certificate_thumbnail" label="Imagen" width="160">
      <template #default="scope">
        <img :src="scope.row.certificate_thumbnail" width="100" />
      </template>
    </el-table-column>
    <el-table-column align="right" width="220">
      <template #header>
        <el-input
          @input="filterTableData"
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
          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon-color="red"
            title="¿BORRAR EL CURSO?"
            width="200"
            icon="WarningFilled"
          >
            <template #reference>
              <el-button size="small" type="danger" tabindex="0">Borrar</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
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
  <CourseForm
    v-if="dialogFormVisible"
    @changeFormVisibility="changeFormVisibility"
    :title="formTitle"
    :isEdit="isEdit"
    :course="course"
    :dialogFormVisible="dialogFormVisible"
  />
  <TemplateForm
    v-if="templatesFormVisible"
    @changeTemplatesFormVisibility="changeTemplatesFormVisibility"
    :templatesFormVisible="templatesFormVisible"
    title="Plantillas"
  />
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useStatsStore } from '@/stores/stats'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import moment from 'moment'
import CourseForm from '../components/courseForm.vue'
import TemplateForm from '../components/templateForm.vue'
import { storeToRefs } from 'pinia'

const coursesStore = useCoursesStore()
const { courses, loading } = storeToRefs(coursesStore)
const statsStore = useStatsStore()

const search = ref('')
const dialogFormVisible = ref(false)
const templatesFormVisible = ref(false)
const formTitle = ref('Nuevo curso')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})

const isEdit = ref(false)
const course = ref({})

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const changeTemplatesFormVisibility = (visibility) => {
  templatesFormVisible.value = visibility
}

const filterTableData = () => {
  let filtered = courses.value.filter(
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

const handleSizeChange = () => {
  filterTableData()
}

watch(loading, () => {
  filterTableData()
})

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

const handleView = (row) => {
  router.push(`/curso/${row.id}`)
}
const handleNewCourse = () => {
  isEdit.value = false
  formTitle.value = 'Nuevo curso'
  dialogFormVisible.value = true
  course.value = {}
}

const handleTemplates = () => {
  templatesFormVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  formTitle.value = 'Editar curso'
  course.value = row
  dialogFormVisible.value = true
}
const handleDelete = async (row) => {
  await coursesStore.removeCourse(row.id)
  await statsStore.getStats()
  document.activeElement.blur()
}

onMounted(() => {
  filterTableData()
})
</script>

<style scoped></style>
