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
const userIds = ref({})
const studentList = ref([])
studentList.value = props.studentsToEnroll.map((element) => ({
  value: element.id,
  label: `${element.name} ${element.last_name}`
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
  studentIsWrong.value = true
  if (!userIds.value.length) return
  studentIsWrong.value = false
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const handleSubmitForm = async (formEl) => {
  formEl.validate((valid) => {
    handleCourseChange()
    if (!(valid && !studentIsWrong.value)) return
    userIds.value.forEach((userId) => {
      const enrollData = {
        user_id: userId,
        course_id: route.params.id,
        date_completed: form.date_completed,
        date_created: moment()
      }
      coursesStore.enrollInCourse(enrollData)
    })
    emit('updateCourseForm')
    userIds.value = {}
    form.date_completed = ''
    emit('changeFormVisibility', false)
  })
}
</script>

<template>
  <el-dialog v-model="isVisible" title="Matricular estudiante">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item :class="{ studentIsEmpty: studentIsWrong }" label="Estudiante" required>
        <el-select-v2
          v-model="userIds"
          @change="handleCourseChange(e)"
          :options="studentList"
          filterable
          multiple
          placeholder="Seleccionar estudiante"
          style="width: 100%"
        />
        <!-- <el-select
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
        </el-select> -->
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

<style>
.studentIsEmpty .el-select-v2__wrapper {
  border: 1px solid var(--el-color-danger) !important;
}
</style>
