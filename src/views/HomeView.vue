<script setup>
import { useStatsStore } from '@/stores/stats'
import moment from 'moment'

const statsStore = useStatsStore()
</script>

<template>
  <div class="flexContainer">
    <div class="flexContainerStart">
      <div class="left">
        <h2>Total Cursos</h2>
        <p v-if="!statsStore.loading" class="totalNum">{{ statsStore.stats.totals[0].courses }}</p>
        <div class="lastCreated">
          <h3>Últimos cursos creados</h3>
          <div v-for="(course, index) in statsStore.stats.lastCourses" :key="index">
            <p class="title" v-if="!statsStore.loading">{{ course.title }}</p>
            <p class="date" v-if="!statsStore.loading">
              {{ moment(course.date_created).format('DD[/]MM[/]YYYY H:m') }}
              {{
                course.date_modified
                  ? ' | (mod. ' +
                    moment(stat.date)
                      .updateLocale('es', localization)
                      .format('DD[/]MM[/]YYYY H:m') +
                    ')'
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="right">
        <h2>Total Alumnos</h2>
        <p v-if="!statsStore.loading" class="totalNum">{{ statsStore.stats.totals[0].users }}</p>
        <div class="lastCreated">
          <h3>Últimos alumnos creados</h3>
          <div v-for="(user, index) in statsStore.stats.lastUsers" :key="index">
            <p class="title" v-if="!statsStore.loading">{{ user.name }}</p>
            <p class="date" v-if="!statsStore.loading">
              {{ moment(user.date_created).format('DD[/]MM[/]YYYY H:m') }}
              {{
                user.date_modified
                  ? ' | (mod. ' + moment(stat.date).format('DD[/]MM[/]YYYY H:m') + ')'
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h3 {
  margin-bottom: 0.75rem;
}
.lastCreated {
  margin-top: 4rem;
}
.lastCreated div {
  margin-bottom: 0.25rem;
}
.lastCreated .title {
  font-size: var(--reg);
}
.lastCreated .date {
  font-size: var(--sm);
}
.left,
.right {
  width: 50%;
}
.left {
  text-align: right;
}
.totalNum {
  font-size: var(--xxl);
}
</style>
