const KEY = 'data'

var gData = loadFromStorage(KEY) || {}
var gSearchTerm = 'vue'

function getData() {
  if (gData[gSearchTerm]) {
    console.log('getting from storage')
    return Promise.resolve(gData[gSearchTerm])
  }
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCQ3VQLxhDknZgctC7gsaB2tpWsMuYSN8A&q=${gSearchTerm}`
    )
    .then((res) => {
      videos = prepData(res.data)
      console.log('videos:', videos)
      gData[gSearchTerm] = videos
      saveToStorage(KEY, gData)
      return videos
    })
}

function prepData({ items }) {
  console.log('items:', items)
  return items.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      cover: item.snippet.thumbnails.default.url,
    }
  })
}

function setSearchTerm(value) {
  gSearchTerm = value
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
