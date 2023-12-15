<script setup>
import { ref, computed, reactive } from 'vue'
import { useStudentsStore } from '@/stores/students'

const studentsStore = useStudentsStore()

const props = defineProps({
  dialogFormVisible: Boolean,
  formTitle: String,
  isEdit: Boolean,
  student: Object
})
const emit = defineEmits(['changeFormVisibility'])

const ruleFormRef = ref()

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const form = reactive({})
const rules = reactive({
  name: [{ required: true, message: 'Nombre necesario', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Apellidos necesarios', trigger: 'blur' }],
  email: [{ required: true, message: 'Email necesario', trigger: 'blur' }],
  nif: [{ required: true, message: 'NIF necesario', trigger: 'blur' }]
})

if (props.isEdit) {
  form.id = props.student.id
  form.name = props.student.name
  form.last_name = props.student.last_name
  form.email = props.student.email
  form.nif = props.student.nif
} else {
  form.id = ''
  form.name = ''
  form.last_name = ''
  form.email = ''
  form.nif = ''
}

const handleSubmitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (props.isEdit) {
        studentsStore.updateStudent(form, props.student.id)
      } else {
        studentsStore.addStudent(form)
      }
      emit('changeFormVisibility', false)
    }
  })
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}
</script>

<template>
  <el-dialog v-model="isVisible" :title="formTitle">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item label="Nombre" prop="name" required>
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Apellidos" prop="last_name" required>
        <el-input v-model="form.last_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" prop="email" required>
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="NIF" prop="nif" required>
        <el-input v-model="form.nif" autocomplete="off" />
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
