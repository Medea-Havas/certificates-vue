<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoursesStore } from '../stores/courses'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import EnrollCourseForm from '../components/enrollCourseForm.vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import router from '@/router'

const route = useRoute()

const coursesStore = useCoursesStore()
const studentCoursesStore = useStudentCoursesStore()

const { coursesNotFromUser } = storeToRefs(coursesStore)

const props = defineProps({
  courses: Object,
  studentId: Number,
  search: String,
  loading: Boolean
})
const emit = defineEmits(['handleSearch', 'updateStudentCourses'])

onBeforeMount(async () => {
  await studentCoursesStore.getStudentCourses(route.params.id)
  await coursesStore.getCoursesToEnroll(route.params.id)
})

const searchInput = ref(props.search)
const dialogFormVisible = ref(false)
const studentToUpdate = ref()

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const filterTableData = () => {
  emit('handleSearch', searchInput.value)
}

const handleNewEnroll = () => {
  dialogFormVisible.value = true
}

const handleUnregister = async (row) => {
  await studentCoursesStore.removeStudentCourse(route.params.id, row.id)
  emit('updateStudentCourses')
  await coursesStore.getCoursesToEnroll(route.params.id)
}

const handleView = (row) => {
  router.push(`/curso/${row.id}`)
}

const updateStudentForm = () => {
  emit('updateStudentCourses')
}
</script>

<template>
  <div class="header">
    <h3>Cursos matriculado</h3>
    <div>
      <el-button @click="handleNewEnroll" tabindex="0">Matricular en curso</el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="courses"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay cursos. ¡Matricula alguno!"
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
    <el-table-column label="Completado" prop="date_completed" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_completed).format('DD[/]MM[/]YYYY') }}</div>
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
          v-model="searchInput"
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
          <el-popconfirm
            @confirm="handleUnregister(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon="WarningFilled"
            icon-color="red"
            title="DESMATRICULAR DE CURSO?"
            width="260"
          >
            <template #reference>
              <el-button size="small" tabindex="0" type="danger">Desmatricular</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <EnrollCourseForm
    v-if="coursesNotFromUser.length"
    @changeFormVisibility="changeFormVisibility"
    @updateStudentForm="updateStudentForm"
    :coursesToEnroll="coursesNotFromUser"
    :dialogFormVisible="dialogFormVisible"
    :studentToUpdate="studentToUpdate"
  />
</template>
