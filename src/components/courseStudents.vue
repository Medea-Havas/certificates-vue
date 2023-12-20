<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCourseStudentsStore } from '@/stores/courseStudents'
import { useStudentsStore } from '@/stores/students'
import { Search } from '@element-plus/icons-vue'
import EnrollStudentForm from '../components/enrollStudentForm.vue'
import ImportForm from '../components/importForm.vue'
import moment from 'moment'
import router from '@/router'

const studentsStore = useStudentsStore()
const courseStudents = useCourseStudentsStore()
const { usersNotFromCourse } = storeToRefs(studentsStore)

const props = defineProps({
  students: Object,
  courseId: Number,
  search: String,
  loading: Boolean
})
const emit = defineEmits(['updateStudents', 'handleSearch', 'updateCourseStudents'])

onBeforeMount(async () => {
  await studentsStore.getUsersToEnroll(props.courseId)
})

const searchInput = ref(props.search)
const dialogFormVisible = ref(false)
const dialogExcelFormVisible = ref(false)

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const changeExcelFormVisibility = (visibility) => {
  dialogExcelFormVisible.value = visibility
}

const filterTableData = () => {
  emit('handleSearch', searchInput.value)
}

const handleCertificate = (data) => {
  const userId = data.id
  router.push(`/certificado/?userId=${userId}&courseId=${props.courseId}`)
}

const handleDelete = async (data) => {
  await courseStudents.removeCourseStudent(data.id, props.courseId)
  updateCourseForm()
}

const handleImport = () => {
  dialogExcelFormVisible.value = true
}

const handleNewEnroll = () => {
  dialogFormVisible.value = true
}

const handleView = (row) => {
  router.push(`/alumno/${row.id}`)
}

const updateCourseForm = () => {
  emit('updateCourseStudents')
}

const updateStudentsForm = () => {
  emit('updateStudents')
}
</script>

<template>
  <div class="header">
    <h3>Alumnos matriculados</h3>
    <div>
      <el-button @click="handleImport" tabindex="0">Importar alumnos</el-button>
      <el-button @click="handleNewEnroll" tabindex="0">Matricular en curso</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="students"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay alumnos. ¡Matricula alguno!"
    style="width: 100%"
  >
    <el-table-column label="Nombre" prop="name" sortable width="150">
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
    <el-table-column label="Apellidos" prop="last_name" sortable width="200">
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
    <el-table-column label="Email" prop="email" sortable width="200">
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
    <el-table-column label="NIF" prop="nif" sortable width="120">
      <template #default="scope">
        {{ scope.row.nif }}
      </template>
    </el-table-column>
    <el-table-column label="F. fin de examen" prop="date_completed" sortable width="160">
      <template #default="scope">
        {{ moment(scope.row.date_completed).format('DD[/]MM[/]YYYY') }}
      </template>
    </el-table-column>
    <el-table-column align="right" width="320">
      <template #header>
        <el-input
          @input="filterTableData"
          :prefix-icon="Search"
          clearable
          placeholder="Buscar..."
          size="small"
          v-model="searchInput"
        />
      </template>
      <template #default="scope">
        <div class="buttons">
          <el-button
            @click="handleCertificate(scope.row)"
            @keyup.space="handleCertificate(scope.row)"
            size="small"
            tabindex="0"
            >Certificado</el-button
          >
          <el-button
            @click="handleView(scope.row)"
            @keyup.space="handleView(scope.row)"
            size="small"
            tabindex="0"
            >Ver</el-button
          >
          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon="WarningFilled"
            icon-color="red"
            title="¿Desmatricular estudiante?"
            width="240"
          >
            <template #reference>
              <el-button size="small" tabindex="0" type="danger">Desmatricular</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <EnrollStudentForm
    v-if="usersNotFromCourse.length"
    @changeFormVisibility="changeFormVisibility"
    @updateCourseForm="updateCourseForm"
    :dialogFormVisible="dialogFormVisible"
    :studentsToEnroll="usersNotFromCourse"
  />
  <ImportForm
    @changeExcelFormVisibility="changeExcelFormVisibility"
    @updateCourseForm="updateCourseForm"
    @updateStudentsForm="updateStudentsForm"
    :dialogExcelFormVisible="dialogExcelFormVisible"
  />
</template>
