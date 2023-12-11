<template>
  <el-dialog v-model="isVisible" :title="title">
    <el-collapse :accordion="openedAccordion">
      <el-collapse-item
        v-for="(template, index) in templatesStore.templates"
        class="isClosed"
        :key="index"
        :label="template.title"
        :value="template.id"
        :title="template.title"
        :name="index"
      >
        <el-form :model="template" require-asterisk-position="right">
          <el-form-item label="Coordenadas" required class="full-width">
            <el-input
              v-model="template.coords"
              :rows="2"
              type="textarea"
              placeholder="Introduce coordenadas"
            />
          </el-form-item>
          <div class="buttons">
            <el-popconfirm
              @confirm="handleRemove(template.id)"
              cancel-button-text="No, gracias"
              confirm-button-text="Sí"
              icon-color="red"
              title="¿BORRAR LA PLANTILLA?"
              width="250"
              icon="WarningFilled"
            >
              <template #reference>
                <el-button type="danger" tabindex="0">Borrar</el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" @click="handleUpdate(template)">Actualizar</el-button>
          </div>
        </el-form>
        <div v-for="(coords, index) in template.coords.split('*')" :key="index">
          <h3 v-if="index == 0">Primera página</h3>
          <h4 v-if="index == 0">Nombre</h4>
          <h4 v-if="index == 1">Nº de expediente</h4>
          <h4 v-if="index == 2">Fecha</h4>
          <h4 v-if="index == 3">Créditos</h4>
          <h3 v-if="index == 4">Segunda página</h3>
          <h4 v-if="index == 4">Nombre</h4>
          <h4 v-if="index == 5">NIF</h4>
          <h4 v-if="index == 6">Nº de expediente</h4>
          <h4 v-if="index == 7">Créditos</h4>
          <h4 v-if="index == 8">Horas</h4>
          <h3 v-if="index == 9">Código QR</h3>
          <h4 v-if="index == 9">QR</h4>
          <p>Top: {{ coords.split(',')[0] }}</p>
          <p>Left: {{ coords.split(',')[1] }}</p>
          <p>Width: {{ coords.split(',')[2] }}</p>
          <p>Font Size: {{ coords.split(',')[3] }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="innerVisible" width="10%" title="Nueva plantilla" class="innerDialog">
      <el-form :model="newForm" require-asterisk-position="right">
        <el-form-item label="Título" required class="full-width">
          <el-input v-model="newForm.title" placeholder="Introduce título" />
        </el-form-item>
        <el-form-item label="Coordenadas" required class="full-width">
          <el-input
            v-model="newForm.coords"
            :rows="2"
            type="textarea"
            placeholder="Introduce coordenadas"
          />
        </el-form-item>
        <div class="buttons">
          <el-button @click="innerVisible = false">Cerrar</el-button>
          <el-button type="primary" @click="handleCreate(newForm)">Crear</el-button>
        </div>
      </el-form>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="hideForm">Cancelar</el-button>
        <el-button type="primary" @click="innerVisible = true">Crear plantilla</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useTemplatesStore } from '@/stores/templates'
import { ElMessage } from 'element-plus'

const props = defineProps({
  title: String,
  templatesFormVisible: Boolean
})
const emit = defineEmits(['changeTemplatesFormVisibility'])

const templatesStore = useTemplatesStore()

const isVisible = computed({
  get() {
    return props.templatesFormVisible
  },
  set(visibility) {
    emit('changeTemplatesFormVisibility', visibility)
  }
})

const innerVisible = ref(false)
const newForm = reactive({
  title: '',
  coords: ''
})

const handleCreate = async (template) => {
  await templatesStore.addTemplate(template)
  await templatesStore.getTemplates()
  innerVisible.value = false
}

const handleRemove = async (templateId) => {
  await templatesStore.removeTemplate(templateId)
}

const openedAccordion = ref(false)

const handleUpdate = async (template) => {
  await templatesStore.updateTemplate(template)
  successMsg.value = ElMessage({
    showClose: true,
    message: `Plantilla "${template.title}" actualizada`,
    type: 'success'
  })
}

const hideForm = () => {
  emit('changeTemplatesFormVisibility', false)
}

const successMsg = ref(null)
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
h3 {
  margin-top: 1rem;
}
h4 {
  font-weight: bold;
  margin: 0.5rem 0 0.25rem;
}
.el-message {
  background: var(--steelbluelowlight);
}

.el-icon.el-message__icon.el-message-icon--success {
  color: white;
}
.el-message--success .el-message__content {
  color: white;
}
.full-width {
  width: 100%;
}
.innerDialog {
  top: 5rem;
  width: 30%;
}
</style>
