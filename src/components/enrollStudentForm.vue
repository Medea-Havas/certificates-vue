<template>
  <el-dialog v-model="isVisible" title="Matricular estudiante">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item label="Estudiante" required>
        <el-select
          @change="handleCourseChange(e)"
          v-model="form.userId"
          placeholder="Seleccionar estudiante"
          :class="{ studentIsEmpty: studentIsWrong }"
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
      <el-form-item label="Fecha de examen completado" required prop="date_completed">
        <el-date-picker
          v-model="form.date_completed"
          type="date"
          format="DD-MM-YYYY"
          placeholder="Fecha de examen completado"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideForm">Cancelar</el-button>
        <el-button type="primary" @click="handleSubmitForm(ruleFormRef)">Aceptar</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useRoute } from 'vue-router'
import moment from 'moment'

const route = useRoute()

const props = defineProps({
  studentsToEnroll: Array,
  dialogFormVisible: Boolean
})
const emit = defineEmits(['changeFormVisibility', 'updateCourseForm'])
const coursesStore = useCoursesStore()

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

const form = reactive({
  userId: '',
  name: '',
  date_completed: ''
})
const ruleFormRef = ref()
const studentIsWrong = ref(false)

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

<style scoped>
.courseIsEmpty .select-trigger {
  border-radius: 4px;
  box-shadow: 0 0 0 1px red;
  transition: 0.2s all ease-in;
}
.el-form-item.content {
  width: 100%;
}
.el-select {
  width: 100%;
}
.hidden {
  display: none;
}
</style>
