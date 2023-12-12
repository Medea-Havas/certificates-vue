<template>
  <div class="header">
    <h2>Alumnos</h2>
    <div>
      <el-button tabindex="0" @click="handleNewStudent">+ Nuevo alumno</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="pagination.filtered"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay alumnos. ¡Añade alguno!"
    style="width: 100%"
  >
    <el-table-column prop="name" label="Nombre" sortable width="180">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.name"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.name }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="last_name" label="Apellidos" sortable width="250">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.last_name"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.last_name }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="email" label="Email" sortable width="260">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.email"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.email }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="nif" label="NIF" sortable width="130">
      <template #default="scope">
        {{ scope.row.nif }}
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
            title="¿BORRAR ALUMNO?"
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
  >
  </el-pagination>
  <StudentForm
    v-if="dialogFormVisible"
    @changeFormVisibility="changeFormVisibility"
    :title="formTitle"
    :isEdit="isEdit"
    :student="student"
    :dialogFormVisible="dialogFormVisible"
  />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStudentsStore } from '@/stores/students'
import { storeToRefs } from 'pinia'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import StudentForm from '../components/studentForm.vue'

const studentsStore = useStudentsStore()
const { students, loading } = storeToRefs(studentsStore)

const search = ref('')
const isEdit = ref(false)
const student = ref({})
const dialogFormVisible = ref(false)
const formTitle = ref('Nuevo alumno')
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})

onMounted(() => {
  filterTableData()
})

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const filterTableData = () => {
  let filtered = students.value.filter(
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

watch(loading, () => {
  filterTableData()
})

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

const handleNewStudent = () => {
  isEdit.value = false
  formTitle.value = 'Nuevo alumno'
  dialogFormVisible.value = true
  student.value = {}
}

const handleView = (row) => {
  router.push(`/alumno/${row.id}`)
}
const handleEdit = (row) => {
  isEdit.value = true
  formTitle.value = 'Editar alumno'
  student.value = row
  dialogFormVisible.value = true
}
const handleDelete = (row) => {
  studentsStore.removeStudent(row.id)
}
</script>

<style scoped>
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
}
</style>
