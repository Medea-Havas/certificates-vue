<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import CryptoJS from 'crypto-js'
import html2pdf from 'html2pdf.js'
import moment from 'moment'
import router from '@/router'

moment.updateLocale('es', {
  months: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]
})

const route = useRoute()

const studentStore = useStudentStore()
const { studentCourse } = storeToRefs(studentStore)

onBeforeMount(async () => {
  await studentStore.getStudentCourse(route.query.userId, route.query.courseId)
  cvs.value = encryptWithAES(route.query.userId + 'CVS' + route.query.courseId).replaceAll('+', '-')
  toDataURL(
    `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${window.location.origin}/informe?cvs=${cvs.value}&choe=UTF-8`,
    function (base64qr) {
      qr.value = base64qr
    }
  )
  loaded.value = true
})

const cvs = ref('')
const loaded = ref(false)
const qr = ref('')
const visibleCoords = ref([])

const encryptWithAES = (text) => {
  const passphrase = 'integracion'
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}

const exportToPDF = () => {
  var docToExport = document.getElementById('element-to-convert')
  var opt = {
    margin: 0,
    filename: 'certificado.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'A4', orientation: 'landscape', width: 297, height: 210 }
  }

  html2pdf().set(opt).from(docToExport).save()
}

const exportToPDF2 = () => {
  var docToExport = document.getElementById('element-to-convert2')
  var opt = {
    margin: 0,
    filename: 'certificado-detalles.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait', width: 210, height: 297 }
  }

  html2pdf().set(opt).from(docToExport).save()
}

const toDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

const viewReport = () => {
  router.push(`/informe?cvs=${cvs.value}`)
}
</script>

<template>
  <h2>Certificado</h2>
  <div class="buttons">
    <el-button @click="exportToPDF">Exportar certificado</el-button>
    <el-button v-if="studentCourse.certificate_image2" @click="exportToPDF2"
      >Exportar detalles</el-button
    >
    <el-button @click="viewReport">Ver informe</el-button>
  </div>
  <el-collapse v-if="studentCourse.coords" v-model="visibleCoords" class="accordion">
    <el-collapse-item name="1" title="Coordenadas">
      <div v-for="(coords, index) in studentCourse.coords.split('*')" :key="index">
        <p v-if="index == 0">-- Primera página --</p>
        <p v-if="index == 0">* Nombre *</p>
        <p v-if="index == 1">* Nº de expediente *</p>
        <p v-if="index == 2">* Fecha *</p>
        <p v-if="index == 3">* Créditos *</p>
        <p v-if="index == 4"><br />-- Segunda página --</p>
        <p v-if="index == 4">* Nombre 2 *</p>
        <p v-if="index == 5">* NIF *</p>
        <p v-if="index == 6">* Nº de expediente *</p>
        <p v-if="index == 7">* Créditos *</p>
        <p v-if="index == 8">* Horas *</p>
        <p v-if="index == 9"><br />-- Código QR --</p>
        <p v-if="index == 9">* QR *</p>
        <p>
          Top: {{ coords.split(',')[0] }}% | Left: {{ coords.split(',')[1] }}% | Width:
          {{ coords.split(',')[2] }}% | Font Size: {{ coords.split(',')[3] }}px
        </p>
      </div>
    </el-collapse-item>
  </el-collapse>
  <div v-if="loaded" id="element-to-convert">
    <div class="certificate">
      <img
        :src="qr"
        :style="{
          top: studentCourse.coords.split('*')[9].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[9].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[9].split(',')[2] + '%'
        }"
        class="qr"
        alt=""
      />
      <img :src="`${studentCourse.certificate_image}`" alt="" class="certImg" />
      <p
        :style="{
          top: studentCourse.coords.split('*')[0].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[0].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[0].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[0].split(',')[3] + 'px'
        }"
        class="name"
      >
        {{ studentCourse.name }} {{ studentCourse.last_name }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[1].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[1].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[1].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[1].split(',')[3] + 'px'
        }"
        class="fileNumber"
      >
        {{ studentCourse.file_number }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[2].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[2].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[2].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[2].split(',')[3] + 'px'
        }"
        class="dateToday"
      >
        {{ moment().format('DD [de] MMMM [del] YYYY') }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[3].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[3].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[3].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[3].split(',')[3] + 'px'
        }"
        class="credits"
      >
        {{ studentCourse.credits }}
      </p>
    </div>
  </div>
  <div v-if="loaded && studentCourse.certificate_image2" id="element-to-convert2">
    <div class="certificate">
      <img :src="`${studentCourse.certificate_image2}`" alt="" class="certImg2" />
      <p
        :style="{
          top: studentCourse.coords.split('*')[4].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[4].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[4].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[4].split(',')[3] + 'px'
        }"
        class="name2"
      >
        {{ studentCourse.name }} {{ studentCourse.last_name }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[5].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[5].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[5].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[5].split(',')[3] + 'px'
        }"
        class="nif"
      >
        {{ studentCourse.nif }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[6].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[6].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[6].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[6].split(',')[3] + 'px'
        }"
        class="fileNumber2"
      >
        {{ studentCourse.file_number }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[7].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[7].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[7].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[7].split(',')[3] + 'px'
        }"
        class="credits2"
      >
        {{ studentCourse.credits }}
      </p>
      <p
        :style="{
          top: studentCourse.coords.split('*')[8].split(',')[0] + '%',
          left: studentCourse.coords.split('*')[8].split(',')[1] + '%',
          width: studentCourse.coords.split('*')[8].split(',')[2] + '%',
          fontSize: studentCourse.coords.split('*')[8].split(',')[3] + 'px'
        }"
        class="hours"
      >
        {{ studentCourse.hours }}
      </p>
    </div>
  </div>
  <!-- <div v-if="loaded" id="element-to-convert">
    <div class="certificate">
      <img :src="qr" alt="" class="qr"  />
      <img :src="`${studentCourse.certificate_image}`" alt="" class="certImg" />
      <p class="name">{{ studentCourse.name }} {{ studentCourse.last_name }}</p>
      <p class="fileNumber">{{ studentCourse.file_number }}</p>
      <p class="credits">{{ studentCourse.credits }}</p>
      <p class="dateToday">
        {{ moment().format('DD [de] MMMM [del] YYYY') }}
      </p>
    </div>
  </div>
  <div v-if="loaded && studentCourse.certificate_image2" id="element-to-convert2">
    <div class="certificate">
      <img :src="`${studentCourse.certificate_image2}`" alt="" class="certImg2" />
      <p class="name2">{{ studentCourse.name }} {{ studentCourse.last_name }}</p>
      <p class="nif">{{ studentCourse.nif }}</p>
      <p class="fileNumber2">{{ studentCourse.file_number }}</p>
      <p class="credits2">{{ studentCourse.credits }}</p>
      <p class="hours">{{ studentCourse.hours }}</p>
    </div>
  </div> -->
</template>

<style scoped>
.credits,
.credits2,
.dateToday,
.fileNumber,
.fileNumber2,
.hours,
.name,
.name2,
.nif,
.qr {
  position: absolute;
}
.accordion {
  margin-bottom: 2rem;
}
.buttons {
  margin: 2rem 0;
}
.certificate {
  position: relative;
}
.certImg {
  max-width: 1754px;
  width: 99.2%;
}
.certImg2 {
  max-width: 1240px;
  width: 99.2%;
}
/* .credits,
.credits2,
.dateToday,
.fileNumber,
.hours,
.name,
.name2,
.nif {
  font-size: 15px;
}
.credits {
  left: 0%;
  top: 0%;
  width: 0%;
}
.credits2 {
  left: 69%;
  top: 20.2%;
  width: 7%;
}
.dateToday {
  left: 15%;
  top: 60.2%;
  width: 22%;
}
.fileNumber {
  left: 0%;
  top: 0%;
  width: 0%;
}
.fileNumber2 {
  left: 13.5%;
  top: 20.2%;
  width: 16.5%;
}
.hours {
  left: 23%;
  top: 25%;
  width: 3%;
}
.name {
  left: 22%;
  top: 38.3%;
  width: 60%;
}
.name2 {
  left: 22%;
  top: 13%;
  width: 60%;
}
.nif {
  left: 23%;
  top: 15.5%;
  width: 30%;
}
.qr {
  left: 7.4%;
  top: 4.7%;
  width: 10%;
} */
</style>
