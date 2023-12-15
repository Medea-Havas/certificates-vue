<script setup>
import { ref, computed, reactive } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { useRoute } from 'vue-router'
import moment from 'moment'

const route = useRoute()

const props = defineProps({
  coursesToEnroll: Array,
  dialogFormVisible: Boolean
})
const emit = defineEmits(['changeFormVisibility'])
const studentCoursesStore = useStudentCoursesStore()

const rules = reactive({
  date_completed: [{ required: true, message: 'Fecha de completado necesaria', trigger: 'change' }]
})

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const coursesStore = useCoursesStore()

const form = reactive({
  id: '',
  title: '',
  date_completed: ''
})
const ruleFormRef = ref()
const courseIsWrong = ref(false)

const handleCourseChange = () => {
  courseIsWrong.value = form.id == '' ? true : false
  form.title = coursesStore.coursesNotFromUser.filter((course) => course.id == form.id)[0].title
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const handleSubmitForm = async (formEl) => {
  formEl.validate((valid) => {
    if (!(valid && !courseIsWrong.value)) return
  })
  handleCourseChange()
  const enrollData = {
    user_id: route.params.id,
    course_id: form.id,
    date_completed: form.date_completed,
    date_created: moment()
  }
  await coursesStore.enrollInCourse(enrollData)
  await studentCoursesStore.getStudentCourses(route.params.id)
  form.id = ''
  form.title = ''
  form.date_completed = ''
  emit('changeFormVisibility', false)
}
</script>

<template>
  <el-dialog v-model="isVisible" title="Matricular en curso">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item label="Curso" required>
        <el-select
          v-model="form.id"
          @change="handleCourseChange()"
          :class="{ courseIsEmpty: courseIsWrong }"
          placeholder="Seleccionar curso"
        >
          <el-option
            v-for="(course, index) in coursesToEnroll"
            :key="index"
            :label="`${course.title.substring(0, 60)} ${course.title.length >= 60 ? '...' : ''}`"
            :value="course.id"
          />
        </el-select>
        <div :class="{ 'el-form-item__error': courseIsWrong, hidden: !courseIsWrong }">
          El curso es necesario
        </div>
      </el-form-item>
      <el-form-item label="Fecha de examen completado" required prop="date_completed">
        <el-date-picker
          v-model="form.date_completed"
          format="DD-MM-YYYY"
          placeholder="Fecha de examen completado"
          style="width: 100%"
          type="date"
          value-format="YYYY-MM-DD HH:mm"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideForm">Cancelar</el-button>
        <el-button @click="handleSubmitForm(ruleFormRef)" type="primary">Aceptar</el-button>
      </span>
    </template>
  </el-dialog>
</template>
