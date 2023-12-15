<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoursesStore } from '@/stores/courses'
import { useStatsStore } from '@/stores/stats'
import { Search } from '@element-plus/icons-vue'
import CourseForm from '../components/courseForm.vue'
import TemplateForm from '../components/templateForm.vue'
import router from '@/router'
import moment from 'moment'

const coursesStore = useCoursesStore()
const statsStore = useStatsStore()
const { courses, loading } = storeToRefs(coursesStore)

onMounted(() => {
  filterTableData()
})

const course = ref({})
const dialogFormVisible = ref(false)
const formTitle = ref('Nuevo curso')
const isEdit = ref(false)
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})
const search = ref('')
const templatesFormVisible = ref(false)

watch(loading, () => {
  filterTableData()
})

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

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

const handleDelete = async (row) => {
  await coursesStore.removeCourse(row.id)
  await statsStore.getStats()
  document.activeElement.blur()
}

const handleEdit = (row) => {
  isEdit.value = true
  formTitle.value = 'Editar curso'
  course.value = row
  dialogFormVisible.value = true
}

const handleNewCourse = () => {
  isEdit.value = false
  formTitle.value = 'Nuevo curso'
  dialogFormVisible.value = true
  course.value = {}
}

const handleSizeChange = () => {
  filterTableData()
}

const handleTemplates = () => {
  templatesFormVisible.value = true
}

const handleView = (row) => {
  router.push(`/curso/${row.id}`)
}
</script>

<template>
  <div class="header">
    <h2>Cursos</h2>
    <div>
      <el-button @click="handleNewCourse" tabindex="0">+ Nuevo curso</el-button>
      <el-button @click="handleTemplates" tabindex="0">+ Gestionar plantillas</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="pagination.filtered"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay cursos. ¡Añade alguno!"
    style="width: 100%"
  >
    <el-table-column label="Curso" prop="title" sortable width="300">
      <template #default="scope">
        <el-tooltip
          :content="scope.row.title"
          class="box-item"
          effect="dark"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.title }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="Iniciado" prop="date_init" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_init).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Finalizado" prop="date_end" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_end).format('DD[/]MM[/]YYYY') }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Expediente" prop="file_number" sortable width="160" />
    <el-table-column label="Créditos" prop="credits" sortable width="105"></el-table-column>
    <el-table-column label="Imagen" prop="certificate_thumbnail" width="160">
      <template #default="scope">
        <img :src="scope.row.certificate_thumbnail" width="100" />
      </template>
    </el-table-column>
    <el-table-column align="right" width="220">
      <template #header>
        <el-input
          v-model="search"
          @input="filterTableData"
          :prefix-icon="Search"
          clearable
          placeholder="Buscar..."
          size="small"
        />
      </template>
      <template #default="scope">
        <div class="buttons">
          <el-button
            @click="handleView(scope.row)"
            @keyup.space="handleView(scope.row)"
            size="small"
            tabindex="0"
            >Ver</el-button
          >
          <el-button
            @click="handleEdit(scope.row)"
            @keyup.space="handleEdit(scope.row)"
            size="small"
            tabindex="0"
            >Editar</el-button
          >
          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon="WarningFilled"
            icon-color="red"
            title="¿BORRAR EL CURSO?"
            width="200"
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
  <CourseForm
    v-if="dialogFormVisible"
    @changeFormVisibility="changeFormVisibility"
    :course="course"
    :dialogFormVisible="dialogFormVisible"
    :isEdit="isEdit"
    :title="formTitle"
  />
  <TemplateForm
    v-if="templatesFormVisible"
    @changeTemplatesFormVisibility="changeTemplatesFormVisibility"
    :templatesFormVisible="templatesFormVisible"
    title="Plantillas"
  />
</template>
