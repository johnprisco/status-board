<template>
  <div id='app'>
    <div class='date-time-weather'>
      <span style="width: 20%">
        <DateTime />
        <Transit />
      </span>

      <span>
        <Weather />
      </span>  
    </div>
    <div class='news-todos'>
      <News />
      <Todos />
    </div>
  </div>
</template>

<script>
import DateTime from './components/DateTime.vue'
import News from './components/News.vue'
import Transit from './components/Transit.vue'
import Todos from './components/Todos.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    DateTime,
    News,
    Todos,
    Transit,
    Weather
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  padding: 20px;
  max-width: 1080px;
  max-height: 1920px;
}

.date-time-weather, .news-todos {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>
