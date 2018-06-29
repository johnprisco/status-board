/* eslint-disable no-console */
require('dotenv').config()
const { DARK_SKY_API, NEWS_API, NODE_API_PORT, TODOIST_API } = process.env

let sqlite3 = require('sqlite3').verbose()
let express = require('express')
let app = express()

let axios = require('axios')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

app.get('/weather', (req, res) => {
  axios(`https://api.darksky.net/forecast/${DARK_SKY_API}/40.740698,-74.037884`)
    .then(darkSkyResponse => {
      let data = darkSkyResponse.data
      let week = []

      data.daily.data.slice(0, 5).forEach(day => week.push({
        icon: day.icon,
        high: Math.ceil(day.temperatureHigh),
        low: Math.floor(day.temperatureLow)
      }))

      let releventData = {
        current: {
          icon: data.currently.icon,
          summary: data.hourly.summary,
          temperature: Math.round(data.currently.temperature)
        },
        week: week
      }
      
      res.send(releventData)
    })
    .catch(() => console.error('Failed to get data from Dark Sky'))
})

const lightRailQuery = `SELECT DISTINCT start_st.departure_time
FROM
trips t INNER JOIN calendar c ON t.service_id = c.service_id
        INNER JOIN routes r ON t.route_id = r.route_id
        INNER JOIN stop_times start_st ON t.trip_id = start_st.trip_id
        INNER JOIN stops start_s ON start_st.stop_id = start_s.stop_id
        INNER JOIN stop_times end_st ON t.trip_id = end_st.trip_id
        INNER JOIN stops end_s ON end_st.stop_id = end_s.stop_id
WHERE c.date = strftime('%Y%m%d', 'now')
AND direction_id = 0
AND time(start_st.departure_time) > time('now', 'localtime') 
AND r.route_id = 4
AND start_s.stop_id = 38441
AND end_s.stop_id = 17699
ORDER BY start_st.departure_time
LIMIT 5`

app.get('/nj-transit', (req, res) => {
  let lightRail = new sqlite3.Database('./databases/nj_transit_gtfs.db')

  lightRail.all(lightRailQuery, function(err, rows) {
      res.send(rows)
  })

  lightRail.close()
})

const pathQuery = `SELECT DISTINCT start_st.departure_time
FROM
trips t INNER JOIN routes r ON t.route_id = r.route_id
        INNER JOIN stop_times start_st ON t.trip_id = start_st.trip_id
        INNER JOIN stops start_s ON start_st.stop_id = start_s.stop_id
        INNER JOIN stop_times end_st ON t.trip_id = end_st.trip_id
        INNER JOIN stops end_s ON end_st.stop_id = end_s.stop_id
WHERE time(start_st.departure_time) > time('now', 'localtime')
AND time(start_st.departure_time) < time('now', '+2 hours', 'localtime')
AND r.route_id in (859, 1024) 
AND start_s.stop_id in (782499, 781715,782500,26730,781716)
AND end_s.stop_id in (782508,782510,781741,782511,781740,26724,782509)
ORDER BY start_st.departure_time
LIMIT 5`

app.get('/path', (req, res) => {
  let path = new sqlite3.Database('./databases/path.db')

  path.all(pathQuery, function(err, rows) {
    res.send(rows)
  })

  path.close()
})

const todoistQueryOptions = {
  method: 'GET',
  url: 'https://beta.todoist.com/API/v8/tasks',
  headers: { 'Authorization': `Bearer ${TODOIST_API}` }
}

app.get('/todos', (req, res) => {
  axios(todoistQueryOptions)
    .then(response => {
      let todos = []
      
      response.data.forEach(todo => {
        if (!todo.completed) {
          todos.push(todo.content)
        }
      })

      res.send(todos)
    })
    .catch(() => console.error('Failed to get data from Todoist'))
})

const newsUrl = `https://newsapi.org/v2/top-headlines?sources=axios,bloomberg,espn&apiKey=${NEWS_API}`

app.get('/news', (req, res) => {
  axios.get(newsUrl)
    .then(response => {
      let articles = []

      response.data.articles.forEach(article => articles.push({
        source: article.source.id,
        title: article.title,
        description: article.description
      }))
      res.send(articles)
    })
    .catch(() => console.error('Failed to get data from NewsAPI'))
})

app.listen(NODE_API_PORT)
console.log(`Listening on port ${NODE_API_PORT}`)
