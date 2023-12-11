<template>
  <div class="header">
    <h3>Cursos matriculado</h3>
    <div>
      <el-button tabindex="0" @click="handleNewEnroll">Matricular en curso</el-button>
    </div>
  </div>
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'id', order: 'descending' }"
    empty-text="No hay cursos. ¡Matricula alguno!"
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
    <el-table-column prop="date_completed" label="Completado" sortable width="130">
      <template #default="scope">
        <div>{{ moment(scope.row.date_completed).format('DD[/]MM[/]YYYY') }}</div>
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
          <el-popconfirm
            @confirm="handleUnregister(scope.row)"
            cancel-button-text="No, gracias"
            confirm-button-text="Sí"
            icon-color="red"
            title="DESMATRICULAR DE CURSO?"
            width="260"
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
  <EnrollCourseForm
    :coursesToEnroll="coursesNotFromUser"
    :dialogFormVisible="dialogFormVisible"
    :studentToUpdate="studentToUpdate"
    @changeFormVisibility="changeFormVisibility"
  />
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import moment from 'moment'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import EnrollCourseForm from '../components/enrollCourseForm.vue'
import { storeToRefs } from 'pinia'
import { useCoursesStore } from '../stores/courses'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { useRoute } from 'vue-router'

const route = useRoute()
const coursesStore = useCoursesStore()
const studentCoursesStore = useStudentCoursesStore()

const { coursesNotFromUser } = storeToRefs(coursesStore)

const props = defineProps({
  courses: Object,
  studentId: Number
})

onBeforeMount(async () => {
  await studentCoursesStore.getStudentCourses(route.params.id)
  await coursesStore.getCoursesToEnroll(route.params.id)
})

const search = ref('')
const dialogFormVisible = ref(false)
const studentToUpdate = ref()

const filterTableData = computed(() =>
  props.courses.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.file_number.toLowerCase().includes(search.value.toLowerCase())
  )
)

const changeFormVisibility = (visibility) => {
  dialogFormVisible.value = visibility
}

const handleView = (row) => {
  router.push(`/curso/${row.id}`)
}

const handleNewEnroll = () => {
  dialogFormVisible.value = true
}

const handleUnregister = async (row) => {
  await studentCoursesStore.removeStudentCourse(route.params.id, row.id)
  await coursesStore.getCoursesToEnroll(route.params.id)
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
