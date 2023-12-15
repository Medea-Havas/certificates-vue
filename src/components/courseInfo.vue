<script setup>
import moment from 'moment'

const props = defineProps({
  course: Object
})
</script>

<template>
  <div class="cols">
    <div class="left-col">
      <div class="info">
        <p>
          <span>Duración: </span>{{ moment(props.course.date_init).format('DD[/]MM[/]YYYY') }} -
          {{ moment(props.course.date_end).format('DD[/]MM[/]YYYY') }} ({{
            moment
              .duration(moment(props.course.date_end).diff(moment(props.course.date_init)))
              .asDays()
              .toFixed(0)
          }}
          días)
        </p>
      </div>
      <div class="info">
        <p><span>Número de créditos: </span>{{ props.course.credits }}</p>
      </div>
      <div class="info">
        <p><span>Entidad acreditadora: </span>{{ props.course.accrediting_entity || '-' }}</p>
      </div>
      <div class="info">
        <p>
          <span>Fecha de creación: </span
          >{{ moment(props.course.date_created).format('DD[/]MM[/]YYYY') }}
        </p>
      </div>
      <div class="info">
        <p><span>Ciudad: </span>{{ props.course.city || '-' }}</p>
      </div>
      <div class="info">
        <div class="info-content">
          <p><span>Contenidos: </span></p>
          {{ props.course.content || '-' }}
        </div>
      </div>
    </div>
    <div class="right-col">
      <div class="info">
        <p><span>Tutor: </span>{{ props.course.tutors || '-' }}</p>
      </div>
      <div class="info">
        <p><span>Horas: </span>{{ props.course.hours || '' }}</p>
      </div>
      <div class="info">
        <p><span>Número de expediente: </span>{{ props.course.file_number }}</p>
      </div>
      <div class="info">
        <p><span>Acreditado por: </span>{{ props.course.accredited_by || '-' }}</p>
      </div>
      <div class="info">
        <p>
          <span>Plantilla "{{ props.course.template }}": </span>
        </p>
        <div v-if="props.course.coords">
          <div v-for="(coords, index) in props.course.coords.split('*')" :key="index">
            <p v-if="index == 0" class="highlighted titles">-- Primera página --</p>
            <p v-if="index == 0" class="titles">* Nombre *</p>
            <p v-if="index == 1" class="titles">* Nº de expediente *</p>
            <p v-if="index == 2" class="titles">* Fecha *</p>
            <p v-if="index == 3" class="titles">* Créditos *</p>
            <p v-if="index == 4" class="highlighted titles">-- Segunda página --</p>
            <p v-if="index == 4" class="titles">* Nombre *</p>
            <p v-if="index == 5" class="titles">* NIF *</p>
            <p v-if="index == 6" class="titles">* Nº de expediente *</p>
            <p v-if="index == 7" class="titles">* Créditos *</p>
            <p v-if="index == 8" class="titles">* Horas *</p>
            <p v-if="index == 9" class="highlithed titles">-- Código QR --</p>
            <p v-if="index == 9" class="titles">* QR *</p>
            <p>
              Top: {{ coords.split(',')[0] }} | Left: {{ coords.split(',')[1] }} | Width:
              {{ coords.split(',')[2] }} | Font Size: {{ coords.split(',')[3] }}
            </p>
          </div>
        </div>
      </div>
      <div class="info">
        <p>
          <span>Fecha de actualización: </span
          >{{
            props.course.date_modified
              ? moment(props.course.date_modified).format('DD[/]MM[/]YYYY')
              : '-'
          }}
        </p>
      </div>
    </div>
    <div class="info-images">
      <div class="info-image thumb">
        <p><span>Miniatura del certificado:</span></p>
        <img :src="`${props.course.certificate_thumbnail}`" alt="" />
      </div>
      <div class="info-image">
        <p><span>Imagen del certificado:</span></p>
        <img :src="`${props.course.certificate_image}`" alt="" />
      </div>
      <div class="info-image">
        <p><span>2ª imagen del certificado:</span></p>
        <img
          v-if="props.course.certificate_image2"
          :src="`${props.course.certificate_image2}`"
          alt=""
        />
        <p v-if="!props.course.certificate_image2">-</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-col,
.right-col {
  width: 100%;
}
.cols {
  display: flex;
  flex-wrap: wrap;
  gap: 0 2rem;
}
.cols p {
  font-size: var(--reg);
}
.cols p span {
  font-weight: bold;
}
.highlighted {
  font-weight: 500;
  margin: 0.75rem 0;
}
.info {
  margin-bottom: 0.5rem;
}
.info-content {
  white-space: pre-wrap;
}
.info-image {
  margin: 1rem 0 1.5rem;
}
.info-image img {
  max-width: 64rem;
  width: 100%;
}
.info-image.thumb img {
  max-width: 32rem;
  width: 100%;
}
.info-images {
  margin-top: 1rem;
}
.titles {
  margin: 0.25rem;
}
@media screen and (min-width: 1048px) {
  .left-col,
  .right-col {
    width: calc(50% - 2rem);
  }
}
</style>
