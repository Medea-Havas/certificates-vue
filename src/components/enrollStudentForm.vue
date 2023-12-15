<script setup>
import { computed, reactive, ref } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useRoute } from 'vue-router'
import moment from 'moment'

const route = useRoute()

const coursesStore = useCoursesStore()

const props = defineProps({
  dialogFormVisible: Boolean,
  studentsToEnroll: Array
})
const emit = defineEmits(['changeFormVisibility', 'updateCourseForm'])

const ruleFormRef = ref()
const studentIsWrong = ref(false)

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const rules = reactive({
  date_completed: [{ required: true, message: 'Fecha de completado necesaria', trigger: 'change' }]
})

const form = reactive({
  userId: '',
  name: '',
  date_completed: ''
})

const handleCourseChange = (e) => {
  console.log(e)
  studentIsWrong.value = form.id == '' ? true : false
  const selectedUser = props.studentsToEnroll.filter((student) => student.id == form.userId)[0]
  form.name = `${selectedUser.name} ${selectedUser.last_name}`
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const handleSubmitForm = async (formEl) => {
  formEl.validate((valid) => {
    if (!(valid && !studentIsWrong.value)) return
  })
  handleCourseChange()
  const enrollData = {
    user_id: form.userId,
    course_id: route.params.id,
    date_completed: form.date_completed,
    date_created: moment()
  }
  await coursesStore.enrollInCourse(enrollData)
  emit('updateCourseForm')
  form.id = ''
  form.title = ''
  form.date_completed = ''
  emit('changeFormVisibility', false)
}
</script>

<template>
  <el-dialog v-model="isVisible" title="Matricular estudiante">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item label="Estudiante" required>
        <el-select
          v-model="form.userId"
          @change="handleCourseChange(e)"
          :class="{ studentIsEmpty: studentIsWrong }"
          placeholder="Seleccionar estudiante"
        >
          <el-option
            v-for="(student, index) in studentsToEnroll"
            :key="index"
            :label="`${student.name} ${student.last_name}`"
            :value="student.id"
          />
        </el-select>
        <div :class="{ 'el-form-item__error': studentIsWrong, hidden: !studentIsWrong }">
          El estudiante es necesario
        </div>
      </el-form-item>
      <el-form-item label="Fecha de examen completado" prop="date_completed" required>
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
