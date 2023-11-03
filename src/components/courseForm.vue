<script setup>
import { ref, computed } from 'vue'
import { useTemplatesStore } from '@/stores/templates'
import { useCoursesStore } from '@/stores/courses'

const props = defineProps({
  formTitle: String,
  isEdit: Boolean,
  course: Object,
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

const templatesStore = useTemplatesStore()
const coursesStore = useCoursesStore()

const thumb_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=thumbnail`
const image_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=image`
const image2_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=image2`

const form = ref({
  title: '',
  tutors: '',
  date_init: '',
  date_end: '',
  city: '',
  hours: 0,
  credits: 0,
  file_number: '',
  accredited_by: '',
  accrediting_entity: '',
  content: '',
  template_id: '',
  certificate_thumbnail: '',
  certificate_image: '',
  certificate_image2: ''
})

if (props.isEdit) {
  form.value.title = props.course.title
  form.value.tutors = props.course.tutors
  form.value.date_init = props.course.date_init
  form.value.date_end = props.course.date_end
  form.value.city = props.course.city
  form.value.hours = parseFloat(props.course.hours)
  form.value.credits = parseFloat(props.course.credits)
  form.value.file_number = props.course.file_number
  form.value.accredited_by = props.course.accredited_by
  form.value.accrediting_entity = props.course.accrediting_entity
  form.value.content = props.course.content
  form.value.template_id = parseInt(props.course.template_id)
  form.value.certificate_thumbnail = props.course.certificate_thumbnail
  form.value.certificate_image = props.course.certificate_image
  form.value.certificate_image2 = props.course.certificate_image2
}

const handleCertificateThumb = (file) => {
  form.value.certificate_thumbnail = file.file_name
}
const handleCertificateImg = (file) => {
  form.value.certificate_image = file.file_name
}
const handleCertificateImg2 = (file) => {
  form.value.certificate_image2 = file.file_name
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const handleSubmitForm = async () => {
  await coursesStore.addCourse(form.value)
  emit('changeFormVisibility', false)
}
</script>

<template>
  <el-dialog v-model="isVisible" :title="formTitle">
    {{ form }}
    <el-form :model="form" require-asterisk-position="right">
      <el-form-item label="Título del curso" required>
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Tutor(es)">
        <el-input v-model="form.tutors" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Fecha de inicio">
        <el-date-picker
          v-model="form.date_init"
          type="date"
          format="DD-MM-YYYY"
          placeholder="Fecha de inicio"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="Fecha de fin">
        <el-date-picker
          v-model="form.date_end"
          type="date"
          format="DD-MM-YYYY"
          placeholder="Fecha de fin"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="Ciudad">
        <el-input v-model="form.city" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Horas">
        <el-input-number v-model="form.hours" :precision="2" :step="0.1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nº de créditos" required>
        <el-input-number v-model="form.credits" :precision="1" :step="0.1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nº de expediente" required>
        <el-input v-model="form.file_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Acreditado por">
        <el-input v-model="form.accredited_by" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Entidad acreditadora">
        <el-input v-model="form.accrediting_entity" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Contenido" class="content">
        <el-input v-model="form.content" :rows="2" type="textarea" placeholder="Contenido" />
      </el-form-item>
      <el-form-item label="Plantilla" required>
        <el-select v-model="form.template_id" placeholder="Seleccionar plantilla">
          <el-option
            v-for="(template, index) in templatesStore.templates"
            :key="index"
            :label="template.title"
            :value="template.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Miniatura del certificado" class="width100" required>
        <el-upload
          name="certificate_thumbnail"
          :action="thumb_path"
          :limit="1"
          :on-success="handleCertificateThumb"
        >
          <el-button size="small" class="lightButton">Seleccionar archivo</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="Imagen del certificado" class="width100" required>
        <el-upload
          name="certificate_image"
          :action="image_path"
          :limit="1"
          :on-success="handleCertificateImg"
        >
          <el-button size="small" class="lightButton">Seleccionar archivo</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="2ª imagen del certificado" class="width100">
        <el-upload
          name="certificate_image2"
          :action="image2_path"
          :limit="1"
          :on-success="handleCertificateImg2"
        >
          <el-button size="small" class="lightButton">Seleccionar archivo</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideForm">Cancelar</el-button>
        <el-button type="primary" @click="handleSubmitForm(e)">Aceptar</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
.el-dialog {
  width: 40%;
}
.el-dialog__header {
  margin: 0;
  padding: 2rem 2rem 0.5rem;
}
.el-dialog__body {
  padding: 1rem 2rem;
}
.el-dialog__headerbtn {
  right: 0.75rem;
  top: 1.125rem;
}
.el-dialog__title {
  font-size: var(--med);
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1rem;
}
.el-form-item {
  justify-content: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  width: calc(50% - 0.5rem);
}
.el-form-item.content {
  width: 100%;
}
.el-select {
  width: 100%;
}
.lightButton {
  border: none;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}
body .lightButton:hover {
  border: 1px solid #cfcfcf;
}
.lightButton span {
  color: var(--el-text-color-regular);
}
.width100 * {
  width: 100%;
}
.el-form-item__content button span {
  display: inline-block;
  text-align: center;
}
.el-form-item__label {
  font-size: var(--sm);
  justify-content: flex-start;
  height: 26px;
}
.el-input-number {
  width: 100%;
}
</style>
