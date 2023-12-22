<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import readXlsxFile from 'read-excel-file'

const route = useRoute()

const props = defineProps({
  dialogExcelFormVisible: Boolean
})
const emit = defineEmits(['changeExcelFormVisibility', 'updateCourseForm', 'updateStudentsForm'])

const file = ref(null)
const fileName = ref('')
const warnMsg = ref(null)

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

const createAndEnrollUsers = async (data) => {
  await fetch(`${import.meta.env.VITE_API_HOST}/loadusers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Token: 'Bearer ' + sessionStorage.getItem('token')
    }
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
      tempRow.completed = rows[i][4]
      tempRow.course = route.params.id
      tempRows.push(tempRow)
    }
    createAndEnrollUsers(tempRows)
    file.value = null
    fileName.value = null
  })
}
</script>

<template>
  <el-dialog v-model="isVisible" title="Importar y matricular alumnos">
    <el-form ref="ruleFormRef" require-asterisk-position="right">
      <el-form-item label="Archivo Excel" class="noFlex" required>
        <el-button @click="$refs.excelFile.click()"> Seleccionar archivo </el-button>
        <input ref="excelFile" @input="changedFile" id="excelFile" name="excelFile" type="file" />
        <p class="fileName">{{ fileName }}</p>
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
