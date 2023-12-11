<template>
  <el-dialog v-model="isVisible" title="Importar y matricular alumnos">
    <el-form ref="ruleFormRef" require-asterisk-position="right">
      <el-form-item class="noFlex" label="Archivo Excel" required>
        <el-button @click="$refs.excelFile.click()"> Seleccionar archivo </el-button>
        <input type="file" name="excelFile" id="excelFile" ref="excelFile" @input="changedFile" />
        <p class="fileName">{{ fileName }}</p>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import readXlsxFile from 'read-excel-file'
import { ElMessage } from 'element-plus'

const route = useRoute()

const file = ref(null)
const fileName = ref('')
const warnMsg = ref(null)

const props = defineProps({
  dialogExcelFormVisible: Boolean
})
const emit = defineEmits(['changeExcelFormVisibility', 'updateCourseForm', 'updateStudentsForm'])

const isVisible = computed({
  get() {
    return props.dialogExcelFormVisible
  },
  set(visibility) {
    emit('changeExcelFormVisibility', visibility)
  }
})

const changedFile = (e) => {
  file.value = e.target.files[0]
  fileName.value = e.target.files[0].name
}
const hideForm = () => {
  emit('changeExcelFormVisibility', false)
  file.value = null
  fileName.value = null
}
const handleSubmitForm = () => {
  readXlsxFile(file.value).then((rows) => {
    let tempRows = []
    for (var i = 1; i < rows.length; i++) {
      let tempRow = {}
      tempRow.name = rows[i][0]
      tempRow.last_name = rows[i][1]
      tempRow.email = rows[i][2]
      tempRow.nif = rows[i][3]
      tempRow.course = route.params.id
      tempRows.push(tempRow)
    }
    createAndEnrollUsers(tempRows)
    file.value = null
    fileName.value = null
  })
}

async function createAndEnrollUsers(data) {
  await fetch(`${import.meta.env.VITE_API_HOST}/loadusers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json;charset=UTF-8' }
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status === 201) {
        if (res.error) {
          warnMsg.value = ElMessage({
            duration: 8000,
            showClose: true,
            message: `<p>Algunos usuarios ya existen, así que se saltan:</p><br><p>${res.messages.excluded}</p>`,
            type: 'warning',
            dangerouslyUseHTMLString: true
          })
        }
        emit('updateCourseForm')
        emit('updateStudentsForm')
        emit('changeExcelFormVisibility', false)
      }
    })
    .catch((error) => console.log(error))
}
</script>

<style scoped>
#excelFile {
  display: none;
}
.fileName {
  margin-left: 1rem;
}
.noFlex {
  display: block;
}
</style>
