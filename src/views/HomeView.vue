<script setup>
import moment from 'moment'
import { useStatsStore } from '@/stores/stats'
import { storeToRefs } from 'pinia'

const statsStore = useStatsStore()
const { stats, loading } = storeToRefs(statsStore)
</script>

<template>
  <div class="flexContainer">
    <div class="flexContainerStart">
      <div class="left">
        <h2>Total Cursos</h2>
        <p v-if="!loading" class="totalNum">{{ stats.totals[0].courses }}</p>
        <div class="lastCreated">
          <h3>Últimos cursos creados</h3>
          <div v-for="(course, index) in stats.lastCourses" :key="index">
            <p class="title" v-if="!loading">{{ course.title }}</p>
            <p class="date" v-if="!loading">
              {{ moment(course.date_created).format('DD[/]MM[/]YYYY H:mm') }}
              {{
                course.date_modified
                  ? ' | (mod. ' +
                    moment(stat.date)
                      .updateLocale('es', localization)
                      .format('DD[/]MM[/]YYYY H:mm') +
                    ')'
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="right">
        <h2>Total Alumnos</h2>
        <p v-if="!loading" class="totalNum">{{ stats.totals[0].users }}</p>
        <div class="lastCreated">
          <h3>Últimos alumnos creados</h3>
          <div v-for="(user, index) in stats.lastUsers" :key="index">
            <p class="title" v-if="!loading">{{ user.name }}</p>
            <p class="date" v-if="!loading">
              {{ moment(user.date_created).format('DD[/]MM[/]YYYY H:mm') }}
              {{
                user.date_modified
                  ? ' | (mod. ' + moment(stat.date).format('DD[/]MM[/]YYYY H:mm') + ')'
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 0.75rem;
}
.flexContainer {
  align-items: center;
  display: flex;
  height: unset;
  justify-content: center;
  width: 100%;
}
.flexContainerStart {
  display: block;
  max-width: 80rem;
  width: 100%;
}
.lastCreated {
  margin-top: 1rem;
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
  width: 100%;
}
.left {
  text-align: left;
  margin-bottom: 4rem;
}
.totalNum {
  font-size: var(--xxl);
}
@media screen and (min-width: 960px) {
  .flexContainer {
    height: 100%;
  }
  .flexContainerStart {
    align-items: start;
    display: flex;
    gap: 4rem;
    justify-content: center;
  }
  .lastCreated {
    margin-top: 4rem;
  }
  .left,
  .right {
    width: 50%;
  }
  .left {
    margin-bottom: 0;
    text-align: right;
  }
}
</style>
