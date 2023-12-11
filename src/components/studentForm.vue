<template>
  <el-dialog v-model="isVisible" :title="formTitle">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
      <el-form-item label="Nombre" required prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Apellidos" required prop="last_name">
        <el-input v-model="form.last_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" required prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="NIF" required prop="nif">
        <el-input v-model="form.nif" autocomplete="off" />
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
import { useStudentsStore } from '@/stores/students'

const props = defineProps({
  formTitle: String,
  isEdit: Boolean,
  student: Object,
  dialogFormVisible: Boolean
})
const emit = defineEmits(['changeFormVisibility'])

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const studentsStore = useStudentsStore()

const form = reactive({})
const ruleFormRef = ref()

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

const rules = reactive({
  name: [{ required: true, message: 'Nombre necesario', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Apellidos necesarios', trigger: 'blur' }],
  email: [{ required: true, message: 'Email necesario', trigger: 'blur' }],
  nif: [{ required: true, message: 'NIF necesario', trigger: 'blur' }]
})

const hideForm = () => {
  emit('changeFormVisibility', false)
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
</script>
