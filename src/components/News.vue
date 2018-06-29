<template>
  <div>
    <div class='wrapper' v-for='(article, index) in articles' :key='index'>
      <Headline :icon='article.icon' :title='article.title' :description='article.description' :valid-indices='indices' :index='index' />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Headline from './Headline.vue'

import axiosIcon from '../assets/axios.jpg'
import bloombergIcon from '../assets/bloomberg.png'
import espnIcon from '../assets/espn.jpg'

export default {
  name: 'News',

  components: {
    Headline
  },

  data: () => ({
    queryTimer: '',
    refreshTimer: '',
    articles: [],
    indices: [0, 1, 2, 3, 4]
  }),

  methods: {
    getIconFromSource(source) {
      switch (source) {
        case 'axios': return axiosIcon
        case 'bloomberg': return bloombergIcon
        case 'espn': return espnIcon
        default: return '';
      }
    },

    getTopHeadlines() {
      let getIconFromSource = this.getIconFromSource
      axios.get('http://localhost:3000/news')
        .then(res => res.data.forEach(article => {
          this.articles.push({
            icon: getIconFromSource(article.source),
            title: article.title,
            description: article.description
          })
        }))
        .catch(error => console.error(error))
    },

    refreshIndices() {
      let last = this.indices[4]
      
      this.indices = this.indices.slice(1, 5)

      if (last === 19) {
        this.indices.push(0)
      } else {
        this.indices.push(last + 1)
      }

    }
  },

  created: function() {
    let getTopHeadlines = this.getTopHeadlines
    let refreshIndices = this.refreshIndices

    this.queryTimer = setInterval(() => { getTopHeadlines() }, 600000)
    this.refreshTimer = setInterval(() => { refreshIndices() }, 15000)
  },

  mounted: function() {
    this.getTopHeadlines()
  },

  beforeDestroy: function() {
    clearInterval(this.queryTimer)
    clearInterval(this.refreshTimer)
  }
}
</script>

<style scoped>
.wrapper {
  padding-left: 0;
}
</style>
