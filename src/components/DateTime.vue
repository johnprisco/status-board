<template>
  <div class="datetime">
    <h1>{{ date | currentTime }}</h1>
    <h2>{{ date | currentDate }}</h2>
  </div>
</template>

<script>
/* eslint-disable */   
import moment from 'moment'

export default {
  name: 'DateTime',
  data: () => ({
    date: new Date(),
    timer: ''
  }),
  created: function() {
    this.timer = setInterval(() => { this.date = new Date() }, 1000)
  },
  filters: {
    currentDate: (date) => moment(date).format('MMMM D, YYYY'),
    currentTime: (date) => moment(date, 'HH:mm:ss').format('h:mm') 
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
</style>
