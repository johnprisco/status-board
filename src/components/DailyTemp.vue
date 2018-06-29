<template>
  <div class="daily-weather">
    <p>{{ day }}</p>
    <skycon :condition="icon" /> 
    <p>{{ high | temperature }} | {{ low | temperature }}</p>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'DailyTemp',
  props: {
    icon: String,
    high: Number,
    low: Number,
    day: String
  },
  filters: {
    temperature: (temp) => {
      return temp + '°'
    }
  }
}
</script>


<style scoped>
p {
  text-align: center;
}
</style>