<script setup>
import { ref, computed, reactive } from 'vue'
import { useTemplatesStore } from '@/stores/templates'
import { useCoursesStore } from '@/stores/courses'
import { useStatsStore } from '@/stores/stats'

const templatesStore = useTemplatesStore()
const coursesStore = useCoursesStore()
const statsStore = useStatsStore()

const props = defineProps({
  formTitle: String,
  isEdit: Boolean,
  course: Object,
  dialogFormVisible: Boolean
})
const emit = defineEmits(['changeFormVisibility'])

const uploaded_images_path = `${import.meta.env.VITE_API_HOST}/assets/certificates/`
const thumb_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=thumbnail`
const image_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=image`
const image2_path = `${import.meta.env.VITE_API_HOST}/uploadimage?type=image2`

const isVisible = computed({
  get() {
    return props.dialogFormVisible
  },
  set(visibility) {
    emit('changeFormVisibility', visibility)
  }
})

const form = reactive({})

const cert_thumb = ref(null)
const cert_img = ref(null)
const cert_img2 = ref(null)
const imageFileList = ref([])
const image2FileList = ref([])
const imageIsWrong = ref(false)
const ruleFormRef = ref()
const templateIsWrong = ref(false)
const thumbFileList = ref([])
const thumbnailIsWrong = ref(false)
const headers = ref({ Token: 'Bearer ' + sessionStorage.getItem('token') })

if (props.isEdit) {
  form.id = props.course.id
  form.title = props.course.title
  form.tutors = props.course.tutors
  form.date_init = props.course.date_init
  form.date_end = props.course.date_end
  form.city = props.course.city
  form.hours = parseFloat(props.course.hours)
  form.credits = parseFloat(props.course.credits)
  form.file_number = props.course.file_number
  form.accredited_by = props.course.accredited_by
  form.accrediting_entity = props.course.accrediting_entity
  form.content = props.course.content
  form.template = props.course.template
  form.template_id = props.course.template_id
  form.certificate_thumbnail = props.course.certificate_thumbnail.replace(uploaded_images_path, '')
  form.certificate_image = props.course.certificate_image.replace(uploaded_images_path, '')
  form.certificate_image2 = props.course.certificate_image2.replace(uploaded_images_path, '')
  cert_thumb.value = props.course.certificate_thumbnail
  thumbFileList.value = [
    {
      name: props.course.certificate_thumbnail.replace(uploaded_images_path, ''),
      url: ''
    }
  ]
  imageFileList.value = [
    {
      name: props.course.certificate_image.replace(uploaded_images_path, ''),
      url: ''
    }
  ]
  image2FileList.value = [
    {
      name: props.course.certificate_image2.replace(uploaded_images_path, ''),
      url: ''
    }
  ]
  cert_img.value = props.course.certificate_image
  cert_img2.value = props.course.certificate_image2
} else {
  form.id = ''
  form.title = ''
  form.tutors = ''
  form.date_init = ''
  form.date_end = ''
  form.city = ''
  form.hours = 0
  form.credits = 0
  form.file_number = ''
  form.accredited_by = ''
  form.accrediting_entity = ''
  form.content = ''
  form.template_id = ''
  form.certificate_thumbnail = ''
  form.certificate_image = ''
  form.certificate_image2 = ''
  cert_thumb.value = ''
  cert_img.value = ''
  cert_img2.value = ''
}

const handleCertificateImg = (file) => {
  form.certificate_image = file.file_name
}

const handleCertificateImg2 = (file) => {
  form.certificate_image2 = file.file_name
}

const handleCertificateThumb = (file) => {
  form.certificate_thumbnail = file.file_name
}

const handleImageChange = () => {
  imageIsWrong.value = imageFileList.value.length == 0 ? true : false
}

const handleSubmitForm = async (formEl) => {
  if (!formEl) return
  handleTemplateChange()
  handleThumbnailChange()
  handleImageChange()
  await formEl.validate((valid) => {
    if (valid && !templateIsWrong.value && !thumbnailIsWrong.value && !imageIsWrong.value) {
      if (props.isEdit) {
        console.log('hey')
        coursesStore.updateCourse(form, props.course.id)
      } else {
        coursesStore.addCourse(form)
      }
      statsStore.getStats()
      emit('changeFormVisibility', false)
      cert_thumb.value.clearFiles()
      cert_img.value.clearFiles()
      cert_img2.value.clearFiles()
    }
  })
}

const handleTemplateChange = () => {
  templateIsWrong.value = form.template_id == '' ? true : false
  if (form.template_id != '') {
    console.log(form.template_id)
    form.template = templatesStore.templates.filter((data) => data.id == form.template_id)[0].title
  }
}

const handleThumbnailChange = () => {
  thumbnailIsWrong.value = thumbFileList.value.length == 0 ? true : false
}

const hideForm = () => {
  emit('changeFormVisibility', false)
}

const rules = reactive({
  title: [{ required: true, message: 'Título necesario', trigger: 'blur' }],
  date_init: [{ required: true, message: 'Fecha de inicio necesaria', trigger: 'change' }],
  date_end: [{ required: true, message: 'Fecha de final necesaria', trigger: 'change' }],
  credits: [{ required: true, message: 'Créditos necesarios', trigger: 'blur' }],
  file_number: [{ required: true, message: 'Número de expediente necesario', trigger: 'blur' }]
})
</script>

<template>
  <el-dialog v-model="isVisible" :title="formTitle">
    <el-form :model="form" :rules="rules" ref="ruleFormRef" require-asterisk-position="right">
      <el-form-item label="Título del curso" prop="title" required>
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Tutor(es)">
        <el-input v-model="form.tutors" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Fecha de inicio" prop="date_init" required>
        <el-date-picker
          v-model="form.date_init"
          format="DD-MM-YYYY"
          placeholder="Fecha de inicio"
          style="width: 100%"
          type="date"
          value-format="YYYY-MM-DD HH:mm"
        />
      </el-form-item>
      <el-form-item label="Fecha de fin" required prop="date_end">
        <el-date-picker
          v-model="form.date_end"
          format="DD-MM-YYYY"
          placeholder="Fecha de fin"
          style="width: 100%"
          type="date"
          value-format="YYYY-MM-DD HH:mm"
        />
      </el-form-item>
      <el-form-item label="Ciudad">
        <el-input v-model="form.city" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Horas">
        <el-input-number v-model="form.hours" :precision="2" :step="0.1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nº de créditos" prop="credits" required>
        <el-input-number v-model="form.credits" :precision="1" :step="0.1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nº de expediente" prop="file_number" required>
        <el-input v-model="form.file_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Acreditado por">
        <el-input v-model="form.accredited_by" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Entidad acreditadora">
        <el-input v-model="form.accrediting_entity" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Contenido" class="content">
        <el-input v-model="form.content" :rows="2" placeholder="Contenido" type="textarea" />
      </el-form-item>
      <el-form-item label="Plantilla" required>
        <el-select
          v-model="form.template_id"
          @change="handleTemplateChange()"
          :class="{ templateIsEmpty: templateIsWrong }"
          placeholder="Seleccionar plantilla"
        >
          <el-option
            v-for="(template, index) in templatesStore.templates"
            :key="index"
            :label="template.title"
            :value="template.id"
          />
        </el-select>
        <div :class="{ 'el-form-item__error': templateIsWrong, hidden: !templateIsWrong }">
          La plantilla es necesaria
        </div>
      </el-form-item>
      <el-form-item label="Miniatura del certificado" class="c_thumb width100" required>
        <el-upload
          v-model:file-list="thumbFileList"
          :action="thumb_path"
          :headers="headers"
          :class="{ thumbIsEmpty: thumbnailIsWrong }"
          :limit="1"
          :on-change="handleThumbnailChange"
          :on-success="handleCertificateThumb"
          name="certificate_thumbnail"
          ref="cert_thumb"
        >
          <el-button class="lightButton" size="small">Seleccionar archivo</el-button>
          <div :class="{ 'el-form-item__error': thumbnailIsWrong, hidden: !thumbnailIsWrong }">
            La miniatura es necesaria
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Imagen del certificado" class="c_image width100" required>
        <el-upload
          v-model:file-list="imageFileList"
          :action="image_path"
          :headers="headers"
          :class="{ imageIsEmpty: imageIsWrong }"
          :limit="1"
          :on-change="handleImageChange"
          :on-success="handleCertificateImg"
          name="certificate_image"
          ref="cert_img"
        >
          <el-button class="lightButton" size="small">Seleccionar archivo</el-button>
          <div :class="{ 'el-form-item__error': imageIsWrong, hidden: !imageIsWrong }">
            La imagen es necesaria
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="2ª imagen del certificado" class="c_image2 width100">
        <el-upload
          v-model:file-list="image2FileList"
          :action="image2_path"
          :headers="headers"
          :limit="1"
          :on-success="handleCertificateImg2"
          name="certificate_image2"
          ref="cert_img2"
        >
          <el-button class="lightButton" size="small">Seleccionar archivo</el-button>
        </el-upload>
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
.imageIsEmpty .el-upload,
.templateIsEmpty .select-trigger,
.thumbIsEmpty .el-upload {
  border-radius: 4px;
  box-shadow: 0 0 0 1px red;
  transition: 0.2s all ease-in;
}
</style>
