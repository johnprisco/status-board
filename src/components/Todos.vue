<template>
  <div class='wrapper'>
      <div class='todo' v-for='(todo, index) in todos' :key='index'>
        <img :src='icon' />
        {{ todo }}
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import todoistIcon from '../assets/todoist.png'

export default {
  name: 'Todos',
  data: () => ({
    timer: '',
    todos: [],
    icon: todoistIcon
  }),
  methods: {
    getTodos() {
      axios.get('http://localhost:3000/todos')
        .then(res => this.todos = res.data)
        .catch(error => console.error(error))
    }
  },
  created: function() {
    this.timer = setInterval(() => { }, 600000)
  },
  mounted: function() {
    this.getTodos()
  },
  beforeDestroy: function() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
img {
  height: 64px;
  width: 64px;
}

.wrapper {
  width: 30%;
}

.todo {
  display: flex;
  align-items: center;
  font-size: 22px;
}
</style>