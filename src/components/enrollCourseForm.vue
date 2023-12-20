<script setup>
import { ref, computed, reactive } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useStudentCoursesStore } from '@/stores/studentCourses'
import { useRoute } from 'vue-router'
import moment from 'moment'

const route = useRoute()

const studentCoursesStore = useStudentCoursesStore()
const coursesStore = useCoursesStore()

const props = defineProps({
  coursesToEnroll: Array,
  dialogFormVisible: Boolean
})
const emit = defineEmits(['changeFormVisibility', 'updateStudentForm'])

const ruleFormRef = ref()
const courseIsWrong = ref(false)
const courseIds = ref({})
const courseList = ref([])
courseList.value = props.coursesToEnroll.map((element) => ({
  value: element.id,
  label: `${element.title}`
}))

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const form = reactive({
  date_completed: ''
})
const rules = reactive({
  date_completed: [{ required: true, message: 'Fecha de completado necesaria', trigger: 'change' }]
})

const handleCourseChange = () => {
  courseIsWrong.value = true
  if (!courseIds.value.length) return
  courseIsWrong.value = false
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const handleSubmitForm = async (formEl) => {
  formEl.validate((valid) => {
    handleCourseChange()
    if (!(valid && !courseIsWrong.value)) return
    courseIds.value.forEach((courseId) => {
      const enrollData = {
        user_id: route.params.id,
        course_id: courseId,
        date_completed: form.date_completed,
        date_created: moment()
      }
      coursesStore.enrollInCourse(enrollData)
    })
    emit('updateStudentForm')
    courseIds.value = {}
    form.date_completed = ''
    studentCoursesStore.getStudentCourses(route.params.id)
    emit('changeFormVisibility', false)
  })
}
</script>

<template>
  <el-dialog v-model="isVisible" title="Matricular en curso">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item :class="{ courseIsEmpty: courseIsWrong }" label="Curso" required>
        <el-select-v2
          v-model="courseIds"
          @change="handleCourseChange(e)"
          :options="courseList"
          filterable
          multiple
          placeholder="Seleccionar curso"
          style="width: 100%"
        />
        <!-- <el-select
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
        </el-select> -->
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
