<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStudentsStore } from '@/stores/students'
import { Search } from '@element-plus/icons-vue'
import StudentForm from '../components/studentForm.vue'
import router from '@/router'

const studentsStore = useStudentsStore()
const { students, loading } = storeToRefs(studentsStore)

onMounted(() => {
  filterTableData()
})

const dialogFormVisible = ref(false)
const formTitle = ref('Nuevo alumno')
const isEdit = ref(false)
const pagination = ref({
  filtered: [],
  page: 1,
  pageSize: 10,
  total: 0
})
const search = ref('')
const student = ref({})

watch(loading, () => {
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

const handleCurrentChange = (val) => {
  pagination.value.page = val
  filterTableData()
}

const handleDelete = (row) => {
  studentsStore.removeStudent(row.id)
}

const handleEdit = (row) => {
  isEdit.value = true
  formTitle.value = 'Editar alumno'
  student.value = row
  dialogFormVisible.value = true
}

const handleNewStudent = () => {
  isEdit.value = false
  formTitle.value = 'Nuevo alumno'
  dialogFormVisible.value = true
  student.value = {}
}

const handleSizeChange = () => {
  filterTableData()
}

const handleView = (row) => {
  router.push(`/alumno/${row.id}`)
}
</script>

<template>
  <div class="header">
    <h2>Alumnos</h2>
    <div>
      <el-button @click="handleNewStudent" tabindex="0">+ Nuevo alumno</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="pagination.filtered"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay alumnos. ¡Añade alguno!"
    style="width: 100%"
  >
    <el-table-column label="Nombre" prop="name" sortable width="180">
      <template #default="scope">
        <el-tooltip
          :content="scope.row.name"
          class="box-item"
          effect="dark"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.name }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="Apellidos" prop="last_name" sortable width="250">
      <template #default="scope">
        <el-tooltip
          :content="scope.row.last_name"
          class="box-item"
          effect="dark"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.last_name }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="Email" prop="email" sortable width="260">
      <template #default="scope">
        <el-tooltip
          :content="scope.row.email"
          class="box-item"
          effect="dark"
          placement="top-start"
          trigger="click"
        >
          <span class="ellipsis">{{ scope.row.email }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="NIF" prop="nif" sortable width="130">
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
            title="¿BORRAR ALUMNO?"
            width="200"
          >
            <template #reference>
              <el-button size="small" tabindex="0" type="danger">Borrar</el-button>
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
  >
  </el-pagination>
  <StudentForm
    v-if="dialogFormVisible"
    @changeFormVisibility="changeFormVisibility"
    :dialogFormVisible="dialogFormVisible"
    :isEdit="isEdit"
    :student="student"
    :title="formTitle"
  />
</template>
