<template>
  <div class="header">
    <h3>Alumnos matriculados</h3>
    <div>
      <el-button tabindex="0" @click="handleImport">Importar alumnos</el-button>
      <el-button tabindex="0" @click="handleNewEnroll">Matricular en curso</el-button>
    </div>
  </div>
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay alumnos. ¡Matricula alguno!"
    style="width: 100%"
  >
    <el-table-column prop="name" label="Nombre" sortable width="150">
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
    <el-table-column prop="last_name" label="Apellidos" sortable width="200">
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
    <el-table-column prop="email" label="Email" sortable width="200">
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
    <el-table-column prop="nif" label="NIF" sortable width="120">
      <template #default="scope">
        {{ scope.row.nif }}
      </template>
    </el-table-column>
    <el-table-column prop="date_completed" label="F. fin de examen" sortable width="160">
      <template #default="scope">
        {{ moment(scope.row.date_completed).format('DD[/]MM[/]YYYY') }}
      </template>
    </el-table-column>
    <el-table-column align="right" width="320">
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
            @click="handleCertificate(scope.row)"
            @keyup.space="handleCertificate(scope.row)"
            tabindex="0"
            >Certificado</el-button
          >
          <el-button
            size="small"
            @click="handleView(scope.row)"
            @keyup.space="handleView(scope.row)"
            tabindex="0"
            >Ver</el-button
          >
          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon-color="red"
            title="¿Desmatricular estudiante?"
            width="240"
            icon="WarningFilled"
          >
            <template #reference>
              <el-button size="small" type="danger" tabindex="0">Desmatricular</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <EnrollStudentForm
    :studentsToEnroll="usersNotFromCourse"
    :dialogFormVisible="dialogFormVisible"
    @changeFormVisibility="changeFormVisibility"
    @updateCourseForm="updateCourseForm"
  />
  <ImportForm
    :dialogExcelFormVisible="dialogExcelFormVisible"
    @changeExcelFormVisibility="changeExcelFormVisibility"
    @updateCourseForm="updateCourseForm"
    @updateStudentsForm="updateStudentsForm"
  />
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import EnrollStudentForm from '../components/enrollStudentForm.vue'
import ImportForm from '../components/importForm.vue'
import moment from 'moment'
import { Search } from '@element-plus/icons-vue'
import { useStudentsStore } from '@/stores/students'
import { useCourseStudentsStore } from '@/stores/courseStudents'
import router from '@/router'

const emit = defineEmits(['updateCourse', 'updateStudents'])

const studentsStore = useStudentsStore()
const courseStudents = useCourseStudentsStore()
const { usersNotFromCourse } = storeToRefs(studentsStore)

const props = defineProps({
  students: Object,
  courseId: Number
})

onBeforeMount(async () => {
  await studentsStore.getUsersToEnroll(props.courseId)
})

const search = ref('')
const dialogFormVisible = ref(false)
const dialogExcelFormVisible = ref(false)

const filterTableData = computed(() =>
  props.students.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.last_name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.email.toLowerCase().includes(search.value.toLowerCase()) ||
      data.nif.toLowerCase().includes(search.value.toLowerCase())
  )
)

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const changeExcelFormVisibility = (visibility) => {
  dialogExcelFormVisible.value = visibility
}

const handleCertificate = (data) => {
  const userId = data.id
  router.push(`/certificado/?userId=${userId}&courseId=${props.courseId}`)
}
const handleView = (row) => {
  router.push(`/alumno/${row.id}`)
}
const handleDelete = async (data) => {
  await courseStudents.removeCourseStudent(data.id, props.courseId)
  updateCourseForm()
}
const handleNewEnroll = () => {
  dialogFormVisible.value = true
}
const updateCourseForm = () => {
  emit('updateCourse')
}
const updateStudentsForm = () => {
  emit('updateStudents')
}
const handleImport = () => {
  dialogExcelFormVisible.value = true
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
