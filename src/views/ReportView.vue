<template>
  <div className="sectionHeader">
    <h1>
      Secretaría técnica de programas de formación <br />
      médica continuada
    </h1>
  </div>
  <div class="container">
    <div class="content" v-if="error" style="text-align: center">Error. No hay datos.</div>
    <div class="content" v-if="!error">
      <div class="datafields">
        <h2>Curso</h2>
        <p>{{ data.title }}</p>
      </div>
      <div class="datafields">
        <h2>Acreditado por</h2>
        <p>{{ data.accredited_by }}</p>
      </div>
      <div class="datafields">
        <h2>Alumno</h2>
        <p>{{ data.name }} {{ data.last_name }}</p>
      </div>
      <div class="datafields">
        <h2>NIF</h2>
        <p>{{ data.nif }}</p>
      </div>
      <div class="datafields">
        <h2>Fecha de emisión</h2>
        <p>{{ moment(data.date_completed).format('L') }}</p>
      </div>
      <div class="datafields">
        <h2>Nº de expediente</h2>
        <p>{{ data.file_number }}</p>
      </div>
      <div class="datafields">
        <h2>Ciudad</h2>
        <p>{{ data.city }}</p>
      </div>
      <div class="datafields">
        <h2>Número de créditos</h2>
        <p>{{ data.credits }}</p>
      </div>
      <div class="datafields">
        <h2>Número de horas</h2>
        <p>{{ data.hours }}</p>
      </div>
      <div class="datafields">
        <h2>Duración</h2>
        <p>
          {{ moment(data.date_init).format('L') }} - {{ ' ' }}
          {{ moment(data.date_end).format('L') }}
        </p>
      </div>
      <div class="datafields">
        <h2>Tutor/es</h2>
        <p>{{ data.tutors }}</p>
      </div>
      <div class="datafields">
        <h2>Contenidos</h2>
        <p>{{ data.content }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import CryptoJS from 'crypto-js'
import { useRoute } from 'vue-router'
import moment from 'moment'

const route = useRoute()

const cvs = route.query.cvs
const decrypted = ref('')
const userId = ref('')
const courseId = ref('')
const data = ref('')
const error = ref(false)

onMounted(() => {
  decrypted.value = decryptWithAES(cvs)
  if (decrypted.value) {
    userId.value = decrypted.value.split('CVS')[0]
    courseId.value = decrypted.value.split('CVS')[1]
    fetch(`${import.meta.env.VITE_API_HOST}/report/${userId.value}/${courseId.value}`)
      .then((info) => info.json())
      .then((info) => {
        data.value = info
      })
  } else {
    error.value = true
  }
})

const decryptWithAES = (ciphertext) => {
  if (!ciphertext) {
    return null
  } else {
    const passphrase = 'integracion'
    const bytes = CryptoJS.AES.decrypt(ciphertext.replaceAll('-', '+'), passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  }
}
</script>
<style scoped>
h1 {
  color: var(--blue);
  font-size: var(--lg);
  line-height: 1.5;
  margin: 1rem 0 3rem;
  text-align: center;
}
h2 {
  font-weight: 500;
}
.content,
.sectionHeader {
  margin: 3rem auto;
}
.container {
  background: #efefef;
  flex-shrink: 0;
  padding: 2rem;
}
.content {
  max-width: 1200px;
}
.datafields {
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  color: var(--bluelowlight);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
}
.datafields:nth-child(even) {
  background: rgba(245, 250, 255, 0.6);
}
.datafields h2 {
  color: var(--blue);
  font-size: var(--xs);
  grid-column: 1;
  margin: 0;
  text-align: right;
  text-transform: uppercase;
}
.datafields p {
  align-items: center;
  display: flex;
  grid-column: 2/5;
  justify-content: center;
  padding: 0.5rem 0 0;
  width: 100%;
}
.logo {
  margin: 0 auto;
  width: 10rem;
}
.main {
  max-width: unset !important;
}
.sectionHeader {
  flex-shrink: 0;
  max-width: 1600px;
}
.sectionHeader h1 {
  color: var(--blue);
  font-size: var(--lg);
  line-height: 1.5;
  margin: 1rem 0 3rem;
  text-align: center;
}
.sectionHeader h1 br {
  display: none;
}
@media (min-width: 900px) {
  .datafields {
    align-items: start;
    background: none;
    border-radius: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
  .datafields:nth-child(even) {
    background: none;
  }
  .datafields p {
    background: white;
    border-radius: 0 10px 10px 0;
    justify-content: start;
    padding: 1rem 2rem;
    width: auto;
  }
  .datafields h2 {
    background: rgba(255, 255, 255, 0.4);
    color: inherit;
    padding: 1.25rem;
    border-radius: 10px 0 0 10px;
  }
}
@media (min-width: 400px) {
  .sectionHeader h1 br {
    display: block;
  }
}
</style>
