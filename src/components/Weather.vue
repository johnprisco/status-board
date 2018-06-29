<template>
  <div class="weather">
  
    <div class="current-weather-with-icon">
      <skycon class="current-icon" :width="128" :height="128" :condition="current.icon" />
      <div>
        <h1>{{ current.temperature }}°</h1>
        <p>{{ current.summary }}</p>
      </div>
    </div>

    <ul>
      <li v-for='(day, index) in week' :key='index'>
        <DailyTemp :high="day.high" :low="day.low" :icon="day.icon" :day="getDaysFromNowAsString(index)" />
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import DailyTemp from './DailyTemp.vue'

/* eslint-disable no-console */
export default {
  name: 'Weather',
  data: () => ({
    timer: '',
    week: [],
    current: {}
  }),
  components: {
    DailyTemp
  },
  methods: {
    getWeatherData() {
      axios.get('http://localhost:3000/weather')
      .then(res => {
        this.week = res.data.week
        this.current = res.data.current
      })
      .catch(error => console.error(error))
    },
    getDaysFromNowAsString(daysFromToday) {
      return moment().add(daysFromToday, 'days').format('ddd')
    }
  },
  filters: {
    temperature: (temp) => {
      return temp + '°'
    }
  },
  created: function() {
    let getWeatherData = this.getWeatherData
    this.timer = setInterval(() => { getWeatherData() }, 600000) // query every ten minutes to avoid exceeding daily limit (1k calls/day)
  }, 
  mounted: function() {
    this.getWeatherData()
  },
  beforeDestroy: function() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
h1 {
  font-size: 64px;
  margin: 0;
}

ul {
  list-style: none;
}

li {
  padding-right: 40px;
  display: inline-block;
}

.current-weather-with-icon {
  display: inline-flex;
}

.current-icon {
  padding-right: 40px;
}
</style>