<template>
  <div class='flex'>
    <span v-if='lightRailTimes.length > 0'>
      <h2>Light Rail</h2>
      <ul>
        <li v-for='(lightRailTime, index) in lightRailTimes' :key='index'>
          <span>
            <font-awesome-icon :icon='train' /> {{ lightRailTime.departure_time | time }}
          </span>
        </li>
      </ul>
    </span>

    <span v-if='pathTimes.length > 0'>
      <h2>PATH</h2>
      <ul>
        <li v-for='(pathTime, index) in pathTimes' :key='index'>
          <span>
            <font-awesome-icon :icon='subway' /> {{ pathTime.departure_time | time }}
          </span>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTrain from '@fortawesome/fontawesome-free-solid/faTrain'
import faSubway from '@fortawesome/fontawesome-free-solid/faSubway'
import moment from 'moment'

export default {
  name: 'Transit',
  components: {
    FontAwesomeIcon
  },
  data: () => ({
    timer: '',
    lightRailTimes: [],
    pathTimes: []
  }),
  computed: {
    train() {
      return faTrain
    },
    subway() {
      return faSubway
    }
  },
  methods: {
    getLightRailTimes() {
      axios.get('http://localhost:3000/nj-transit')
        .then(res => this.lightRailTimes = res.data)
        .catch(error => console.error(error))
    },
    getPathTimes() {
      axios.get('http://localhost:3000/path')
        .then(res => this.pathTimes = res.data)
        .catch(error => console.error(error))
    },
    updateSchedules() {
      this.getPathTimes()
      this.getLightRailTimes()
    }
  },
  created: function() {
    let updateSchedules = this.updateSchedules
    this.timer = setInterval(() => { updateSchedules() }, 600000 )
  },
  mounted: function() {
    this.updateSchedules()
  },
  filters: {
    time: (date) => moment(date, 'HH:mm:ss').format('h:mm') 
  },
  beforeDestroy: function() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

li {
  font-size: 22px;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>