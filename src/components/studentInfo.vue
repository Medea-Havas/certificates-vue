<template>
  <div class="cols">
    <div class="left-col">
      <div class="info">
        <p><span>Nombre:</span> {{ props.student.name }} {{ props.student.last_name }}</p>
      </div>
      <div class="info">
        <p><span>Email:</span> {{ props.student.email }}</p>
      </div>
      <div class="info">
        <p><span>NIF:</span> {{ props.student.nif }}</p>
      </div>
    </div>
    <div class="right-col">
      <div class="info">
        <p>
          <span>Fecha de creación:</span>
          {{
            props.student.date_created
              ? moment(props.student.date_created).format('DD[/]MM[/]YYYY')
              : '-'
          }}
        </p>
      </div>
      <div class="info">
        <p>
          <span>Fecha de modificación:</span>
          {{
            props.student.date_modified
              ? moment(props.student.date_modified).format('DD[/]MM[/]YYYY')
              : '-'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
const props = defineProps({
  student: Object
})
</script>

<style scoped>
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
.left-col,
.right-col {
  width: 100%;
}
.info {
  margin-bottom: 0.5rem;
}
@media screen and (min-width: 1048px) {
  .left-col,
  .right-col {
    width: calc(50% - 2rem);
  }
}
</style>
